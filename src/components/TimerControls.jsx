import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import Confetti from 'react-confetti';
import '../styles/TimerControls.css';

const TimerControls = () => {
  const { settings, updateStats } = useStore();
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [sessions, setSessions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      if (mode === 'work') {
        const sessionCompleted = sessions + 1;
        setSessions(sessionCompleted);
        updateStats(settings.workDuration * 60);
        setShowConfetti(true);
        
        if (settings.soundEnabled) {
          new Audio('/sounds/complete.mp3').play().catch(() => {});
        }
        
        toast.success(
          `Great job! You've completed ${sessionCompleted} ${sessionCompleted === 1 ? 'session' : 'sessions'}!`,
          { duration: 4000 }
        );

        setTimeout(() => setShowConfetti(false), 3000);

        if (sessionCompleted % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(settings.longBreakDuration * 60);
        } else {
          setMode('break');
          setTimeLeft(settings.shortBreakDuration * 60);
        }
      } else {
        setMode('work');
        setTimeLeft(settings.workDuration * 60);
      }
      
      if (!settings.autoStartBreaks && mode === 'work') {
        setIsActive(false);
      } else if (!settings.autoStartPomodoros && mode !== 'work') {
        setIsActive(false);
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sessions, settings, updateStats]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : mode === 'break' ? 5 * 60 : 15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="timer-card">
        <div className="timer-header">
          <h2 className="timer-title">
            {mode === 'work' ? '🎯 Focus Time' : mode === 'break' ? '☕ Short Break' : '🌟 Long Break'}
          </h2>
          <div className="session-info">
            <span className="session-count">Session {sessions + 1}</span>
            <div className="session-progress">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`progress-dot ${i < (sessions % 4) ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>

        <div className="timer-controls">
          <button
            className={`control-btn ${!isActive ? 'start' : 'pause'}`}
            onClick={!isActive ? startTimer : pauseTimer}
          >
            {!isActive ? <FaPlay /> : <FaPause />}
          </button>
          
          <button
            className="control-btn reset"
            onClick={resetTimer}
          >
            <FaRedo />
          </button>
        </div>

        <div className="mode-selector">
          {['work', 'break', 'longBreak'].map((modeType) => (
            <button
              key={modeType}
              className={`mode-btn ${mode === modeType ? 'active' : ''}`}
              onClick={() => setMode(modeType)}
            >
              {modeType === 'work' ? '🎯 Work' : 
               modeType === 'break' ? '☕ Break' : '🌟 Long Break'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerControls;
