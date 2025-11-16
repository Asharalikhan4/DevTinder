import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cronJobs from "./utils/cronJobs.js";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection.js";
import UserRoutes from "./routes/UserRoutes.js";
import ConnectionRequestRoutes from "./routes/ConnectionRequestRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import printError from "./utils/printError.js";
import { AppError } from "./utils/appError.js";

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev")); // Console format -> type of request, endpoint of request, status of request, time it took, size of resource
// cronJobs();

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "DevTinder Api is working fine." });
});
app.use("/user", UserRoutes);
app.use("/connection-request", ConnectionRequestRoutes);
app.use("/chat", ChatRoutes);

// 404 handler
app.use((err, req, res) => {
  printError(err);
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  printError(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Fallback for unexpected errors
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
});

DatabaseAndServerConnection(app);
