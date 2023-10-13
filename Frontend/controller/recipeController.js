const RecipeModel = require('../models/recipe-model');

exports.allRecipe = async(req, res, next) => {
    const recipe = await RecipeModel.find();

    res.status(200).json({
        status: 'success',
        recipe,
      });
};