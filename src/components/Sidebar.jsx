import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // We’ll create this next

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Timer" },
    { path: "/todo", label: "To-Do" },
    { path: "/notepad", label: "Notepad" },
    { path: "/ai", label: "AI Chat" },
    { path: "/docs", label: "Docs" }
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">ZenLoop</h2>
      <nav>
        {links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={location.pathname === path ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
