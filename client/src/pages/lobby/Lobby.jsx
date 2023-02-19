import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";


const Lobby = () => {
  return (
    <>
      <div className="lobby">
        <header className="header-container">
          <h1> Hi welcome to code block</h1>
          <h3> Choose the room where you want to practice</h3>
        </header>
        <div className="body-container">
          <ul className="code-block-list">
            <li className="code-box-link">
              <h2>filterLoop</h2>
              <Link to={"room/filterLoop"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>mapLoop</h2>
              <Link to={"room/mapLoop"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>reducerLoop</h2>
              <Link to={"room/reducerLoop"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>sumNumber</h2>
              <Link to={"room/sumNumber"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Lobby;
