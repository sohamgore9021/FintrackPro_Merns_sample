import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import crypto from "crypto";

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const generateToken = (userId) => {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      id: userId,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return {accessToken,refreshToken}
};

export const verifyRefreshToken = (token)=>{
  const data = jwt.verify(token, config.REFRESH_TOKEN_SECRET)
  return data
}

export const verifyAccessToken = (token)=>{
  const data = jwt.verify(token,config.ACCESS_TOKEN_SECRET)
  return data
}