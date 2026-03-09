import React from "react";

const RecipeHeader = ({ recipe }) => {

  return (

    <div className="mb-10">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {recipe.title}
      </h1>

      <p className="text-gray-400 mt-2">
        {recipe.description}
      </p>

    </div>

  );
};

export default RecipeHeader;