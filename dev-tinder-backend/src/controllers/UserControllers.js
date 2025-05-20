import { hash } from "bcrypt";
import { validateSigninData, validateSignupData } from "../utils/validation.js";
import UserModel from "../models/UserModel.js";
import { AppError } from "../utils/appError.js";
import config from "../config/config.js";

export const signup = async (req, res) => {
    validateSignupData(req);
    const { name, email, password, gender, age, about, skills } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        about,
        skills
    });
    await user.save();
    return res.status(201).json({ message: "User Created Successfully", user: user });
};

export const signin = async (req, res) => {
    validateSigninData(req);
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
        throw new AppError("User does not exist.", 400);
    };
    const isPasswordValid = await userExist?.validatePassword(password);
    if (!isPasswordValid) {
        throw new AppError("Invalid Credentials", 400);
    };
    const token = await userExist.getJWT();
    // add { httpOnly: true on production }
    res.cookie("token", token, { expires: new Date(Date.now() + 12 * 3600000), httpOnly: true, secure: config.nodeEnv === "production" });     // cookie will expire in 12 hours
    return res.status(200).json({ message: "User Signed In Successfully", user: userExist });
};

export const userProfile = async (req, res) => {
    if (!req?.user) {
        throw new AppError("No User Found", 400);
    };
    console.log("user profile", req);
    return res.status(200).json({ message: "User Profile Fetched Successfully", user: req?.user });
};