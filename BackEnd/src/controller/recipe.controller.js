const recipeModel = require("../models/recipe.model");
const ImageKit = require( '@imagekit/nodejs');
const { toFile } = require( '@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

/* =========================================
   ADD RECIPE
   Create a new recipe (Only logged-in user)
   ========================================= */
const addRecipe = async (req, res) => {
  try {

    let imageUrl = "";

    if (req.file) {
      const file = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: "recipes"
      });

      imageUrl = file.url;
    }

    const { title, description, cookingTime, category } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);
    const instructions = JSON.parse(req.body.instructions);

    const recipe = await recipeModel.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      category,
      image: imageUrl,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================
   GET ALL RECIPES
   Fetch all recipes from database
   ========================================= */
const getAllRecipes = async (req, res) => {
  try {

    // Find all recipes and populate author details
    const recipes = await recipeModel.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      recipes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================
   GET SINGLE RECIPE
   Fetch recipe by ID
   ========================================= */
const getSingleRecipe = async (req, res) => {
  try {

    const recipe = await recipeModel.findById(req.params.id)
      .populate("author", "username email");

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe fetched successfully",
      recipe
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================
   UPDATE RECIPE
   Only the author can update the recipe
   ========================================= */
const updateRecipe = async (req, res) => {
  try {

    const recipe = await recipeModel.findById(req.params.id);

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if logged-in user is the author
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own recipe"
      });
    }

    // Update recipe
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================
   DELETE RECIPE
   Only the author can delete the recipe
   ========================================= */
const deleteRecipe = async (req, res) => {
  try {

    const recipe = await recipeModel.findById(req.params.id);

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if logged-in user is the author
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own recipe"
      });
    }

    // Delete recipe
    await recipeModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================
   EXPORT ALL CONTROLLERS
   ========================================= */
module.exports = {
  addRecipe,
  getAllRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe
};