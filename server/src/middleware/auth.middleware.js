import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { verifyAccessToken } from "../utils/auth.js";
import userModel from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Token not found!",
    });
  }

  try {
    const data = verifyAccessToken(accessToken);

    const user = await userModel.findById(data.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
