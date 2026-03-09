import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useRecipes from "../../hooks/useRecipes";

const SeasonHero = () => {

  const { recipes, loading } = useRecipes();

  const { scrollY } = useScroll();
  const yMove = useTransform(scrollY, [0, 800], [0, -80]);

  const cardAnimation = {
    hidden:{
      opacity:0,
      y:80,
      scale:0.95
    },
    show:{
      opacity:1,
      y:0,
      scale:1,
      transition:{
        duration:0.7,
        ease:"easeOut"
      }
    }
  };

  if(loading){
    return (
      <div className="text-center py-20 text-gray-400">
        Loading...
      </div>
    )
  }

  const recipe = recipes[0];
  if(!recipe) return null;

  return (

    <section className="py-12 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <motion.h2
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          viewport={{once:false}}   
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

        {/* Hero Card */}
        <motion.div
          style={{ y: yMove }}
          variants={cardAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{once:false, amount:0.3}}   
          className="
            relative
            rounded-xl
            overflow-hidden
            cursor-pointer
          "
        >

          {/* Image */}
          <img
            src={recipe.image}
            alt={recipe.title}
            className="
              w-full
              h-65
              sm:h-87.5
              md:h-112.5
              lg:h-130
              object-cover
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="
            absolute inset-0
            flex flex-col
            items-center
            justify-center
            text-white
            text-center
            px-4
          ">

            <h3 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              font-bold
              mb-3"
            >
              {recipe.title}
            </h3>

            <p className="
              text-xs
              sm:text-sm
              tracking-widest
              opacity-90
            ">
              {recipe.category} / {recipe.subCategory}
              <span className="ml-3">
                💬 {recipe.comments || 0}
              </span>
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default SeasonHero;