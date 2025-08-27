import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import TimerControls from './components/TimerControls';
import TaskList from './components/TaskList';
import Docs from './pages/Docs';
import ChatBot from './components/ChatBot';
import useStore from './store/useStore';
import './App.css';
import './styles/Navigation.css';
import './styles/TimerControls.css';

function App() {
  const [currentView, setCurrentView] = useState('timer');
  const [documents] = useState([]);
  const { settings } = useStore();

  useEffect(() => {
    // Apply theme based on settings
    document.documentElement.setAttribute(
      'data-theme',
      settings.darkMode ? 'dark' : 'light'
    );
  }, [settings.darkMode]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'timer':
        return (
          <div className="timer-layout">
            <TimerControls />
            <TaskList />
          </div>
        );
      case 'docs':
        return <Docs />;
      case 'chat':
        return <ChatBot documents={documents} />;
      default:
        return <TimerControls />;
    }
  };

  return (
    <div className="app">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-content">
        {renderCurrentView()}
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: settings.darkMode ? '#2D2D2D' : '#FFFFFF',
            color: settings.darkMode ? '#F7F7F7' : '#2D3436',
          },
        }}
      />
    </div>
  );
}

export default App
