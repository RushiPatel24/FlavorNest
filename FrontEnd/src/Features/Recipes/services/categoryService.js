import axios from "axios";

const API = "http://localhost:3000/api";

export const getCategories = async () => {
  const res = await axios.get(`${API}/recipes/filter/categories`);
  return res.data.categories;
};