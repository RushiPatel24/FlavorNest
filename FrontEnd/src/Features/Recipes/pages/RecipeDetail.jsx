import React from "react";
import { useParams } from "react-router-dom";
import useOneRecipe from "../hooks/useOneRecipe";

import RecipeHeader from "../components/RecipeDetail/RecipeHeader";
import RecipeMeta from "../components/RecipeDetail/RecipeMeta";
import RecipeIngredients from "../components/RecipeDetail/RecipeIngredients";
import RecipeSteps from "../components/RecipeDetail/RecipeSteps";

const RecipeDetail = () => {

  const { id } = useParams();
  const { recipe, loading } = useOneRecipe(id);

  
  

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading recipe...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-20 text-red-400">
        Recipe not found
      </div>
    );
  }

  return (

    <section className="max-w-6xl mx-auto px-4 py-12">

      <RecipeHeader recipe={recipe} />

      <RecipeMeta recipe={recipe} />

      <div className="grid md:grid-cols-2 gap-10 mt-10">

        <RecipeIngredients ingredients={recipe?.ingredients} />

        <RecipeSteps steps={recipe.instructions} />

      </div>

    </section>

  );
};

export default RecipeDetail;