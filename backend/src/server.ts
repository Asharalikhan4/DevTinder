import express, { Request, Response } from "express";
const app = express();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection";
import UserRoutes from "./routes/UserRoutes";
import ConnectionRequestRoute from "./routes/ConnectionRequestRoutes";

app.use(cors({
    origin: "http://localhost:1234",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Console format -> type of request, endpoint of request, status of request, time it took, size of resource

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/user", UserRoutes);
app.use("/request", ConnectionRequestRoute);

DatabaseAndServerConnection(app);