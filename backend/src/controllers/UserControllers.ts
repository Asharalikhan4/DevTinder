import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const signup = async (req: Request, res: Response) => {
    try {
        const userObj = (req.body);
        const user = new UserModel(userObj);
        await user.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error saving the user" });
        console.error("Error in signup", error);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "Users Fetched Successfully", users: users });
    } catch (error) {
        res.status(400).json({ message: "Error fetching all users" });
        console.error("Error in getAllUsers", error);
    }
};