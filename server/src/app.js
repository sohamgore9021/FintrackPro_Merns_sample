import express from "express";
import authRouter from "./routers/auth.routes.js";
import transactionRouter from "./routers/transaction.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);

app.use((err, req, res, next) => {
  console.log(`the error is ${err}`);
  res.status(500).json({ message: "Server error" });
});

export default app;
