import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import config from "../config/config.js";
import UserModel from "../models/UserModel.js";

export default async function verifyToken(req, _, next) {
    const { token } = req?.cookies;
    if (!token) {
        throw new AppError("Invalid Token", 400);
    };
    const decodedObj = jwt.verify(token, config?.jwtSecret);
    const { _id } = decodedObj;
    const user = await UserModel.findOne({ _id }).select("-createdAt -updatedAt -__v");
    if (!user) {
        throw new AppError("Invalid Token", 400)
    };
    req.user = user;
    next();
};