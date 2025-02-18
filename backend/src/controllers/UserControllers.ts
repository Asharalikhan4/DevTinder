import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import printError from '../utils/printError';
import { validateSignupData } from '../utils/validation';
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            firstName,
            lastName,
            emailId,
            password: hashedPassword 
        });
        await user.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error saving the user" });
        printError(error);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            res.status(200).json({ message: "No Users Found", users: users });
        } else {
            res.status(200).json({ message: "Users Fetched Successfully", users: users });
        };
    } catch (error) {
        res.status(400).json({ message: "Error fetching all users" });
        printError(error);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (user) {
            res.status(200).json({ message: "User Fetched Successfully", user: user });
        } else {
            res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        printError(error);
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    try {

        // Below down is api level sanitization

        const updateOptions = {
            returnDocument: "after", // will return the updated document after updating
            runValidators: true, // will run the validators defined in the schema
        };
    
        const allowedUpdates = ["userId", "photoUrl", "about", "gender", "age", "skills"];  // These are the fields that can be updated by the user
    
        const isUpdateAllowed = Object.keys(req.body).every((variable) => allowedUpdates.includes(variable));

        if(!isUpdateAllowed) {
            return res.status(400).json({ message: "Invalid Updates" });
        };

        const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, updateOptions);
        if (user) { 
            res.status(200).json({ message: "User Updated Successfully" });
        } else {
            res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        res.status(400).json({ message: "Error Updating User" });
        printError(error);
    };
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        // Here i'm using the shorthand property to pass the userId. This is the same as { userId: req.params.userId }
        const user = await UserModel.findByIdAndDelete(req.params.userId);
        if (user) {
            res.status(200).json({ message: "User Deleted Successfully" });
        } else {
            res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        res.status(400).json({ message: "Error Deleting User" });
        printError(error);
    }
};