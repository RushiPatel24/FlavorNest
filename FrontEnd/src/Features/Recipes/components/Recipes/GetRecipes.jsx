import React, { useState } from "react";
import { motion } from "framer-motion";
import useRecipes from "../../hooks/useRecipes";
import { Link } from "react-router-dom";

const GetRecipes = () => {

  const { recipes, loading } = useRecipes();
  const [visibleCount, setVisibleCount] = useState(12);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateX: -90,
      y: 40
    },
    show: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400 py-10">
        Loading recipes...
      </p>
    );
  }

  return (
    <section className="bg-black text-white py-12 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center md:text-left"
        >
          Latest Recipes
        </motion.h2>

        {/* Grid */}
        <div
          style={{ perspective: "1200px" }}
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 sm:gap-8
          "
        >

          {recipes.slice(0, visibleCount).map((recipe) => (

            <motion.div
              key={recipe._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-xl cursor-pointer"
            >

              {/* Image */}
              <motion.img
                src={recipe.image}
                alt={recipe.title}
                className="
                  w-full 
                  h-44 
                  sm:h-52 
                  md:h-56 
                  object-cover
                "
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />

              <div className="p-4 sm:p-6">

                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {recipe.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-400 mb-2">
                  {recipe.category}
                </p>

                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  {recipe.description?.slice(0, 90)}...
                </p>

                <Link to={`/recipe/${recipe._id}`}>
                  <button 
                    className="
                     bg-red-500 
                     px-5 py-2 
                     text-sm
                     rounded-full 
                     hover:bg-red-600 
                     transition">
                    READ MORE
                  </button>
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Load More */}
        {visibleCount < recipes.length && (

          <div className="flex justify-center mt-10">

            <button
              onClick={loadMore}
              className="
                bg-emerald-500
                px-6 sm:px-8
                py-2 sm:py-3
                text-sm sm:text-base
                rounded-full
                hover:bg-emerald-600
                transition
              "
            >
              Load More
            </button>

          </div>

        )}

      </div>

    </section>
  );
};

export default GetRecipes;