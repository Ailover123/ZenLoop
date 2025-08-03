import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Notepad from "./pages/Notepad";
import AiChat from "./pages/AIChat";
import Docs from "./pages/Docs";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "200px", padding: "1rem", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/notepad" element={<Notepad />} />
            <Route path="/ai" element={<AiChat />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
