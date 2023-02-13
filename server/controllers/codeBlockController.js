const CodeBlock = require("../models/codeBlock")

const findOrCreateCodeBlock = async (id) =>{
    if (id == null) return
    const codeBlock = await CodeBlock.findById(id)
}