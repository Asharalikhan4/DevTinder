import { Schema, model } from "mongoose";
import { isEmail, isStrongPassword, isURL } from "validator";

const UserSchema = new Schema({
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
        trim: true,
        validate(value: string) {
            if(!["male", "female", "others"]?.includes(value)) {
                throw new Error("Gender data is not valid");
            };
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

// In model you first pass the name of the model and then you pass the schema.
const UserModel = model("User", UserSchema);
export default UserModel;