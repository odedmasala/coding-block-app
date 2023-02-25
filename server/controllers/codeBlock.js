const CodeBlock = require("../models/codeBlock");

const findRoomName = async (receivingName) => {
  if (receivingName == null) return;
  const codeBlock = await CodeBlock.findById(receivingName);
  if (codeBlock) return codeBlock;
  return "room not found";
};
module.exports = {
  findRoomName,
};
