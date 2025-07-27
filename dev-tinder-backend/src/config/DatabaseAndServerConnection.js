import { connect } from "mongoose";
import { createServer } from 'node:http';
import printMongoDBConnectionInfo from "../utils/printMongoDBConnectionInfo.js";
import printExpressConnectionInfo from "../utils/printExpressConnectionInfo.js";
import config from "./config.js";
import socketConnection from "./socketConnection.js";

export default async function DatabaseAndServerConnection(app) {
    try {
        const server = createServer(app);
        socketConnection(server);
        const dbConnectionResponse = await connect(config.mongoURL);
        printMongoDBConnectionInfo(dbConnectionResponse);
        if (dbConnectionResponse.connection.readyState === 1) {
            server.listen(8080, () => {
                printExpressConnectionInfo(config?.port)
            });
        };
    } catch (error) {
        console.error("Error in database connection", error);
        process.exit(1);
    }
};