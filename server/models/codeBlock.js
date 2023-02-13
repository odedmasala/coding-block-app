const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
  _id: String,
  blockTitle: String,
  codeSolution: String,
  isMentor: Boolean,
});

const codeBlock = mongoose.model("codeBlock", codeBlockSchema);

module.exports = codeBlock;
