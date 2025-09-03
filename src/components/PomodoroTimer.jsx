import { useState, useEffect } from 'react';
import { Box, Text, Button } from '@mantine/core';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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

  return (
    <Box p="lg" sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
      <Text size="xl" align="center" mb="md">
        {formatTime(timeLeft)}
      </Text>
      <Button
        onClick={() => setIsRunning(!isRunning)}
        fullWidth
        color={isRunning ? 'red' : 'green'}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Text align="center" mt="sm">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </Text>
    </Box>
  );
}