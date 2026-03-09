import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";

const useRecipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRecipes = async () => {

      try {

        const data = await getRecipes();
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

export default useRecipes;