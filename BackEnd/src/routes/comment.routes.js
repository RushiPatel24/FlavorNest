const commentController = require("../controller/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { Router } = require("express");

const commentRouter = Router();

/* ===============================
   COMMENT ROUTES
   =============================== */

// Add a comment to a recipe
commentRouter.post("/", authMiddleware, commentController.addComment);

// Get all comments for a specific recipe
commentRouter.get("/:recipeId", commentController.getComments);


// Export router
module.exports = commentRouter;