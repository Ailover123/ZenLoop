import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Check, Trash2 } from 'lucide-react';

export function PomodoroTimer({ tasks = [], addTask, toggleTask, deleteTask }) {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 1500 : 300); // 25 min focus / 5 min break
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeLeft(isBreak ? 300 : 1500);
    setIsRunning(false);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() && addTask) {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  const progress = isBreak ?
    ((300 - timeLeft) / 300) * 100 :
    ((1500 - timeLeft) / 1500) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Timer Section */}
      <div className="space-y-6">
        {/* Main Timer Display */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl"></div>

          <div className="relative z-10">
            {/* Timer Status */}
            <div className="mb-6">
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${isBreak
                  ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                  : 'bg-purple-400/20 text-purple-300 border border-purple-400/30'
                }
              `}>
                {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
              </span>
            </div>

            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={isBreak ? "#10b981" : "#9333ea"}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-out drop-shadow-lg"
                  style={{
                    filter: `drop-shadow(0 0 10px ${isBreak ? '#10b981' : '#9333ea'}40)`
                  }}
                />
              </svg>

              {/* Timer Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-white font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`
                  flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105
                  ${isRunning
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20'
                  }
                `}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">0</div>
            <div className="text-white/70 text-sm">Completed Today</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">0h</div>
            <div className="text-white/70 text-sm">Focus Time</div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full mr-3"></div>
            Today's Tasks
          </h3>

          {/* Add Task */}
          <div className="flex space-x-3 mb-6">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-white/50">
                <div className="text-4xl mb-2">📝</div>
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`
                    flex items-center space-x-3 p-4 rounded-xl border transition-all duration-200
                    ${task.completed
                      ? 'bg-green-400/10 border-green-400/30 text-green-300'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }
                  `}
                >
                  <button
                    onClick={() => toggleTask && toggleTask(task.id)}
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-white/30 hover:border-purple-400'
                      }
                    `}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </button>

                  <span className={`flex-1 ${task.completed ? 'line-through opacity-60' : ''}`}>
                    {task.text}
                  </span>

                  <button
                    onClick={() => deleteTask && deleteTask(task.id)}
                    className="text-white/40 hover:text-red-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}