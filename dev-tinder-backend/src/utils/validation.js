import validationFields from "validator";
const { isEmail, isStrongPassword } = validationFields;

export const validateSignupData = (req) => {
    const { name, emailId, password, gender } = req.body;

    if (!name) {
        throw new Error("Name is not valid");
    };

    if (name?.length < 4 || name?.length > 20) {
        throw new Error("Name should be between 4 and 20 characters");
    };

    if (!isEmail(emailId)) {
        throw new Error("Email is not valid");
    };

    if (!isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    };

    if(!gender) {
        throw new Error("Gender is required")
    };
};