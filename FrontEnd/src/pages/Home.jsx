import React from "react";
import Hero from "../Features/Recipes/components/Hero/Hero";
import PopularRecipes from "../Features/Recipes/components/PopularRecipes";
import Categories from "../Features/Recipes/components/Categories/Categories";
import GetRecipes from "../Features/Recipes/components/Recipes/GetRecipes";
import SeasonRecipes from "../Features/Recipes/components/Recipes/SeasonRecipes";
import SeasonHero from "../Features/Recipes/components/Recipes/SeasonHero";

const Home = () => {
  return (
    <main className="w-full min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Popular Recipes */}
      <section className="mt-10">
        <PopularRecipes />
      </section>

      {/* Categories */}
      <section className="mt-6">
        <Categories />
      </section>

      <GetRecipes/>

      <SeasonRecipes/>

      <SeasonHero/>

    </main>
  );
};

export default Home;