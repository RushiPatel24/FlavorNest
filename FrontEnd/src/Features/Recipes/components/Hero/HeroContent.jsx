import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroContent = ({ recipe }) => {
  return (
    <AnimatePresence mode="wait">
      {recipe && (
        <motion.div
          key={recipe._id + "text"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="
            relative z-10 flex flex-col justify-center h-full
            px-6 sm:px-10 md:px-16
            max-w-xl md:max-w-2xl
            text-white
            text-center md:text-left
          "
        >
          {/* Label */}
          <p className="tracking-widest text-xs sm:text-sm mb-3 text-gray-300">
            TRENDING DISHES
          </p>

          {/* Title */}
          <h1 className="
            font-bold
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          ">
            {recipe.title}
          </h1>

          {/* Description */}
          <p className="
            mt-4 text-gray-300
            text-sm sm:text-base md:text-lg
            line-clamp-3
          ">
            {recipe.description}
          </p>

          {/* Buttons */}
          <div className="
            flex flex-col sm:flex-row
            gap-4 sm:gap-5
            mt-6 md:mt-8
            justify-center md:justify-start
          ">
            <button className="
              bg-red-500 hover:bg-red-600
              px-5 py-2.5 md:px-6 md:py-3
              rounded-full
              text-sm md:text-base
              transition
            ">
              VIEW RECIPE
            </button>

            <button className="
              bg-emerald-500 hover:bg-emerald-600
              px-5 py-2.5 md:px-6 md:py-3
              rounded-full
              text-sm md:text-base
              transition
            ">
              CONTACT US
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroContent;