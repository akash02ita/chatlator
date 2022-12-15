import dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";

import usersRouter from "./routes/user.js";
import randomRouter from "./routes/random.js";
import chatRouter from "./routes/chat.js";

import setupDb from "./db/config.js";


import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
setupDb(process.env.DB_URL);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const appPort = process.env.PORT || 3000;

// use static files of compiiled client-frontend
// add middlewares
app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static("public"));



app.use("/users", usersRouter);
app.use("/random", randomRouter);
app.use("/chats", chatRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});
// app.get("*", async (req, res) => {
//   return res.status(200).json({ message: "Hello World" });
// });

const server = http.createServer(app);
server.listen(appPort);

server.on("listening", () => {
    console.log(`Our Server is listening here: http://localhost:${appPort}/`)
});

server.on("connection", () => {
    console.log('Somebody connected to our server.')
});
