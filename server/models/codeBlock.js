const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
  _id: String,
  blockTitle: String,
  CodeToEdit: String,
  codeSolution: String,
});

const codeBlock = mongoose.model("codeBlock", codeBlockSchema);

module.exports = codeBlock;
