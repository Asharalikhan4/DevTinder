import { connect } from "mongoose";
import printMongoDBConnectionInfo from "../utils/printMongoDBConnectionInfo.js";
import printExpressConnectionInfo from "../utils/printExpressConnectionInfo.js";
import config from "./config.js";

export default async function DatabaseAndServerConnection(app) {
    try {
        const dbConnectionResponse = await connect(config.mongoURL);
        printMongoDBConnectionInfo(dbConnectionResponse);
        if (dbConnectionResponse.connection.readyState === 1) {
            app.listen(8080, () => {
                printExpressConnectionInfo(config?.port)
            });
        };
    } catch (error) {
        console.error("Error in database connection", error);
        process.exit(1);
    }
};