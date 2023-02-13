import React, { useState } from "react";
import { Link } from "react-router-dom";

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
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
                <div className="room-btn">
                  <button className="btn">continue</button>
                </div>
              </Link>
            </li>
            <li className="code-box-link">
              <h2>Arrays</h2>
              <h4>Return the First Element in an Array</h4>
              <Link to={"room/Arrays"}>
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
