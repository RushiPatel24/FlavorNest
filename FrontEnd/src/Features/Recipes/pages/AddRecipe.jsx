import React, { useState } from "react";
import { createRecipe } from "../services/recipeService";

const AddRecipe = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null);

  const [ingredients, setIngredients] = useState([""]);
  const [ingredientInput, setIngredientInput] = useState("");

  const [steps, setSteps] = useState([""]);
  const [preview, setPreview] = useState(null);

  // Add ingredient
  const addIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Step change
  const handleStepChange = (value, index) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  // Add step
  const addStep = () => {
    setSteps([...steps, ""]);
  };

  // Remove step
  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("cookingTime", cookingTime);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(steps));
    formData.append("image", image);

    try {

      const res = await createRecipe(formData);

      alert(res.message);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setCookingTime("");
      setIngredients([]);
      setSteps([""]);
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.log(err);
      alert("Error creating recipe");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-16">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Add Recipe
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-8 rounded-xl"
        >

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            className="w-full p-3 rounded bg-gray-800"
            required
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            className="w-full p-3 rounded bg-gray-800"
            required
          />

          {/* Category */}
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full p-3 rounded bg-gray-800"
            required
          />

          {/* Sub Category */}
          <input
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Sub Category"
            className="w-full p-3 rounded bg-gray-800"
          />

          {/* Cooking Time */}
          <input
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            type="number"
            placeholder="Cooking Time (minutes)"
            className="w-full p-3 rounded bg-gray-800"
            required
          />

          {/* Ingredients */}
          <div>

            <h3 className="font-semibold mb-2">Ingredients</h3>

            <div className="flex gap-2 mb-3">

              <input
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="Add ingredient"
                className="flex-1 p-3 rounded bg-gray-800"
              />

              <button
                type="button"
                onClick={addIngredient}
                className="bg-emerald-500 px-4 rounded"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2">

              {ingredients.map((item, index) => (
                <span
                  key={index}
                  className="bg-emerald-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    ✕
                  </button>
                </span>
              ))}

            </div>

          </div>

          {/* Instructions */}
          <div>

            <h3 className="font-semibold mb-3">Instructions</h3>

            {steps.map((step, index) => (
              <div key={index} className="flex gap-3 mb-3">

                <textarea
                  value={step}
                  onChange={(e) => handleStepChange(e.target.value, index)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 p-3 rounded bg-gray-800"
                />

                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="bg-red-500 px-3 rounded"
                  >
                    ✕
                  </button>
                )}

              </div>
            ))}

            <button
              type="button"
              onClick={addStep}
              className="bg-emerald-500 px-4 py-2 rounded"
            >
              Add Step
            </button>

          </div>

          {/* Image Upload */}
          <div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="mt-4 h-40 rounded"
                alt="preview"
              />
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 p-3 rounded hover:bg-red-600"
          >
            Create Recipe
          </button>

        </form>

      </div>

    </section>
  );
};

export default AddRecipe;