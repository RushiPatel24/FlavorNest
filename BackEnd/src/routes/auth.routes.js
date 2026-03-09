const { Router } = require("express");
const authController = require("../controller/auth.controller");

const authRouter = Router();


/* ===============================
   AUTH ROUTES
   =============================== */

// Register a new user
authRouter.post('/register', authController.registerUser);

// Login user and generate token
authRouter.post('/login', authController.loginUser);



// Export router
module.exports = authRouter;