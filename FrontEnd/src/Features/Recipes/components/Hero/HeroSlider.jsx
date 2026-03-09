import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSlider = ({ recipe }) => {
  return (
    <AnimatePresence mode="wait">
      {recipe && (
        <motion.img
          key={recipe._id}
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            object-center
            select-none
          "
        />
      )}
    </AnimatePresence>
  );
};

export default HeroSlider;