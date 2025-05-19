import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGODB_URL || "",
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "notSoSecret",
};

export default config;