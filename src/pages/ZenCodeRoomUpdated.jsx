import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, FileDown, GitBranch, Copy, Share2, Settings, ArrowLeft } from 'lucide-react';
import { SchedulePlanner } from '../components/SchedulePlanner';
import { OptimizedTaskComponent } from '../components/UnifiedPomodoroTimer';
import { UnifiedDocumentManager } from '../components/UnifiedDocumentManager';
import { exportToPDF } from '../utils/pdfExporter';
import useStore from '../store/useStore';

export function ZenCodeRoomUpdated() {
  const { zenCode } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error

  const {
    getTasksForRoom,
    getDocumentsForRoom,
    zenCodeTasks,
    zenCodeDocuments,
    saveZenCodeDocument,
    deleteZenCodeDocument,
  } = useStore();

  // Simulate Supabase data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace with actual Supabase fetch for tasks, schedule, documents by zenCode (room id)
      setSchedule([
        { id: 1, event: 'Team Meeting', start: '10:00', end: '11:00' },
        { id: 2, event: 'Lunch Break', start: '12:00', end: '13:00' },
        { id: 3, event: 'Code Review', start: '14:30', end: '15:30' },
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, [zenCode]);

  const handleSave = async () => {
    setSaveStatus('saving');

    // TODO: Implement save to Supabase logic here

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate branching logic (generate new ZenCode)
    const newZenCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSaveStatus('saved');

    // Show success notification
    alert(`✨ New branch created successfully!\nZenCode: ${newZenCode}`);
  };

  const handleExportPDF = () => {
    const roomTasks = getTasksForRoom(zenCode);
    const roomDocuments = getDocumentsForRoom(zenCode);
    exportToPDF({ tasks: roomTasks, schedule, documents: roomDocuments, zenCode });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-fuchsia-500 opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-cyan-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating particles for enhanced ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-indigo-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-fuchsia-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.2s' }}></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '3.8s' }}></div>
      </div>

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

      {/* Main container */}
      <div className="relative z-10 p-6 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
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

          {/* Main Content Grid - Fixed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Tasks Section - Left Column */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-white">Tasks ({zenCodeTasks.filter(t => t.roomId === zenCode).length})</h2>
                  </div>
                  <div className="text-sm text-white/60">
                    {zenCodeTasks.filter(t => t.roomId === zenCode && t.completed).length} completed
                  </div>
                </div>

                {/* Timer with Tasks */}
                <OptimizedTaskComponent mode="zen-code" roomId={zenCode} />
              </div>
            </div>

            {/* Schedule Section - Center Column */}
            <div className="lg:col-span-5">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">📅</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Daily Schedule</h2>
                        <p className="text-white/70 text-sm">Plan your day effectively</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20 text-sm">
                      Add Event
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {schedule.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">📋</div>
                        <p className="text-white/60">Today's Schedule (3 events)</p>
                        <p className="text-white/40 text-sm mt-1">Add your first event to get started</p>
                      </div>
                    ) : (
                      schedule.map((event, index) => (
                        <div
                          key={event.id || index}
                          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-lg text-sm font-medium border border-purple-400/30">
                                  {event.start} - {event.end}
                                </span>
                                {index === 1 && (
                                  <span className="px-2 py-1 bg-green-400/20 text-green-300 text-xs font-medium rounded border border-green-400/30">
                                    ● LIVE
                                  </span>
                                )}
                              </div>
                              <h5 className="text-white font-semibold">{event.event}</h5>
                              <p className="text-white/60 text-sm mt-1">Duration: 1h 0m</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section - Right Column */}
            <div className="lg:col-span-4">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-white">Documents & Notes</h2>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20 text-sm">
                    New Document
                  </button>
                </div>

                {/* Document Manager */}
                <div className="space-y-4">
                  {zenCodeDocuments.filter(d => d.roomId === zenCode).length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white/50 text-2xl">📄</span>
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">No documents yet</h4>
                      <p className="text-white/60 text-sm">Create your first document to get started with your project documentation.</p>
                    </div>
                  ) : (
                    <UnifiedDocumentManager
                      documents={zenCodeDocuments.filter(d => d.roomId === zenCode)}
                      onSave={(doc) => saveZenCodeDocument(doc, zenCode)}
                      onDelete={deleteZenCodeDocument}
                      mode="zen-code"
                    />
                  )}
                </div>
              </div>
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

export default ZenCodeRoomUpdated;