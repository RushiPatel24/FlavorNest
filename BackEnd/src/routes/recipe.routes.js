const { Router } = require("express");
const recipeController = require("../controller/recipe.controller")
const authMiddleware = require("../middleware/auth.middleware")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() }) 

const recipeRouter = Router();


/* ===============================
   RECIPE ROUTES
   =============================== */

// Create a new recipe
// Only logged-in users can create a recipe
recipeRouter.post("/",upload.single("image"), authMiddleware, recipeController.addRecipe);

// Get all recipes
// Public route (no authentication required)
recipeRouter.get("/", recipeController.getAllRecipes);

// Get a single recipe by ID
// Public route
recipeRouter.get("/:id", recipeController.getSingleRecipe);

// Update a recipe
// Only the author of the recipe can update it
recipeRouter.put("/:id", authMiddleware, recipeController.updateRecipe);

// Delete a recipe
// Only the author of the recipe can delete it
recipeRouter.delete("/:id", authMiddleware, recipeController.deleteRecipe);


// Export router
module.exports = recipeRouter;