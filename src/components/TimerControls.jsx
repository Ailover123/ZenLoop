import React from "react";
import { useTimer } from "../context/TimerContext";

const TimerControls = () => {
  const { isRunning, setIsRunning, resetTimer } = useTimer();

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerControls;
