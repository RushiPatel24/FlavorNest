import React from "react";

const RecipeIngredients = ({ ingredients  }) => {

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Ingredients
      </h2>

      <ul className="space-y-2">

        {ingredients.map((item, index) => (

          <li
            key={index}
            className="bg-gray-900 p-3 rounded-lg"
          >
            {item}
          </li>

        ))}

      </ul>

    </div>

  );
};

export default RecipeIngredients;