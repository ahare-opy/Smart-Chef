const express = require('express');
const { getRouteRegex } = require('next/dist/shared/lib/router/utils/route-regex');

const recipeController = require('../controller/recipeController');

const router = express.Router();

router
  .route('/')
  .get(recipeController.allRecipe);

router.route('/my-recipe').post(recipeController.myRecipe);

router.route('/single').post(recipeController.single);

module.exports = router;