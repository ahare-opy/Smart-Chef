const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/').post(authController.signup);
router.route('/:email').get(authController.checkEmail);

module.exports = router;
