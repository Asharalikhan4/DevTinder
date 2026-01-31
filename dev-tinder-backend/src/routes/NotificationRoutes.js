import express, { Router } from "express";
const router = Router();
import catchAsync from "../utils/catchAsync.js";
import { reviewConnectionRequest, sendConnectionRequest } from "../controllers/ConnectionRequestControllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import { postNotification } from "../controllers/NotificationController.js";

router.post("/send", express.json(), postNotification);

export default router;
