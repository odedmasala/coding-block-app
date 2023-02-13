const CodeBlock = require("../models/codeBlock");

const findRoomName = async (receivingName) => {
  if (receivingName == null) return;
  console.log(receivingName);
  const codeBlock = await CodeBlock.findOne({ "romeName":receivingName});
  if (codeBlock) return codeBlock;
  return "room not found";
};
module.exports = {
  findRoomName,
};
