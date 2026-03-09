import React from "react";
import { motion } from "framer-motion";
import useSeasonRecipes from "../../hooks/useSeasonRecipes";

const SeasonRecipes = () => {

  const recipes = useSeasonRecipes();

  const item = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (

    <section className="py-12 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            font-semibold 
            text-center 
            mb-10
          "
        >
          Perfect for This Season
        </motion.h2>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6 sm:gap-8
          "
        >

          {recipes.map((recipe) => (

            <motion.div
              key={recipe._id}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="
                relative
                group
                overflow-hidden
                rounded-xl
                cursor-pointer
              "
            >

              {/* Image */}
              <motion.img
                src={recipe.image}
                alt={recipe.title}
                className="
                  w-full
                  h-60
                  sm:h-75
                  md:h-90
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-110
                "
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Gradient Overlay */}
              <div className="
                absolute inset-0
                bg-linear-to-t
                from-black/80
                via-black/30
                to-transparent
              "></div>

              {/* Post Date */}
              <div className="
                absolute top-4 left-4
                text-white
                text-xs sm:text-sm
                opacity-0
                group-hover:opacity-100
                transition
              ">
                {new Date(recipe.createdAt).toDateString()}
              </div>

              {/* Bottom Content */}
              <div className="
                absolute bottom-5 left-5
                text-white
              ">

                <h3 className="
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  font-bold
                ">
                  {recipe.title}
                </h3>

                <p className="text-xs sm:text-sm mt-1 opacity-90">
                  {recipe.subCategory} • {recipe.comments || 0}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default SeasonRecipes;