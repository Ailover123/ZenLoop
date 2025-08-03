import React, { useState } from "react";
import "./AIChat.css";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm ZenLoop AI. Ask me anything." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response (replace this with real Gemini API later)
    setTimeout(() => {
      const botReply = { from: "bot", text: "I'm still learning. Try again soon!" };
      setMessages((prev) => [...prev, botReply]);
    }, 800);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h2>ZenLoop AI Assistant 🤖</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AIChat;
