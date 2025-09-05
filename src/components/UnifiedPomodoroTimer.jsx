import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Check, Trash2, Clock } from 'lucide-react';

export function OptimizedTaskComponent({ tasks = [], addTask, toggleTask, deleteTask, mode = 'default', roomId = null }) { // eslint-disable-line no-unused-vars
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
    return mins;
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

  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="h-full flex flex-col">
      {/* Timer Section - Compact */}
      <div className="mb-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          {/* Focus Status */}
          <div className="mb-4">
            <div className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isBreak
                ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                : 'bg-orange-400/20 text-orange-300 border border-orange-400/30'
              }
            `}>
              <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
              {isBreak ? 'Break Time' : 'Focus Time'}
            </div>
          </div>

          {/* Large Timer Display */}
          <div className="text-6xl font-bold text-white mb-4 font-mono">
            {formatTime(timeLeft)}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`
                p-3 rounded-xl transition-all duration-200 transform hover:scale-105
                ${isRunning
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20'
                }
              `}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Today's Tasks</h3>

          {/* Add Task Input */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
            />
            <button
              onClick={handleAddTask}
              className="px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="flex-1">
          {totalTasks === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center h-40 flex flex-col justify-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-white/60 text-sm">No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-full">
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200
                      ${task.completed
                        ? 'bg-green-400/10 border-green-400/30 text-green-300'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <button
                      onClick={() => toggleTask && toggleTask(task.id)}
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0
                        ${task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-white/30 hover:border-purple-400'
                        }
                      `}
                    >
                      {task.completed && <Check className="w-3 h-3" />}
                    </button>

                    <span className={`flex-1 text-sm ${task.completed ? 'line-through opacity-60' : ''}`}>
                      {task.text}
                    </span>

                    <button
                      onClick={() => deleteTask && deleteTask(task.id)}
                      className="text-white/40 hover:text-red-400 p-1 rounded transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Footer */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{completedCount}</div>
          <div className="text-white/60 text-xs">Completed Today</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">0h</div>
          <div className="text-white/60 text-xs">Focus Time</div>
        </div>
      </div>
    </div>
  );
}
export default OptimizedTaskComponent;