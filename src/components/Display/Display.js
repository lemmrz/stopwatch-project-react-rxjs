import React from "react";
import "./Display.css";

const Display = (props) => {
  const { time } = props;

  return (
    <div className="timer-wrapper">
      <span>{("0" + Math.floor((time / 3600) % 60)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{("0" + (time % 60)).slice(-2)}</span>
    </div>
  );
};

export default Display;
