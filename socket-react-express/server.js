const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);
const path = require("path");

app.use(express.static("client/build")); //making static file to use in the backend

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/express-server", function (req, res) {
  res.end("This is my backend server");
});

io.on("connection", function (socket) {
  console.log("New User Connected");

  setTimeout(function () {
    socket.emit("msg", "This is message from express server");
  }, 2000);

  socket.on("disconnect", function () {
    console.log("User DisConnected");
  });
});

expressServer.listen(5000, function () {
  console.log("Server Is now running at port 5000");
});
