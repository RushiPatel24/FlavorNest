import React from "react";
import { AuthProvider } from "./Features/Auth/auth.context";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./AppRoutes";


const App = () => {

  return (


    <div>

      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>

    </div>
  );
};

export default App;