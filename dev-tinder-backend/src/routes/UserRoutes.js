import express, { Router } from "express";
const router = Router();
import { signin, signup } from "../controllers/UserControllers.js";
import catchAsync from "../utils/catchAsync.js";

router.post("/signup", express.json(), catchAsync(signup));
router.post("/signin", express.json(), catchAsync(signin));

export default router;