const { findRoomName } = require("../controllers/codeBlock");

let userCount = {
  filterLoop: new Set(),
  mapLoop: new Set(),
  reducerLoop: new Set(),
  sumNumber: new Set(),
};

const socketLogic = (io) => {
  io.on("connection", (socket) => {
    // connect event
    console.log("connection");

    // Get room and send back the code
    socket.on("send-room-name", async (romeInit) => {
      userCount[romeInit.roomName].add(romeInit.userId);
      console.log(
        "New User Connected.  ID : " + romeInit.userId,
        `Total users in room ${romeInit.roomName} : ${
          userCount[romeInit.roomName].size
        }`
      );
      const CodeBlockRoom = await findRoomName(romeInit.roomName);
      socket.join(romeInit.roomName);
      socket.emit("receive-codeBlock", {
        ...CodeBlockRoom._doc,
        user: socket.id,
        isMentor: userCount[romeInit.roomName].size === 1,
      });
    });

    // sent solve-exercise to the other member at the room
    socket.on("correct-answer", (roomName) => {
      socket.broadcast.to(roomName).emit("solve-exercise");
    });

    // Code changes handler
    socket.on("send-changes", (changes) => {
      socket.broadcast
        .to(changes?.roomName)
        .emit("receive-changes", changes?.code);
    });

    socket.on("remove-user", (romeData) => {
      console.log(`user ${romeData.userId} deleted`);
      userCount[romeData.roomName].delete(romeData.userId);
    });

    // disconnect event
    socket.on("disconnect", () => {
      console.log("User disconnect");
    });
  });
};

module.exports = socketLogic;
