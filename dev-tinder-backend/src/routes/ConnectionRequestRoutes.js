import express, { Router } from "express";
const router = Router();
import catchAsync from "../utils/catchAsync.js";
import { reviewConnectionRequest, sendConnectionRequest } from "../controllers/ConnectionRequestControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

router.post("/send/:status/:recieverId", express.json(), verifyToken, catchAsync(sendConnectionRequest));
router.post("/review/:status/:requestId", express.json(), verifyToken, catchAsync(reviewConnectionRequest));

export default router;
