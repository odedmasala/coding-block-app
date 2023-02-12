/*IMPORT DEPENDENCE*/
const app = require("express")()
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
require('./config/database');


/* DISCONNECTED CONFIGURATIONS FROM THE DATABASE */
mongoose.connection.on("disconnected", () => {
    console.log("mongo DB disconnected");
  });

  /* SET SERVER PORT */
const PORT = process.env.PORT || 6001;

/* SETON THE SERVER */
app.listen(PORT, () => {
    /* CONNECT TO DB */
    connectDB();
    /* INITIALIZE PASSPORT TO SERVER*/
    console.log(`app listen http://localhost:${PORT}`);
  });