const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  socket.join("kitchen-room"); //creating a room syntax
  let sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit("cooking", "Fried Rice Cooking = " + sizeOfKitchen);
  io.sockets.in("kitchen-room").emit("boiling", "Boiling Water"); //entering to the room and sending a msg
  //sending msg to kitchen room

  socket.join("bed-room"); //creating another room
  io.sockets.in("bed-room").emit("sleep", "I am sleeping"); //sending msg to bedroom
  io.sockets.in("bed-room").emit("rest", "I am taking rest");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
  console.log("Server Is now running at port 3000");
});
