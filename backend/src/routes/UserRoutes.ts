import { Router } from "express";
import { deleteUserById, getAllUsers, getUserProfileById, getUserProfile, signin, signup, updateUser, logout, getAllConnectionRequests, feed } from "../controllers/UserController";
import VerifyToken from "../middlewares/VerifyToken";
const router = Router();    // in this you can name anything in place of router like userRouter, userRoutes, etc.

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/all-users", VerifyToken, getAllUsers);
router.get("/user-profile",VerifyToken, getUserProfile);
router.get("/user-by-id/:userId",VerifyToken, getUserProfileById);
router.delete("/delete-user/:userId",VerifyToken, deleteUserById);
router.patch("/update-user/:userId",VerifyToken, updateUser);
router.get("/connection-requests",VerifyToken, getAllConnectionRequests);
router.get("/feed", VerifyToken, feed);

export default router;