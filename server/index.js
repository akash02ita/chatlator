import dotenv from "dotenv";
import express from "express";
import http from "http";

import usersRouter from "./routes/user.js";
import setupDb from "./db/config.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);

const appPort = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

const server = http.createServer(app);
server.listen(appPort);

server.on("listening", () => {
    console.log(`Our Server is listening here: http://localhost:${appPort}/`)
});

server.on("connection", () => {
    console.log('Somebody connected to our server.')
});
