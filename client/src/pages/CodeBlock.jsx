import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import io from "socket.io-client";
import smileImg from "../assets/smile-png-46519.png";

const server_erl = import.meta.env.VITE_WS_URL;
const CodeBlock = () => {
  const { name: roomName } = useParams();
  const [editorValue, setEditorValue] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [showSmile, setShowSmile] = useState(false);
  const [socketEdit, setSocketEdit] = useState();
  const [userChanel, setUserChanel] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  useEffect(() => {
    const socket = io(server_erl);
    setSocketEdit(socket);
    socket.on("connect", (data) => {
      socket.emit("send-room-name", roomName);
    });
    console.log("bla bla bla");
    //  receive codeBlock for display data in the page
    socket.on("receive-codeBlock", (data) => {
      console.log("receive-codeBlock");
      if (!data) return;
      if (!roomData) {
        setRoomData({
          roomName: data.rome,
          blockTitle: data.blockTitle,
          CodeToEdit: data.CodeToEdit,
          codeSolution: data.codeSolution,
        });
        if (userChanel) return;
        setUserChanel({
          user: data.user,
          userCount: data.userCount,
          isMentor: data.isMentor,
        });
      }
    });
    //  liston to solve event from the student
    socket.on("solve-exercise", (arg) => {
      console.log("Solve-exercise");
      setShowSmile(true);
    });

    // Get code changes live
    socket.on("receive-changes", (code) => {
      console.log("receive-changes");
      if (!code) return;
      if (userChanel?.userCount === 1) {
        setEditorValue(code);
      }
    });
    // server got error
    socket.on("connect_error", () => {
      console.log("receive-changes");
      setTimeout(() => socket.connect(), 5000);
    });
    // server disconnect
    socket.on("disconnect", () => console.log("server disconnected"));
    return () => {
      socket.disconnect();
    };
  }, [userChanel]);

  // check codeblock script with eval global method and return massage
  const checkCodeblock = () => {
    setWrongAnswer(true);
    const checkEval = eval(editorValue);
    const checkAnswer = checkEval?.toString(checkEval);
    if (checkAnswer == roomData.codeSolution) {
      setShowSmile(true);
      socketEdit.emit("correct-answer", roomName);
    }
    setTimeout(() => {
      setWrongAnswer(false);
    }, 3000);
  };
  // handle edit changes and sent the event send-changes to the server
  const handleEditorChange = (editorValue) => {
    setEditorValue(editorValue);
    socketEdit.emit("send-changes", { roomName, code: editorValue });
  };
  return (
    <>
      {/* if statement on the rome data state, that show the rome detail of loading string */}
      {roomData ? (
        <>
          <div className="codeBlock-container">
            <div className="codeBlock-title">
              <h1>CodeBlock</h1>
            </div>
            {/* if statement on the rome showSmile state, that show if the student right a emoji smile  or the editor */}
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
                {wrongAnswer ? (
                  <h4 className="Wrong-Answer-title">
                    Wrong Answer, check again the code
                  </h4>
                ) : null}
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
