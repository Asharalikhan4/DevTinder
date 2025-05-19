import { hash } from "bcrypt";
import { validateSignupData } from "../utils/validation.js";
import UserModel from "../models/UserModel.js";
import printError from "../utils/printError.js";

export const signup = async (req, res) => {
    try {
        validateSignupData(req);
        const { name, emailId, password, gender, age, about, skills } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new UserModel({
            name,
            emailId,
            password: hashedPassword,
            age,
            gender,
            about,
            skills
        });
        await user.save();
        return res.status(201).json({ message: "User Created Successfully", user: user });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error saving the user" });
    }
};