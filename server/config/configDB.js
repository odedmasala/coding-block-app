require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      }
    );
    console.log("The DB login was successful");
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;