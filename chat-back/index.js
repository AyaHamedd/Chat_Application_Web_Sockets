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

  socket.on("broadcastMessage", (data) => {
    socket.broadcast.emit("broadcastMessage", data);
  });

  socket.on("joinRoom", (room) => {
    return socket.join(room);
  });

  socket.on("roomMessage", (room, message) => {
    socket.to(room).emit("roomMessage", message);
  });

  socket.on("getUsers", () => {
    socket.emit("getUsers", users.splice(sender-1, 1));
  });

  socket.on("sendPrivate", (socketId, message) => {
    io.to(socketId).emit("sendPrivate",message);
  });

  socket.on("disconnect", function () {
    delete users[sender];
  });
});
server.listen(3001, () => {
  console.log("Sever listening on port 3001");
});
