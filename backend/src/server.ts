import express, { Request, Response } from "express";
const app = express();
import morgan from "morgan";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection";
import UserRoutes from "./routes/UserRoutes";

app.use(express.json());
app.use(morgan("dev")); // Console format -> type of request, endpoint of request, status of request, time it took, size of resource

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/user", UserRoutes);

DatabaseAndServerConnection(app);