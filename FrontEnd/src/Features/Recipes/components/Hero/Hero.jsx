import React, { useEffect, useState } from "react";
import useTrendingRecipes from "../../hooks/useTrendingRecipes";
import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";

const Hero = () => {
  const recipes = useTrendingRecipes();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!recipes.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % recipes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [recipes]);

  const recipe = recipes[index];

  if (!recipe) return null;

  return (
    <section className="relative w-full overflow-hidden
      h-[65vh] sm:h-[70vh] md:h-[80vh] lg:h-[88vh]">

      {/* Background Image Slider */}
      <HeroSlider recipe={recipe} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Text Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-16 lg:px-24">
        <HeroContent recipe={recipe} />
      </div>

    </section>
  );
};

export default Hero;