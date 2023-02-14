import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import io from "socket.io-client";
import smileImg from "../../public/assets/smile-png-46519.png";
const server_erl = import.meta.env.VITE_WS_URL;
const CodeBlock = () => {
  const { name: roomName } = useParams();
  const [editorValue, setEditorValue] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [showSmile, setShowSmile] = useState(false);
  const [socketEdit, setSocketEdit] = useState();
  const [userChanel, setUserChanel] = useState(null);

  useEffect(() => {
    const socket = io(server_erl);
    setSocketEdit(socket);
    socket.on("connect", (data) => {
      socket.emit("send-room-name", roomName);
    });

    socket.on("receive-codeBlock", (data) => {
      if (!data) return;
      if (!roomData) {
        setRoomData({
          roomName: data.rome,
          blockTitle: data.blockTitle,
          CodeToEdit: data.CodeToEdit,
          codeSolution: data.codeSolution,
        });
        if (!userChanel)
          setUserChanel({
            user: data.user,
            userCount: data.userCount,
            isMentor: data.isMentor,
          });
      }
    });

    socket.on("Solve-exercise", (arg) => {
      setShowSmile(true);
    });
    // Get code changes
    socket.on("receive-changes", (code) => {
      if (!code) return;
      if (userChanel?.userCount === 1) {
        setEditorValue(code);
      }
    });

    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => console.log("server disconnected"));
    return () => {
      socket.disconnect();
    };
  }, [userChanel]);

  const checkCodeblock = () => {
    console.log(editorValue);
    const checkEval = eval(editorValue);
    console.log(checkEval);
    console.log(roomData);
    if (checkEval == roomData.codeSolution) {
      setShowSmile(true);
      socketEdit.emit("correct-answer", roomName);
    }
  };

  const handleEditorChange = (editorValue) => {
    setEditorValue(editorValue);
    socketEdit.emit("send-changes", { roomName, code: editorValue });
  };
  return (
    <>
      {roomData ? (
        <>
          <div className="codeBlock-container">
            <div className="codeBlock-title">
              <h1>CodeBlock</h1>
            </div>
            {showSmile ? (
              <div className="correct-answer">
                <img src={smileImg} width="300" alt="smile picture" />
                <h2>Correct answer, good job</h2>
                <Link to={"/"}>
                  <button className="btn correct-btn">
                    <h4>Check out more exercises</h4>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="editor">
                <h3>{roomData.blockTitle}</h3>
                {userChanel?.isMentor ? (
                  <h4>mentor user: read only</h4>
                ) : (
                  <h4>student user: edit code </h4>
                )}
                <div className="editor-container">
                  <Editor
                    options={{ readOnly: userChanel?.isMentor }}
                    theme="vs-dark"
                    height="300px"
                    width="80%"
                    onChange={handleEditorChange}
                    value={editorValue ? editorValue : roomData.CodeToEdit}
                    defaultLanguage="javascript"
                    defaultValue={roomData.CodeToEdit}
                  />
                </div>
                <div className="check-code-btn">
                  <button
                    onClick={checkCodeblock}
                    disabled={userChanel?.isMentor}
                    className={`btn ${
                      userChanel?.isMentor ? "mentor-btn" : ""
                    }`}
                  >
                    check code
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
};

export default CodeBlock;
