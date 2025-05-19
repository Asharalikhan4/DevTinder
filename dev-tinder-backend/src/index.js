import express from "express";
const app = express();
import morgan from "morgan";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection.js";
import UserRoutes from "./routes/UserRoutes.js";

app.use(morgan("dev")); // Console format -> type of request, endpoint of request, status of request, time it took, size of resource

app.get("/", (req, res) => {
    res.status(200).json({ message: "DevTinder Api is working fine." });
});
app.use("/user", UserRoutes);

DatabaseAndServerConnection(app);