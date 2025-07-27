import express, { Router } from "express";
const router = Router();
import {
  connections,
  getAllUsers,
  logout,
  pendingConnectionRequests,
  signin,
  signup,
  userProfile,
} from "../controllers/UserControllers.js";
import catchAsync from "../utils/catchAsync.js";
import verifyToken from "../middlewares/verifyToken.js";

router.post("/signup", express.json(), catchAsync(signup));
router.post("/signin", express.json(), catchAsync(signin));
router.get("/user-profile", verifyToken, catchAsync(userProfile));
router.get("/logout", verifyToken, catchAsync(logout));
router.get("/all-users", catchAsync(getAllUsers));
router.get("/pending-connection-requests", verifyToken, catchAsync(pendingConnectionRequests));
router.get("/connections", verifyToken, catchAsync(connections));

export default router;
