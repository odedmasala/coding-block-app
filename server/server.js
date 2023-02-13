/*IMPORT DEPENDENCE*/
require("dotenv").config();
require("./config/database");
const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const { findRoomName } = require("./controllers/codeBlock");
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

   // Get room and send back the code
  socket.on("send-room-name", async (roomName) => {
    console.log(roomName);
    const CodeBlockRoom = await findRoomName(roomName);
    console.log(CodeBlockRoom);
    socket.join(roomName);
    socket.emit("receive-codeBlock",CodeBlockRoom)
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
