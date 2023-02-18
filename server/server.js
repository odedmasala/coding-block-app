/*IMPORT DEPENDENCE*/
require("dotenv").config();
require("./config/database");
const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const { findRoomName } = require("./controllers/codeBlock");



let userCount = {
  filterLoop: new Set(),
  mapLoop: new Set(),
  reducerLoop: new Set(),
  sumNumber: new Set(),
};
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection");
 
  // Get room and send back the code
  socket.on("send-room-name", async (romeInit) => {
    console.log("send-room-name");
    userCount[romeInit.roomName].add(romeInit.userId);
    console.log(
      "New User Connected.  ID : " + romeInit.userId,
      `Total users in room ${romeInit.roomName} : ${userCount[romeInit.roomName].size}`
    );
    const CodeBlockRoom = await findRoomName(romeInit.roomName);
    socket.join(romeInit.roomName);
    socket.emit("receive-codeBlock", {
      ...CodeBlockRoom._doc,
      user: socket.id,
      userCount: userCount,
      isMentor: userCount[romeInit.roomName].size === 1,
    });
  });

  socket.on("correct-answer", (roomName) => {
    console.log("correct-answer");
    socket.broadcast.to(roomName).emit("Solve-exercise");
  });
  // Code changes handler
  socket.on("send-changes", (changes) => {
    console.log("send-changes");

    socket.broadcast
      .to(changes?.roomName)
      .emit("receive-changes", changes?.code);
  });
  socket.on("remove-user", (romeData) => {
    console.log(`user ${romeData.userId} deleted`);
    userCount[romeData.roomName].delete(romeData.userId);
    
  });
  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});
