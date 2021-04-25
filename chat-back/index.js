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

const users = [];
/**** Broadcast messages ****/
io.on("connection", (socket) => {
  users.push(socket.id);

  const sender = users.indexOf(socket.id);
  console.log("new socket connection", socket.id);

  socket.on("broadcastMessage", (data) => {
    console.log("New broadcast msg", data);
    socket.broadcast.emit("broadcastMessage", data);
  });

  socket.on("joinRoom", (room) => {
    console.log("Joined room", room);
    return socket.join(room);
  });

  socket.on("roomMessage", (room, message) => {
    console.log("message", message, "to room", room);
    socket.to(room).emit("roomMessage", message);
  });

  socket.on("getUsers", () => {
    console.log("sending users");
    console.log(sender);
    socket.emit("getUsers", users.splice(sender-1, 1));
  });
  socket.on("sendPrivate", (socketId, message) => {
    io.to(socketId).emit("sendPrivate",message);
    console.log("sending private message", socketId);
  });
  socket.on("disconnect", function () {
    delete users[sender];
    console.log("socket", socket.id, "disconnected");
    console.log(users);
  });
});
server.listen(3001, () => {
  console.log("Sever listening on port 3001");
});
