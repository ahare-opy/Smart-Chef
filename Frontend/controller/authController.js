const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');
const catchAsync = require('../utilsServer/catchAsync');
const AppError = require('../utilsServer/appError');

exports.login = catchAsync(async (req, res, next) => {
  //console.log(req.body.user);
  const { email, password } = req.body.user;

  //1)check if email and password exist
  if (!email || !password) {
    return res.status(400).json('Please provide Email and Password!');
  }

  try {
    //2) check if user exists && password is correct
    const user = await User.findOne({ email }).select('password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json('Incorrect Email or Password');
    }

    //3) if everything ok, send token to client
    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token);
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json('Server Error');
  }
});

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body.user);
  const { name, email, password, phoneNumber } = req.body.user;

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //if(!email.value.match(validRegex)) return res.status(401).json('Invalid Email');

  if (password.length < 6) {
    return res.status(401).json('Password must be atleast 6 character');
  }

  try {
    let user;

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phoneNumber,
      image: req.body.profilePicUrl,
    });

    console.log(user);

    await user.save();

    console.log(user._id);

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token);
        res.status(200).json(token);
      }
    );
  } catch (error) {
    return res.status(500).json('I am the error');
  }
});

exports.checkEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  try {
    if (email.length < 1) return res.status(401).json('Invalid');

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) return res.status(400).json('Email already taken');

    return res.status(200).json('Available');
  } catch (error) {
    return res.status(500).json('Server Error');
  }
});

exports.viewMe = catchAsync(async (req, res, next) => {
  try {
    let token;

    if (!req.headers.authorization) {
      return res.status(401).json(`Unauthorized`);
    } else if (req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.headers.authorization;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(`This is the viewme: ${userId}`);
    const user = await User.findById(userId);

    //console.log(`This is the viewme: ${user}`);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});

exports.updateInventory = catchAsync(async (req, res, next) => {
  try {
    const { user, inventory } = req.body;

    let varUser = await User.findById(user._id);

    //varUser.inventory = {};

    inventory.forEach((element) => {
      key = Object.keys(element)[0];
      val = Object.values(element)[0];

      if (varUser.inventory === undefined) {
        Object.assign(varUser.inventory, element);
      } else if (varUser.inventory[key] === undefined) {
        Object.assign(varUser.inventory, element);
      } else {
        varUser.inventory[key] += val;
      }
    });

    let vUser = await User.findByIdAndUpdate(user._id, {
      email: varUser.email,
      name: varUser.name,
      image: varUser.image,
      password: varUser.password,
      phoneNumber: varUser.phoneNumber,
      active: varUser.active,
      inventory: varUser.inventory,
    });

    res.status(200).json({
      status: 'success',
      vUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});

exports.subtractInventory = catchAsync(async (req, res, next) => {
  try {
    const { inventory, id } = req.body;

    console.log(inventory);

    let user = await User.findByIdAndUpdate(id, {
      $set: { inventory: inventory },
    });

    console.log(res);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});

exports.resetInventory = catchAsync(async (req, res, next) => {
  try {
    const { user } = req.body;

    let id = user._id;
    let inventory = user.inventory;

    let userr = await User.findByIdAndUpdate(id, {
      $set: { inventory: inventory },
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});
