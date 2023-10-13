const express = require('express');

const recipeController = require('../controller/recipeController');

const router = express.Router();

router
  .route('/')
  .get(recipeController.allRecipe);

module.exports = router;