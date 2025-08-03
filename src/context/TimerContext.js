import React, { createContext, useState, useContext, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes
  const [mode, setMode] = useState("work"); // "work" or "break"

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            const nextMode = mode === "work" ? "break" : "work";
            setMode(nextMode);
            return nextMode === "work" ? 1500 : 300; // switch to 25 or 5 min
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setSecondsLeft(1500);
  };

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        secondsLeft,
        mode,
        setIsRunning,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
