import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeService";

export default function useRecipe(id) {

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchRecipe() {

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    if (id) fetchRecipe();

  }, [id]);

  return { recipe, loading };
}