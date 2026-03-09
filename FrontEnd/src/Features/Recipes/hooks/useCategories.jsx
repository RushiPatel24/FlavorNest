import React from "react";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

const useCategories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();

  }, []);

  return categories;
};

export default useCategories;