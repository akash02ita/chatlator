
const express = require('express')
const http = require('http')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
