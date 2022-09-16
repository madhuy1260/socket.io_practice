const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("message1", function (msg) {
    console.log(msg);
    io.emit("messagereturn", msg);
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
  console.log("Server Is now running at port 3000");
});
