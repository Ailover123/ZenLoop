import React from 'react';
import { Clock, FileText, MessageCircle, Settings, Home } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'docs', label: 'Docs', icon: FileText },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-full sticky top-0">
      {/* Glassmorphism Sidebar */}
      <div className="h-full backdrop-blur-xl bg-white/5 border-r border-white/10 p-6">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Focus</h1>
            <p className="text-white/60 text-sm">Productivity Suite</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/30 text-white shadow-lg shadow-purple-500/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                  }
                `}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">User</p>
                <p className="text-white/60 text-xs">Free Plan</p>
              </div>
            </div>

            <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;