import React, { useState } from 'react';
import Navigation from './Navigation';
import { PomodoroTimer } from './PomodoroTimer';
import Docs from '../pages/Docs';
import ChatBot from './ChatBot';
import { Box } from '@mantine/core';

export default function MainLayout() {
  const [currentView, setCurrentView] = useState('timer');
  const [tasks, setTasks] = React.useState(() => {
    const saved = localStorage.getItem('focusTasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Task management functions
  const addTask = (newTask) => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      setTasks(updatedTasks);
      localStorage.setItem('focusTasks', JSON.stringify(updatedTasks));
    }
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem('focusTasks', JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem('focusTasks', JSON.stringify(updated));
  };

  // Auto-reset tasks at midnight
  React.useEffect(() => {
    const resetAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeUntilMidnight = midnight - now;
      setTimeout(() => {
        localStorage.removeItem('focusTasks');
        setTasks([]);
      }, timeUntilMidnight);
    };
    resetAtMidnight();
  }, []);

  return (
    <Box className="app">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {currentView === 'timer' && (
          <PomodoroTimer
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        )}
        {currentView === 'docs' && <Docs />}
        {currentView === 'chat' && <ChatBot documents={[]} />}
      </main>
    </Box>
  );
}
