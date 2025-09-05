import React, { useState } from 'react';
import Navigation from './Navigation';
import { UnifiedPomodoroTimer } from './UnifiedPomodoroTimer';
import { UnifiedDocumentManager } from './UnifiedDocumentManager';
import ChatBot from './ChatBot';
import useStore from '../store/useStore';

export default function MainLayoutClean() {
  const [currentView, setCurrentView] = useState('timer');
  const {
    zenCodeDocuments,
    saveZenCodeDocument,
    deleteZenCodeDocument,
  } = useStore();

  // Auto-reset tasks at midnight for Focus mode
  React.useEffect(() => {
    const resetAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeUntilMidnight = midnight - now;
      setTimeout(() => {
        // Reset focus data at midnight
        useStore.getState().clearFocusData();
      }, timeUntilMidnight);
    };
    resetAtMidnight();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex h-screen">
        {/* Navigation Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Glass container for main content */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="border-b border-white/10 pb-6 mb-8">
                <h1 className="text-3xl font-bold text-white capitalize">
                  {currentView === 'timer' ? 'Pomodoro Timer' :
                    currentView === 'docs' ? 'Documentation' :
                      currentView === 'chat' ? 'AI Assistant' : currentView}
                </h1>
                <p className="text-white/70 mt-2">
                  {currentView === 'timer' ? 'Focus and productivity with the Pomodoro technique' :
                    currentView === 'docs' ? 'Browse and manage your documents' :
                      currentView === 'chat' ? 'Get help from your AI assistant' : ''}
                </p>
              </div>

              {/* Content Area */}
              <div className="space-y-8">
                {currentView === 'timer' && (
                  <UnifiedPomodoroTimer mode="focus" />
                )}
                {currentView === 'docs' && (
                  <UnifiedDocumentManager
                    documents={zenCodeDocuments}
                    onSave={(doc) => saveZenCodeDocument(doc, 'focus-docs')}
                    onDelete={deleteZenCodeDocument}
                    mode="focus"
                  />
                )}
                {currentView === 'chat' && <ChatBot documents={zenCodeDocuments} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
