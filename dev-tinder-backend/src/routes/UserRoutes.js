import express, { Router } from "express";
const router = Router();
import { signup } from "../controllers/UserControllers.js";

router.post("/signup", express.json(), signup);

export default router;