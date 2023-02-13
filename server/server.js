/*IMPORT DEPENDENCE*/
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const client = process.env.CLINT_URL
const io = new Server(server,{
  cors: {
    origin: client,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.emit("hello", "world");
  socket.on("ping", (socket) => {
    io.emit("pong");
  });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});