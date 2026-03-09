const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

/* =========================================
   MIDDLEWARE
   ========================================= */

// Parse JSON request body
app.use(express.json());

// Parse cookies from request
app.use(cookieParser());

// Enable CORS for frontend communication
app.use(
  cors({
    credentials: true, // allow cookies to be sent
    origin: "http://localhost:5173" // frontend URL
  })
);


/* =========================================
   AUTH ROUTES
   ========================================= */

// Import authentication routes
const authRouter = require("./routes/auth.routes");

// Authentication routes
// Base URL: /api/auth
// Example:
// POST /api/auth/register
// POST /api/auth/login
app.use("/api/auth", authRouter);

/* =========================================
   RECIPE ROUTES
   ========================================= */


// Import recipe routes
const recipeRouter = require("./routes/recipe.routes");

// Recipe routes
// Base URL: /api/recipes
// Example:
// POST   /api/recipes
// GET    /api/recipes
// GET    /api/recipes/:id
// PUT    /api/recipes/:id
// DELETE /api/recipes/:id
app.use("/api/recipes", recipeRouter);


/* ===============================
   FILTER & INTERACTION ROUTES
   =============================== */

// Import filter router which handles:
// - search recipes
// - filter recipes by category
// - filter recipes by cooking time
// - like recipes
// - add recipe to favorites
const filterRouter = require("./routes/filter.routes");

// Base route: /api/recipes
// Example endpoints:
//
// 🔍 Search Recipes
// GET /api/recipes/search?q=pasta
//
// 🍰 Filter by Category
// GET /api/recipes/category?category=dessert
//
// ⏱ Filter by Cooking Time
// GET /api/recipes/time?time=30
//
// ❤️ Add Recipe to Favorites (requires authentication)
// POST /api/recipes/:id/favorite
//
// 👍 Like a Recipe (requires authentication)
// POST /api/recipes/:id/like
app.use("/api/recipes", filterRouter);

/* =========================================
   COMMENT ROUTES
   ========================================= */

// Import comment router which handles:
// - adding comments to recipes
// - fetching comments for a recipe
const commentRouter = require("./routes/comment.routes");

// Base route: /api/comments
// Example endpoints:
// POST /api/comments          -> Add a comment to a recipe
// GET  /api/comments/:recipeId -> Get all comments for a recipe
app.use("/api/comments", commentRouter);


/* =========================================
   EXPORT APP
   ========================================= */

module.exports = app;