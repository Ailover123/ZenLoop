import React, { createContext, useContext, useState } from 'react';

// Theme context for global state management
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within AppProviders');
  }
  return context;
};

// Notification context for toast messages
const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within AppProviders');
  }
  return context;
};

export function AppProviders({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = ({ title, message, type = 'info' }) => {
    const id = Date.now();
    const notification = { id, title, message, type };
    setNotifications(prev => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const themeValue = {
    colors: {
      primary: '#9333ea',
      secondary: '#a855f7',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  };

  const notificationValue = {
    notifications,
    showNotification,
    removeNotification
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <NotificationContext.Provider value={notificationValue}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {children}

          {/* Notification Toast Container */}
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl
                  transform transition-all duration-300 ease-out animate-in slide-in-from-right-2
                  ${notification.type === 'success' ? 'border-green-400/30 bg-green-400/10' : ''}
                  ${notification.type === 'error' ? 'border-red-400/30 bg-red-400/10' : ''}
                  ${notification.type === 'warning' ? 'border-yellow-400/30 bg-yellow-400/10' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{notification.title}</h4>
                    <p className="text-white/80 text-xs mt-1">{notification.message}</p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-white/60 hover:text-white/90 transition-colors ml-3"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </NotificationContext.Provider>
    </ThemeContext.Provider>
  );
}