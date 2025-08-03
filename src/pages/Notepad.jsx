import React, { useEffect, useState } from "react";
import "./Notepad.css";

const Notepad = () => {
  const [note, setNote] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("zenloop-note");
    if (saved) setNote(saved);
  }, []);

  // Auto-save on every change
  useEffect(() => {
    localStorage.setItem("zenloop-note", note);
  }, [note]);

  return (
    <div className="notepad-container">
      <h2>Quick Notepad 🗒️</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Start typing your notes here..."
      />
    </div>
  );
};

export default Notepad;
