import { Router } from "express";
import { signup } from "../controllers/UserControllers";
const router = Router();

router.post("/signup", signup);

export default router;