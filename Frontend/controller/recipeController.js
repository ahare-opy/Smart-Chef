const { json } = require('body-parser');
const { countDocuments } = require('../models/recipe-model');
const RecipeModel = require('../models/recipe-model');
const catchAsync = require('../utilsServer/catchAsync');

exports.allRecipe = catchAsync(async (req, res, next) => {
  const recipe = await RecipeModel.find();

  res.status(200).json({
    status: 'success',
    recipe,
  });
});

exports.myRecipe = catchAsync(async (req, res, next) => {
  try {
    const { diet, time, type, serve } = req.body;

    const recipe = await RecipeModel.find({
      diet: diet,
      servings: serve,
      cook_time_min: { $lte: time },
      type: type,
    });

    res.status(200).json({
      status: 'success',
      recipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});

exports.single = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.body;

    let r = await RecipeModel.findById(id);

    res.status(200).json({
      status: 'success',
      r,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Server error`);
  }
});
