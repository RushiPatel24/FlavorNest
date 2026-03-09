import React from "react";
import { motion } from "framer-motion";
import usePopularRecipes from "../hooks/usePopularRecipes";

const PopularRecipes = () => {
  const { recipes, loading } = usePopularRecipes();

  const dummyRecipes = [
    {
      _id: "1",
      title: "Butter Chicken",
      category: "Indian",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "2",
      title: "Chicken Biryani",
      category: "Indian",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "3",
      title: "Pizza",
      category: "Italian",
      image:
        "https://images.unsplash.com/photo-1601924638867-3ec2c2b2a6d5?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "4",
      title: "Sushi",
      category: "Japanese",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "5",
      title: "Veg Burger",
      category: "Fast Food",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const data = recipes?.length ? recipes : dummyRecipes;

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-400">
        Loading recipes...
      </p>
    );
  }

  const item = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Most Popular Recipes
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Big Left */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.3 }}
          whileHover={{ scale: 1.04 }}
          className="relative sm:col-span-2 h-70 md:h-87.5 rounded-xl overflow-hidden shadow-lg"
        >
          <motion.img
            src={data[0]?.image}
            alt={data[0]?.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold">
              {data[0]?.title}
            </h3>
            <p className="text-sm opacity-80">{data[0]?.category}</p>
          </div>
        </motion.div>

        {/* Big Right */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.3 }}
          whileHover={{ scale: 1.04 }}
          className="relative h-70 md:h-87.5 rounded-xl overflow-hidden shadow-lg"
        >
          <motion.img
            src={data[1]?.image}
            alt={data[1]?.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl md:text-2xl font-bold">
              {data[1]?.title}
            </h3>
            <p className="text-sm opacity-80">{data[1]?.category}</p>
          </div>
        </motion.div>

        {/* Bottom Cards */}
        {data.slice(2, 5).map((recipe) => (
          <motion.div
            key={recipe._id}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="relative h-50 rounded-xl overflow-hidden shadow-lg"
          >
            <motion.img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-xs opacity-80">{recipe.category}</p>
            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default PopularRecipes;


// import React from "react";
// import { motion } from "framer-motion";
// import usePopularRecipes from "../hooks/usePopularRecipes";

// const PopularRecipes = () => {

//   const { recipes, loading } = usePopularRecipes();

//   if (loading || !recipes || recipes.length < 5) {
//   return (
//     <p className="text-center py-20 text-gray-400">
//       Loading recipes...
//     </p>
//   );
// }

//   return (
//     <div className="max-w-7xl mx-auto py-16 px-6">

//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl font-bold text-center mb-8"
//       >
//         Most Popular Recipes
//       </motion.h2>

//       {/* Grid */}
//       <div className="grid grid-cols-3 grid-rows-2 gap-4">

//         {/* Big Left */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           whileHover={{ scale: 1.03 }}
//           className="relative col-span-2 h-72 overflow-hidden rounded-lg"
//         >

//           <motion.img
//             src={recipes[0]?.image}
//             alt={recipes[0]?.title}
//             className="w-full h-full object-cover"
//             whileHover={{ scale: 1.1 }}
//           />

//           <div className="absolute inset-0 bg-black/40"></div>

//           <div className="absolute bottom-6 left-6 text-white">
//             <h3 className="text-3xl font-bold">
//               {recipes[0]?.title}
//             </h3>
//             <p className="text-sm">{recipes[0]?.category}</p>
//           </div>

//         </motion.div>

//         {/* Big Right */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           whileHover={{ scale: 1.03 }}
//           className="relative h-72 overflow-hidden rounded-lg"
//         >

//           <motion.img
//             src={recipes[1]?.image}
//             alt={recipes[1]?.title}
//             className="w-full h-full object-cover"
//             whileHover={{ scale: 1.1 }}
//           />

//           <div className="absolute inset-0 bg-black/40"></div>

//           <div className="absolute bottom-6 left-6 text-white">
//             <h3 className="text-2xl font-bold">
//               {recipes[1]?.title}
//             </h3>
//             <p className="text-sm">{recipes[1]?.category}</p>
//           </div>

//         </motion.div>

//         {/* Bottom Cards */}
//         {recipes.slice(2,5).map((recipe, i) => (
//           <motion.div
//             key={recipe._id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05 }}
//             transition={{ delay: i * 0.2 }}
//             className="relative h-44 overflow-hidden rounded-lg"
//           >

//             <motion.img
//               src={recipe.image}
//               alt={recipe.title}
//               className="w-full h-full object-cover"
//               whileHover={{ scale: 1.1 }}
//             />

//             <div className="absolute inset-0 bg-black/40"></div>

//             <div className="absolute bottom-4 left-4 text-white">
//               <h3 className="text-lg font-semibold">
//                 {recipe.title}
//               </h3>
//               <p className="text-xs">{recipe.category}</p>
//             </div>

//           </motion.div>
//         ))}

//       </div>

//     </div>
//   );
// };

// export default PopularRecipes;