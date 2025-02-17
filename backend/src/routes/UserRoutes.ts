import { Router } from "express";
import { getAllUsers, signup } from "../controllers/UserControllers";
const router = Router();

router.post("/signup", signup);
router.get("/get-all-users", getAllUsers);

export default router;