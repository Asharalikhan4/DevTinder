import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/UserModel";
import printError from "../utils/printError";

const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req?.cookies;
        if(!token) {
            return res.status(400).json({ message: "Invalid Token" });
        };
        const decodedObj: string | JwtPayload = jwt.verify(token, config?.jwtSecret);
        const { _id }: string | JwtPayload | any  = decodedObj;
        const user = await UserModel.findById(_id);
        if(!user) {
            return res.status(400).json({ message: "Invalid Token" });
        };
        req.user = user;
        next();
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Issue while validating token" });
    };
};

export default VerifyToken;