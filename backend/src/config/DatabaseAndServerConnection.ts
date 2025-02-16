import { Express } from "express-serve-static-core";
import { connect } from "mongoose";
import config from "./index";
import printMongoDBConnectionInfo from "../utils/printMongoDBConnectionInfo";
import printExpressConnectionInfo from "../utils/printExpressConnectionInfo";

const DatabaseAndServerConnection = async (app: Express) => {
    try {
        const dbConnectResponse = await connect(config.mongoURL);
        printMongoDBConnectionInfo(dbConnectResponse);
        if(dbConnectResponse.connection.readyState === 1) {
            app.listen(8080, () => {
                printExpressConnectionInfo(config.port)
            });
        };
    } catch (error) {
        console.error("Error in database connection", error);
        process.exit(1);
    }
};

export default DatabaseAndServerConnection;