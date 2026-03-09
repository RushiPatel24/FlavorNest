import React from "react";
import { useEffect, useState } from "react";
import { getTrendingRecipes } from "../services/recipeService";

const useTrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchData = async () => {
      const data = await getTrendingRecipes();
      setRecipes(data);
    };

  useEffect(() => {

    fetchData();
  }, []);

  return recipes;
};

export default useTrendingRecipes;