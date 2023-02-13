const CodeBlock = require("../models/codeBlock")


const findByName = async(receivingName) =>{
    if (receivingName == null) return
    const codeBlock = await CodeBlock.find({name:receivingName})
}