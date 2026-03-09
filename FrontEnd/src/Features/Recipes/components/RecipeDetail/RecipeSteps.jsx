import React from "react";

const RecipeSteps = ({ instructions = [] }) => {

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Instructions
      </h2>

      <ol className="space-y-4 list-decimal pl-4">

        {instructions.map((step, index) => (

          <li key={index} className="text-gray-300">
            {step}
          </li>

        ))}

      </ol>

    </div>

  );
};

export default RecipeSteps;