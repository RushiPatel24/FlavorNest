const filterController = require("../controller/filter.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const filterRouter = Router();

/* ===============================
   SEARCH & FILTER RECIPES
   =============================== */

// Search + filter + pagination
filterRouter.get("/filter", filterController.filterRecipes);

// Top rated recipes
filterRouter.get("/filter/top", filterController.getTopRecipes);

// Trending recipes
filterRouter.get("/filter/trending", filterController.getTrendingRecipes);

// Popular recipes
filterRouter.get("/filter/popular", filterController.getPopularRecipes);

filterRouter.get("/filter/categories", filterController.getCategories);


/* ===============================
   FAVORITE RECIPE
   =============================== */

filterRouter.post("/:id/favorite", authMiddleware, filterController.addFavorite);


/* ===============================
   LIKE RECIPE
   =============================== */

filterRouter.post("/:id/like", authMiddleware, filterController.likeRecipe);


module.exports = filterRouter;