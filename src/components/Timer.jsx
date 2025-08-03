import React from "react";
import { useTimer } from "../context/TimerContext";

const Timer = () => {
  const { secondsLeft, mode } = useTimer();

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '4rem',
      color: mode === "work" ? "#28a745" : "#17a2b8"
    }}>
      <div>{mode.toUpperCase()} TIME</div>
      <div>{minutes}:{seconds}</div>
    </div>
  );
};

export default Timer;
