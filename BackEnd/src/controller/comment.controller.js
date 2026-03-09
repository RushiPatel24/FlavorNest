const commentModel = require("../models/comment.model");

/* ===============================
   ADD COMMENT
   =============================== */
// Add a comment to a recipe
// Only logged-in users can add comments
// Endpoint: POST /api/comments
const addComment = async (req, res) => {
  try {

    const { recipeId, comment } = req.body;

    // Validate comment input
    if (!recipeId || !comment) {
      return res.status(400).json({
        message: "Recipe ID and comment are required"
      });
    }

    // Create new comment
    const newComment = await commentModel.create({
      recipe: recipeId,
      user: req.user.id,
      comment
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      newComment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   GET COMMENTS
   =============================== */
// Get all comments for a specific recipe
// Endpoint: GET /api/comments/:recipeId
const getComments = async (req, res) => {
  try {

    const comments = await commentModel
      .find({ recipe: req.params.recipeId })
      .populate("user", "username") // show comment author's username
      .sort({ createdAt: -1 }); // latest comments first

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   EXPORT CONTROLLERS
   =============================== */
module.exports = {
  addComment,
  getComments
};