import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Home from "./pages/Home";
import AddRecipe from "./Features/Recipes/pages/AddRecipe"
import RecipeDetail from "./Features/Recipes/pages/RecipeDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export { AppRoutes };