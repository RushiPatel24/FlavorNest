const recipeModel = require("../models/recipe.model");
const userModel = require("../models/user.model");
const commentModel = require("../models/comment.model");

/* ===============================
   SEARCH & FILTER RECIPES
   =============================== */
const filterRecipes = async (req, res) => {
  try {

    const { search, category, time, page = 1, limit = 10, sort } = req.query;

    let query = {};

    // 🔍 Search
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🍰 Category Filter
    if (category) {
      query.category = category;
    }

    // ⏱ Cooking Time Filter
    if (time) {
      query.cookingTime = { $lte: Number(time) };
    }

    // 📊 Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "rating") sortOption = { rating: -1 };
    if (sort === "time") sortOption = { cookingTime: 1 };

    const recipes = await recipeModel
      .find(query)
      .populate("author", "username")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await recipeModel.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecipes: total,
      recipes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopRecipes = async (req, res) => {
  try {

    const recipes = await recipeModel
      .find()
      .sort({ rating: -1 })
      .limit(6)
      .populate("author", "username");

    res.status(200).json({
      success: true,
      recipes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendingRecipes = async (req, res) => {
  try {

    const recipes = await recipeModel
      .find()
      .sort({ likes: -1 })
      .limit(5)
      .populate("author", "username");

    res.status(200).json({
      success: true,
      recipes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopularRecipes = async (req, res) => {
  try {

    const popular = await commentModel.aggregate([
      {
        $group: {
          _id: "$recipe",
          commentCount: { $sum: 1 }
        }
      },
      { $sort: { commentCount: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "recipes",
          localField: "_id",
          foreignField: "_id",
          as: "recipeDetails"
        }
      },

      {
        $unwind: "$recipeDetails"
      },

      {
        $project: {
          _id: "$recipeDetails._id",
          title: "$recipeDetails.title",
          image: "$recipeDetails.image",
          category: "$recipeDetails.category",
          cookingTime: "$recipeDetails.cookingTime",
          commentCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      popular
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {

    // Get unique categories from recipes collection
    const categories = await recipeModel.distinct("category");

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



/* ===============================
   ADD RECIPE TO FAVORITES
   =============================== */
// Adds recipe to logged-in user's favorites
// Example: POST /api/recipes/:id/favorite
const addFavorite = async (req, res) => {
  try {

    const recipeId = req.params.id;
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    // Prevent duplicate favorites
    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({
        message: "Recipe already in favorites"
      });
    }

    user.favorites.push(recipeId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Recipe added to favorites"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   LIKE RECIPE
   =============================== */
// Adds logged-in user to recipe likes
// Example: POST /api/recipes/:id/like
const likeRecipe = async (req, res) => {
  try {

    const recipe = await recipeModel.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    // Prevent duplicate likes
    if (!recipe.likes.includes(req.user.id)) {
      recipe.likes.push(req.user.id);
      await recipe.save();
    }

    res.status(200).json({
      success: true,
      message: "like successfully",

      likes: recipe.likes.length
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   EXPORT CONTROLLERS
   =============================== */
module.exports = {
  filterRecipes,
  getTopRecipes,
  getTrendingRecipes,
  getPopularRecipes,
  getCategories,
  addFavorite,
  likeRecipe
};