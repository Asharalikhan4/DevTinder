import { Router } from "express";
import { reviewConnectionRequest, sendConnectionRequest } from "../controllers/ConnectionRequestController";
import VerifyToken from "../middlewares/VerifyToken";
const router = Router();    // in this you can name anything in place of router like userRouter, userRoutes, etc.

router.post("/send/:status/:recieverId", VerifyToken, sendConnectionRequest);
router.post("/review/:status/:requestId", VerifyToken, reviewConnectionRequest);

export default router;