/*IMPORT DEPENDENCE*/
require("dotenv").config();
require("./config/database");
const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const socketIo = require("socket.io");
let userCount = 0;
const client = process.env.CLINT_URL;

const io = socketIo(server, {
  cors: {
    origin: client,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New User Connected.  ID : " + socket.id);
  socket.on("room-data", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect, total user left", userCount);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});
