const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
});