import validationFields from "validator";
import { AppError } from "./appError.js";
const { isEmail, isStrongPassword } = validationFields;

export const validateSignupData = (req) => {
    const { name, email, password, gender } = req.body;

    if (!name) {
        throw new AppError("Name is not valid", 400);
    };

    if (name?.length < 4 || name?.length > 20) {
        throw new Error("Name should be between 4 and 20 characters");
    };

    if (!email ||!isEmail(email)) {
        throw new AppError("Email is not valid", 400);
    };

    if (!isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    };

    if(!gender) {
        throw new Error("Gender is required")
    };
};

export const validateSigninData = (req) => {
    const { email, password } = req.body;

    if(!email || !isEmail(email)) {
        throw new AppError("Email is not valid", 400);
    };

    if(!password) {
        throw new AppError("Password is required", 400);
    };
};

export const validateEditProfileData = (req) => {
  
}