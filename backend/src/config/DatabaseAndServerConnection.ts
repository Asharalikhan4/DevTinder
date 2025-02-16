import express from "express";
const app = express();
import { connect } from "mongoose";
import config from "./index";
import printMongoDBConnectionInfo from "../utils/printMongoDBConnectionInfo";
import printExpressConnectionInfo from "../utils/printExpressConnectionInfo";

const DatabaseAndServerConnection = async () => {
    try {
        const dbConnectResponse = await connect(config.mongoURL);
        printMongoDBConnectionInfo(dbConnectResponse);
        if(dbConnectResponse.connection.readyState === 1) {
            app.listen(config.port, () => {
                printExpressConnectionInfo(config.port)
            });
        };
    } catch (error) {
        console.error("Error in database connection", error);
    }
};

export default DatabaseAndServerConnection;