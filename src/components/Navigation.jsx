import React from 'react';
import { FaClock, FaBook, FaRobot, FaMoon, FaSun } from 'react-icons/fa';
import useStore from '../store/useStore';
import '../styles/Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => {
  const { settings, updateSettings } = useStore();

  const navItems = [
    { id: 'timer', icon: FaClock, label: 'Pomodoro Timer' },
    { id: 'docs', icon: FaBook, label: 'Study Documents' },
    { id: 'chat', icon: FaRobot, label: 'AI Assistant' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <div className="logo">
          🎯
        </div>
        <div className="brand-text">
          <h1>Zenloop</h1>
          <span>Focus • Study • Succeed</span>
        </div>
      </div>
      
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <item.icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="nav-footer">
        <p>Your productive study companion</p>
        <button
          className="theme-toggle"
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          title={settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {settings.darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
