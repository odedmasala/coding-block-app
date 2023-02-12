const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL , () => {
  console.log("connected to code-block-DB database");
});