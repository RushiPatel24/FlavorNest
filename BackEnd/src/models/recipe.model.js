const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  // Short description of the recipe
  description: {
    type: String,
    required: true,
    trim: true
  },

  ingredients: [
    {
      type: String,
      required: true
    }
  ],

  instructions: [
    {
      type: String,
      required: true
    }
  ],

  cookingTime: {
    type: Number,
    required: true
  },

  // Main Category
  category: {
    type: String,
    required: true
  },

  // Sub Category
  subCategory: {
    type: String
  },

  image: {
    type: String
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }

},
{ timestamps: true }
);

const recipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = recipeModel;