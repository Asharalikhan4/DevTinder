import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGO_URL || "",
    nodeEnv: process.env.NODE_ENV || "development"
};

export default config;