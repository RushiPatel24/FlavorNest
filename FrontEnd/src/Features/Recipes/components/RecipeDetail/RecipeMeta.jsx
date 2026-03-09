import React from "react";

const RecipeMeta = ({ recipe }) => {

  return (

    <div className="flex gap-6 text-sm text-gray-400 mt-4">

      <span>⏱ {recipe.cookingTime} mins</span>

      <span>🍽 {recipe.category}</span>

      <span>👤 {recipe.author?.username}</span>

    </div>

  );
};

export default RecipeMeta;