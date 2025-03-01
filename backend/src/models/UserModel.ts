import { Schema, model } from "mongoose";
import { isEmail, isStrongPassword, isURL } from "validator";
import config from "../config";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    emailId: string;
    password: string;
    photoUrl?: string;
    about?: string;
    skills: string[];
    age?: number;
    gender?: string;
    createdAt: Date;
    updatedAt: Date;
    getJWT: () => string;
    validatePassword: (inputPassword: string) => Promise<boolean>;
};

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // Removes whitespaces from the beginning and end of the string.
        validate(email: string) {
            if(!isEmail(email)){
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(password: string) {
            if(!isStrongPassword(password)) {
                throw new Error("Password is not strong");
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        min: 12,
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: `{VALUE} is not a valid gender`
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        trim: true,
        validate(url: string) {
            if(!isURL(url)) {
                throw new Error("Photo URL is not valid");
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
        trim: true,
        match: [/^(?!.*\s{2,}).+$/, "About field should not have multiple spaces between words"]
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true,
});

UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.methods.getJWT = function() {
    const token: string = sign({ _id: this._id }, config?.jwtSecret, { expiresIn: "1h" });
    return token;
};

UserSchema.methods.validatePassword = async function(inputPassword: string) {
    const isPasswordValid: boolean = await compare(inputPassword, this.password);  // if you interchange the arguments then it will through an error or inconsistent results.
    return isPasswordValid;
};

// In model you first pass the name of the model and then you pass the schema.
const UserModel = model<IUser>("User", UserSchema);
export default UserModel;