import { Request } from "express";
import { isEmail, isStrongPassword } from "validator";

export const validateSignupData = (req: Request) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    };

    if(firstName?.length < 4 || firstName?.length > 20) {
        throw new Error("FirstName should be between 4 and 20 characters");
    };

    if(!isEmail(emailId)) {
        throw new Error("Email is not valid");
    };

    if(!isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    };
};