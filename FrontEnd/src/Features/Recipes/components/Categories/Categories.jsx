import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useCategories from "../../hooks/useCategories";

const Categories = ({ setSelectedCategory }) => {

  const categories = useCategories();
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  const infiniteCategories = [...categories, ...categories];

  const scroll = () => {

    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollLeft += 1.5; // speed (increase for faster)

    if (slider.scrollLeft >= slider.scrollWidth / 2) {
      slider.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(scroll);
  };

  const startScroll = () => {
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(scroll);
    }
  };

  const stopScroll = () => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  };

  useEffect(() => {
    startScroll();
    return () => stopScroll();
  }, [categories]);

  if (!categories?.length) {
    return (
      <p className="text-center py-6 text-gray-400">
        Loading categories...
      </p>
    );
  }

  return (
    <section className="bg-black py-10">

      <div className="max-w-7xl mx-auto">

        <div
          ref={sliderRef}
          onMouseEnter={stopScroll}
          onMouseLeave={startScroll}
          className="
            flex gap-6
            overflow-x-hidden
            overflow-y-hidden
            no-scrollbar
            px-4 py-4
          "
        >

          {infiniteCategories.map((cat, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              onClick={() => setSelectedCategory(cat)}
              className="
                flex flex-col items-center
                min-w-30 sm:min-w-35 md:min-w-40
                cursor-pointer
              "
            >

              {/* Image */}
              <div className="
                w-24 h-24
                sm:w-28 sm:h-28
                md:w-32 md:h-32
                lg:w-36 lg:h-36
                rounded-full
                overflow-hidden
                shadow-lg
              ">

                <img
                  src={`https://picsum.photos/300?random=${index}`}
                  alt={cat}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Name */}
              <p className="
                mt-3
                text-white
                text-xs sm:text-sm
                font-semibold
                tracking-widest
                text-center
              ">
                {cat.toUpperCase()}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;