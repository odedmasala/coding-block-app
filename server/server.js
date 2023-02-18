/*IMPORT DEPENDENCE*/

const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const { findRoomName } = require("./controllers/codeBlock");

/*CONFIGURATION*/
require("dotenv").config();
require("./config/database");

/*CORS CONNECTION*/
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

  /*SOCKET NETWORK  */
  let userCount = 0;
io.on("connection", (socket) => {
    // connect event
  console.log("connection");
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
   // sent solve-exercise to the other member at the room
socket.on("correct-answer",(roomName)=>{
  socket.broadcast.to(roomName).emit("solve-exercise");
})
  // Code changes handler
  socket.on("send-changes", (changes) => {
    socket.broadcast
      .to(changes?.roomName)
      .emit("receive-changes", changes?.code);
  });
// disconnect event
  socket.on("disconnect", () => {
    userCount--;
    console.log("User disconnect, total user left", userCount);
  });
});

 /*TURNING ON THE SERVER  */
const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});
