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
        if (users.length === 0) {
            res.status(200).json({ message: "No Users Found" });
        } else {
            res.status(200).json({ message: "Users Fetched Successfully", users: users });
        };
    } catch (error) {
        res.status(400).json({ message: "Error fetching all users" });
        console.error("Error in getAllUsers", error);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.status(200).json({ message: "User Fetched Successfully", user: user });
        } else {
            res.status(200).json({ message: "No User Found" });
        };
    } catch (error) {
        res.status(400).json({ message: "Error fetching User" });
    }
};