import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, FileDown, GitBranch, Copy, Share2, Settings, ArrowLeft } from 'lucide-react';
import { SchedulePlanner } from '../components/SchedulePlanner';
import { exportToPDF } from '../utils/pdfExporter';

export function ZenCodeRoom() {
  const { zenCode } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [docs, setDocs] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error

  // Simulate Supabase data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace with actual Supabase fetch
      setTasks([
        { id: 1, text: 'Study React Components', completed: false },
        { id: 2, text: 'Write blog post about productivity', completed: true },
        { id: 3, text: 'Review pull requests', completed: false },
      ]);
      setSchedule([
        { id: 1, event: 'Team Meeting', start: '10:00', end: '11:00' },
        { id: 2, event: 'Lunch Break', start: '12:00', end: '13:00' },
        { id: 3, event: 'Code Review', start: '14:30', end: '15:30' },
      ]);
      setDocs('This is a comprehensive document for Q&A about the current project. It includes important notes, decisions made, and future roadmap items.');
      setIsLoading(false);
    };

    fetchData();
  }, [zenCode]);

  const handleSave = async () => {
    setSaveStatus('saving');

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate branching logic (generate new ZenCode)
    const newZenCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSaveStatus('saved');

    // Show success notification
    alert(`✨ New branch created successfully!\nZenCode: ${newZenCode}`);
  };

  const handleExportPDF = () => {
    exportToPDF({ tasks, schedule, docs, zenCode });
  };

  const copyZenCode = () => {
    navigator.clipboard.writeText(zenCode);
    alert('ZenCode copied to clipboard!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-white text-xl font-semibold mb-2">Loading ZenCode Room</h3>
          <p className="text-white/70">Fetching your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg backdrop-blur-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">ZenCode Room</h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <code className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-400/30 font-mono text-lg">
                      {zenCode}
                    </code>
                    <button
                      onClick={copyZenCode}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      title="Copy ZenCode"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      title="Share Room"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-green-400' : saveStatus === 'saving' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <span className="text-white/70 capitalize">{saveStatus}</span>
                </div>

                <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Tasks Section */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full mr-3"></div>
                  Tasks ({tasks.length})
                </h2>
                <div className="text-sm text-white/60">
                  {tasks.filter(t => t.completed).length} completed
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`
                      p-4 rounded-xl border transition-all duration-200
                      ${task.completed
                        ? 'bg-green-400/10 border-green-400/30 text-green-300'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/30'
                        }
                      `}>
                        {task.completed && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={task.completed ? 'line-through opacity-60' : ''}>
                        {task.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Section */}
            <div className="lg:col-span-2">
              <SchedulePlanner mode="zen-code" schedule={schedule} />
            </div>
          </div>

          {/* Documents Section */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full mr-3"></div>
              Documents & Notes
            </h2>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <textarea
                value={docs}
                onChange={(e) => setDocs(e.target.value)}
                placeholder="Add your notes, documentation, and important information here..."
                className="w-full h-32 bg-transparent text-white placeholder-white/50 resize-none focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Save className="w-5 h-5" />
              <span>
                {saveStatus === 'saving' ? 'Saving Changes...' : 'Save Changes (New Branch)'}
              </span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <FileDown className="w-5 h-5" />
              <span>Export to PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZenCodeRoom;