import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  refreshAllTokenController,
  registerController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.post("/refresh", refreshAllTokenController);
router.get("/me",authenticate, getMeController);
router.post("/logout",authenticate, logoutController);
router.patch("/profile",authenticate, updateProfileController)

export default router;

/*
"Every user has a unique MongoDB _id. 
The JWT carries that ID, and the authentication middleware uses it to identify the user on every protected request. 
Controllers then use that user's ID to perform operations only on their data."

REGISTER
User created in MongoDB
       ↓
user._id = "123"
       ↓
LOGIN
       ↓
JWT contains { id: "123" }
       ↓
Every protected request sends JWT
       ↓
authenticate middleware verifies JWT
       ↓
gets id = "123"
       ↓
req.user = that user
       ↓
Transaction controller uses req.user._id
       ↓
Only User 123's transactions are accessed/modified
 */