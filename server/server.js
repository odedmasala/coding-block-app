/*IMPORT DEPENDENCE*/
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/configDB");
const app = express();


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