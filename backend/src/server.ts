import express from "express";
import VerifyToken from "./middlewares/VerifyToken";
import DatabaseAndServerConnection from "./config/DatabaseAndServerConnection";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/user", VerifyToken, (req, res) => {
    res.status(200).json({ name: "Ashar" });
});

DatabaseAndServerConnection();