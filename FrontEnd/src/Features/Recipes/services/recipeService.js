import axios from "axios";

const API = "http://localhost:3000/api";

  export const getRecipes = async () => {
    const res = await axios.get(`${API}/recipes`);
    return res.data.recipes;
  }; 

  export const getRecipeById = async (id) => {
  const res = await axios.get(`${API}/recipes/${id}`);
    
  return res.data.recipe;
  };

  export const getTrendingRecipes = async () => {
  const res = await axios.get(`${API}/recipes/filter/trending`);
  return res.data.recipes;
  };

  export const getPopularRecipes = async () => {
  const res = await axios.get(`${API}/recipes/filter/popular`);
  console.log(res.data.popular);
  
  return res.data.popular;
  };

  export const getSeasonRecipes = async () => {
  const res = await axios.get(`${API}/recipes`);
  return res.data.recipes;
  };


  export const createRecipe = async (formData) => {

  const res = await axios.post(
    `${API}/recipes`,
    formData,
    {
      withCredentials: true
    }
  );

  return res.data;
  };