import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import io from 'socket.io-client';

const socket = io();
const CodeBlock = () => {
  const codeBlockDocument = {
    _id: 1,
    blockTitle: "map loop room",
    CodeToEdit: `const numArray = [1, 10, 5, 20, 42, 11, 28, 31, 61, 39];
  // * return from the function eace number with plus 5
  function mapNumbars(array) {
//   write your code below
 let filterArray;
  }`,
    codeSolution: "54",
    isMentor:true,  };
  return (
    <>
      <div className="codeBlock-container">
        <div className="codeBlock-title">
          <h1>CodeBlock</h1>
          <h3>{codeBlockDocument.blockTitle}</h3>
        </div>
        <div className="editor-container">
          <Editor
            options={{ readOnly: true }}
            theme="vs-dark"
            height="300px"
            width="80%"
            defaultLanguage="javascript"
            defaultValue={codeBlockDocument.CodeToEdit}
          />
        </div>
      </div>
    </>
  );
};

export default CodeBlock;
