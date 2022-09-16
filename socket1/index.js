const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);

// io.on('connection',function(socket){
//      console.log("New user Connected")

//      setTimeout(function(){
//           socket.send("Hello Easy Learning of Socket server to client")
//      },10000) //sends a message from server to client

//      setInterval(function(){
//           let date = new Date()
//           let time = date.getTime()

//           socket.send(time)
//      },2000)

//      socket.on('disconnect',function(){
//           console.log("user Disconnected")
//      })
// }

let buyNsp = io.of("/buy"); //Declaring the namespace for IO -- endpoints or paths or channels
buyNsp.on("connection", function (scoket) {
  buyNsp.emit("MyEvent", "Hello buy");
  //   socket.send("Hello Easy Learning of Socket server to client")
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", function (scoket) {
  sellNsp.emit("MyEvent", "Hello sell");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
  console.log("Server Is now running at port 3000");
});
