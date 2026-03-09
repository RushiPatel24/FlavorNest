import { useEffect, useState } from "react";
import React from "react";
import { getSeasonRecipes } from "../services/recipeService";

const useSeasonRecipes = () => {

  const [recipes,setRecipes] = useState([]);

  useEffect(()=>{

    const fetchRecipes = async () => {

      const data = await getSeasonRecipes();

      setRecipes(data.slice(0,6)); // 2 rows × 3 columns

    };

    fetchRecipes();

  },[]);

  return recipes;
};

export default useSeasonRecipes;