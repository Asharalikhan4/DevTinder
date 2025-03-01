import { Request, Response } from "express";
import { hash } from "bcrypt";
import UserModel from "../models/UserModel";
import printError from "../utils/printError";
import { validateEditProfileData, validateSigninData, validateSignupData } from "../utils/validation";
import config from "../config";
import ConnectionRequestModel from "../models/ConnectionRequestModel";

export const signup = async (req: Request, res: Response) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new UserModel({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json({ message: "User Created Successfully", user: user });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error saving the user" });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        validateSigninData(req);
        const { emailId, password } = req.body;
        const isUserExist = await UserModel.findOne({ emailId });
        if (isUserExist) {
            const isPasswordValid = await isUserExist?.validatePassword(password);
            if (isPasswordValid) {
                const token = isUserExist?.getJWT();
                // add { httpOnly: true on production }
                res.cookie("token", token, { expires: new Date(Date.now() + 12 * 3600000), httpOnly: true, secure: config?.nodeEnv === "production" });     // cookie will expire in 12 hours
                return res.status(200).json({ message: "User Signed In Successfully", user: isUserExist });
            } else {
                return res.status(400).json({ message: "Invalid Credentials" });
            };
        };
        return res.status(400).json({ message: "User not found" });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error signing in" });
    };
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            return res.status(200).json({ message: "No Users Found", data: users });
        } else {
            return res.status(200).json({ message: "Users Fetched Successfully", data: users });
        };
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching all users" });
    }
};

export const getUserProfileById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (user) {
            return res.status(200).json({ message: "User Fetched Successfully", data: user });
        } else {
            return res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching user" });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req?.user) {
            return res.status(200).json({ message: "No User Found" });
        };
        return res.status(200).json({ message: "User Profile Fetched Successfully", user: req?.user });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching user profile" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        // Below down is api level sanitization
        if (!validateEditProfileData(req)) {
            return res.status(400).json({ message: "Invalid Edit Request" });
        };
        const loggedInUser = req?.user;
        Object.keys(req?.body)?.forEach((key) => (loggedInUser[key] = req?.body[key]));
        // const updateOptions = {
        //     returnOriginal: true, // will return the updated document after updating
        //     runValidators: true, // will run the validators defined in the schema
        // };
        // const user = await UserModel.findByIdAndUpdate(req?.user?._id, req.body, updateOptions);
        await loggedInUser.save();
        return res.status(200).json({ message: `Congrats ${loggedInUser?.firstName}, Your Profile Updated Successfully`, data: loggedInUser });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error Updating User" });
    };
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        // Here i'm using the shorthand property to pass the userId. This is the same as { userId: req.params.userId }
        const user = await UserModel.findByIdAndDelete(req.params.userId);
        if (user) {
            return res.status(200).json({ message: "User Deleted Successfully" });
        } else {
            return res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error Deleting User" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // expires the cookie and clears it from the browser
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.clearCookie("token");
        return res.status(200).json({ message: "User Logged Out Successfully" });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error logging out" });
    }
};

export const getAllConnectionRequests = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req?.user;
        const connectionRequests = await ConnectionRequestModel?.find({ recieverId: loggedInUser?._id, status: "pending" })?.populate("senderId", ["firstName", "lastName", "photoUrl", "about", "skills"]);
        return res.status(200).json({ message: "Connection Requests Fetched Successfully", data: connectionRequests });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching connection requests" });
    }
};

export const getAllConnections = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req?.user;

        const connectionRequests = await ConnectionRequestModel?.find({ $or: [{ recieverId: loggedInUser?._id, status: "accepted" }, { senderId: loggedInUser?._id, status: "accepted" }]})?.populate("senderId", ["firstName", "lastName", "photoUrl", "about", "skills"])?.populate("recieverId", ["firstName", "lastName", "photoUrl", "about", "skills"]);
        const data = connectionRequests?.map((row) => {
            if(row?.senderId?._id?.equals(loggedInUser?._id)) {
                return row?.recieverId;
            }
            return row?.senderId;
        });

        return res.status(200).json({ message: "Connections Fetched Successfully", data: data });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching connections" });
    }
};

export const feed = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req?.user;
        const page = parseInt(req?.query?.page as string) || 1;
        let limit = parseInt(req?.query?.limit as string) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        // Getting all the request which user has sent or recieved.
        const connectionRequests = await ConnectionRequestModel?.find({ $or: [{ senderId: loggedInUser?._id }, { recieverId: loggedInUser?._id }]})?.select("senderId recieverId");

        const hideUserFromFeed = new Set();
        connectionRequests?.forEach(req => {
            hideUserFromFeed.add(req?.senderId?.toString());
            hideUserFromFeed.add(req?.recieverId?.toString());
        });

        const feedData = await UserModel
        ?.find({
            $and: [
                {_id: {$nin: Array.from(hideUserFromFeed)}},
                {_id: {$ne: loggedInUser?._id}}
            ]
        })
        ?.select("firstName lastName photoUrl age gender about skills")
        ?.skip(skip)
        ?.limit(limit);


        return res.status(200).json({ message: "Feed Fetched Successfully", data: feedData });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error fetching feed" });
    }
};