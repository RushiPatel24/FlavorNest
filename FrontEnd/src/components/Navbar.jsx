import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {

  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const profileRef = useRef();

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <nav className="bg-neutral-950 text-white shadow-md relative z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-green-500"
        >
          RecipeHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">

          <li className="hover:text-emerald-400">
            <Link to="/">Home</Link>
          </li>

          <li className="hover:text-emerald-400">
            <Link to="/recipes">Recipes</Link>
          </li>

          {/* Categories */}
          <li className="relative group cursor-pointer hover:text-emerald-400">

            Categories

            <ul className="absolute left-0 top-full mt-2 bg-neutral-900 shadow-lg rounded-lg w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

              <li className="px-4 py-2 hover:bg-neutral-800">Indian</li>
              <li className="px-4 py-2 hover:bg-neutral-800">South Indian</li>
              <li className="px-4 py-2 hover:bg-neutral-800">Chinese</li>
              <li className="px-4 py-2 hover:bg-neutral-800">Japanese</li>
              <li className="px-4 py-2 hover:bg-neutral-800">Italian</li>
              <li className="px-4 py-2 hover:bg-neutral-800">Mexican</li>

            </ul>

          </li>

          <li>
            <Link
              to="/add-recipe"
              className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              Add Recipe
            </Link>
          </li>

        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block border border-neutral-700 bg-neutral-900 text-white rounded-full px-4 py-1 placeholder-gray-400 focus:outline-none focus:border-emerald-400"
          />

          {/* Profile */}
          <div className="relative" ref={profileRef}>

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-9 h-9 rounded-full cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <ul className="absolute right-0 mt-2 bg-neutral-900 shadow-lg rounded-lg w-40 z-50">

                <li className="px-4 py-2 hover:bg-neutral-800">
                  Profile
                </li>

                <li className="px-4 py-2 hover:bg-neutral-800">
                  Favorites
                </li>

                <li className="px-4 py-2 hover:bg-red-600 text-white">
                  Logout
                </li>

              </ul>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden bg-neutral-900 px-6 pb-6 space-y-4">

          <Link to="/" className="block hover:text-emerald-400">
            Home
          </Link>

          <Link to="/recipes" className="block hover:text-emerald-400">
            Recipes
          </Link>

          <p className="text-gray-400 text-sm mt-4">
            Categories
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">

            <span>Indian</span>
            <span>South Indian</span>
            <span>Chinese</span>
            <span>Japanese</span>
            <span>Italian</span>
            <span>Mexican</span>

          </div>

          <Link
            to="/add-recipe"
            className="block bg-emerald-500 px-4 py-2 rounded-lg text-center"
          >
            Add Recipe
          </Link>

        </div>

      )}

    </nav>
  );
}