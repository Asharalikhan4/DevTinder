import { Router } from "express";
import { getChat } from "../controllers/ChatControllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import catchAsync from "../utils/catchAsync.js";
const router = Router();

router.get("/find/:targetUserId", verifyToken, catchAsync(getChat));

export default router;
