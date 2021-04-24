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

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

server.listen(3001, () => {
  console.log("Sever listening on port 3001");
});
