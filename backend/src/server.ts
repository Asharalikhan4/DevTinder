import express, { Request, Response } from "express";
const app = express();
import morgan from "morgan";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection";
import UserRoutes from "./routes/UserRoutes";

// Console format -> type of request, endpoint of request, status of request, time it took, size of resource
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/user", UserRoutes);

DatabaseAndServerConnection(app);