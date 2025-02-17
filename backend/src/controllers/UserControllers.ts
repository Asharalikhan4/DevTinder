import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const signup = async (req: Request, res: Response) => {
    try {
        const userObj = {
            firstName: "Ashar",
            lastName: 'Ali Khan',
            emailId: "test@gmail.com",
            password: "test"
        };
        const user = new UserModel(userObj);
        await user.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error saving the user" });
        console.error("Error in signup", error);
    }
};