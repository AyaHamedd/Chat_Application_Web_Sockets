const cors = require("cors");
const express = require("express");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methode: "*",
  },
});

const rooms = [];
/**** Broadcast messages ****/
io.on("connection", (socket) => {
  socket.on("broadcastMessage", (data) => {
    console.log("New broadcast msg" , data);
    socket.broadcast.emit("broadcastMessage", data);
  });

  socket.on("joinRoom", (room) => {
      console.log("Joined room" , room);
    return socket.join(room);
  });
  socket.on("roomMessage", (room,message) => {
      console.log("message",message,"to room",room);
    socket.to(room).emit("roomMessage", message);
  });
});

server.listen(3001, () => {
  console.log("Sever listening on port 3001");
});
