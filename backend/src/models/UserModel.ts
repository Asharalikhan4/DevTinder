import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// In model you first pass the name of the model and then you pass the schema.
const UserModel = model("User", UserSchema);
export default UserModel;