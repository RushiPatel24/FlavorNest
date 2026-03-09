const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  comment: {
    type: String,
    required: true
  }

}, { timestamps: true });

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;