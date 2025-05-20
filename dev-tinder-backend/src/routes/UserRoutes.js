import express, { Router } from "express";
const router = Router();
import { signin, signup, userProfile } from "../controllers/UserControllers.js";
import catchAsync from "../utils/catchAsync.js";
import verifyToken from "../middlewares/verifyToken.js";

router.post("/signup", express.json(), catchAsync(signup));
router.post("/signin", express.json(), catchAsync(signin));
router.get("/user-profile", verifyToken, catchAsync(userProfile));

export default router;