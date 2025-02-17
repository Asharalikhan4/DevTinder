import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById, signup } from "../controllers/UserControllers";
const router = Router();

router.post("/signup", signup);
router.get("/get-all-users", getAllUsers);
router.get("/get-user-by-id/:id", getUserById);
router.delete("/delete-user-by-id/:id", deleteUserById);

export default router;