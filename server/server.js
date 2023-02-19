/*IMPORT DEPENDENCE*/

const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const socketLogic = require("./socket/socketLogic");

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
  socketLogic(io)

 /*TURNING ON THE SERVER  */
const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on *:${PORT}`);
});
