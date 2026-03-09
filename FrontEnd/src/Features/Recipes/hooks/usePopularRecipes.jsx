import React from "react";
import { useEffect, useState } from "react";
import { getPopularRecipes } from "../services/recipeService";

const usePopularRecipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRecipes = async () => {
      try {

        const data = await getPopularRecipes();
        setRecipes(data);

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchRecipes();

  }, []);

  return { recipes, loading };
};

export default usePopularRecipes;