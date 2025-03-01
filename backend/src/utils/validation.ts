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

export const validateSigninData = (req: Request) => {
    const { emailId } = req.body;

    if(!isEmail(emailId)) {
        throw new Error("Email is not valid");
    };
};

export const validateEditProfileData = (req: Request) => {
    const editableFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "gender", "age", "skills"];
    const idEditAllowed = Object.keys(req.body).every(field => editableFields.includes(field));
    return idEditAllowed;
};