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
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  userCount++;
  console.log(
    "New User Connected.  ID : " + socket.id,
    ", Total users: " + userCount
  );

  // Get room and send back the code
  socket.on("send-room-name", async (roomName) => {
    const CodeBlockRoom = await findRoomName(roomName);
    socket.join(roomName);
    socket.emit("receive-codeBlock", {
      ...CodeBlockRoom._doc,
      user:socket.id,
      userCount :userCount,
      isMentor : userCount ===1 ? true : false
    });
  });
socket.on("correct-answer",(roomName)=>{
  socket.broadcast.to(roomName).emit("Solve-exercise");
})
  // Code changes handler
  socket.on("send-changes", (changes) => {
    socket.broadcast
      .to(changes?.roomName)
      .emit("receive-changes", changes?.code);
  });

  socket.on("disconnect", () => {
    userCount--;
    console.log("User disconnect, total user left", userCount);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});
