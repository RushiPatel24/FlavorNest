import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) return;

    try {
      await handleLogin(username, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-xl sm:text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="
        w-full 
        max-w-md 
        bg-gray-900 
        rounded-xl 
        shadow-xl 
        p-6 
        sm:p-8
      ">

        {/* Title */}
        <h1 className="
          text-2xl 
          sm:text-3xl 
          font-bold 
          text-center 
          text-white 
          mb-6
        ">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
            className="
              w-full
              p-3
              rounded-lg
              bg-gray-800
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="
              w-full
              p-3
              rounded-lg
              bg-gray-800
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="
              w-full
              bg-green-500
              hover:bg-green-600
              transition
              duration-300
              text-white
              font-semibold
              py-3
              rounded-lg
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="
          text-gray-400
          text-center
          text-sm
          mt-6
        ">
          Don't have an account?{" "}
          <Link
            className="text-green-400 hover:text-green-500"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
};

export default Login;