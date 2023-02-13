import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import io from "socket.io-client";

const server_erl = import.meta.env.VITE_WS_URL;

const CodeBlock = () => {
  const { name: roomName } = useParams();
  const [lastPong, setLastPong] = useState(null);
  const [editorSocket, setEditorSocket] = useState();
  const [roomData, setRoomData] = useState(null);

  const getDataFromServer = () => {
    socket.emit("send-room-name", roomName);
  };
  const socket = io(server_erl);
  useEffect(() => {
    setEditorSocket(socket);
    socket.on("connect", (data) => {
      getDataFromServer();
    });

    socket.on("receive-codeBlock", (data) => {
      console.log(data);
      setRoomData({...data})
      console.log(roomData);
    });

    socket.on("disconnect", () => {
    });
  },[roomName]);

  return (
    <>
    {roomData ?  <div className="codeBlock-container">
        <div className="codeBlock-title">
          <h1>CodeBlock</h1>
          <h3>{roomData.blockTitle}</h3>
        </div>
        <div className="editor-container">
          <Editor
            options={{ readOnly: true }}
            theme="vs-dark"
            height="300px"
            width="80%"
            defaultLanguage="javascript"
            defaultValue={roomData.CodeToEdit}
          />
        </div>
      </div>: "loading"}

    </>
  );
};

export default CodeBlock;
