import { hash } from "bcrypt";
import { validateSigninData, validateSignupData } from "../utils/validation.js";
import UserModel from "../models/UserModel.js";
import ConnectionRequestModel from "../models/ConnectionRequestModel.js";
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
    const userExist = await UserModel.findOne({ email }).select("-createdAt -updatedAt -__v");
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
    return res.status(200).json({ message: "User Signed In Successfully", user: userExist, token: token });
};

export const userProfile = async (req, res) => {
    if (!req?.user) {
        throw new AppError("No User Found", 400);
    };
    return res.status(200).json({ message: "User Profile Fetched Successfully", user: req?.user });
};

export const logout = async (req, res) => {
    // expires the cookie and clears it from the browser
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.clearCookie("token");
    return res.status(200).json({ message: "User Logged Out Successfully" });
};

export const feed = async (req, res) => {
    const loggedInUser = req?.user;
    const page = parseInt(req?.query?.page) || 1;
    let limit = parseInt(req?.query?.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Getting all the request which user has sent or recieved.
    const connectionRequests = await ConnectionRequestModel?.find({ $or: [{ senderId: loggedInUser?._id }, { recieverId: loggedInUser?._id }] })?.select("senderId recieverId");

    const hideUserFromFeed = new Set();
    connectionRequests?.forEach(req => {
        hideUserFromFeed.add(req?.senderId?.toString());
        hideUserFromFeed.add(req?.recieverId?.toString());
    });

    const feedData = await UserModel
        ?.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser?._id } }
            ]
        })
        ?.select("firstName lastName photoUrl age gender about skills")
        ?.skip(skip)
        ?.limit(limit);


    return res.status(200).json({ message: "Feed Fetched Successfully", data: feedData });
};

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find({}).select("name photoUrl age gender about skills");
    return res.status(200).json({ message: "All Users Fetched Successfully", data: users });
};