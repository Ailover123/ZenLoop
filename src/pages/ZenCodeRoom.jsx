import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Title, Paper, Stack, Button, Text } from '@mantine/core';
import { SchedulePlanner } from '../components/SchedulePlanner';
import { exportToPDF } from '../utils/pdfExporter';

export function ZenCodeRoom() {
  const { zenCode } = useParams(); // Now works
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [docs, setDocs] = useState('');

  // Simulate Supabase data fetching
  useEffect(() => {
    // Replace with actual Supabase fetch
    setTasks([
      { id: 1, text: 'Study React', completed: false },
      { id: 2, text: 'Write blog post', completed: false },
    ]);
    setSchedule([
      { event: 'Meeting', start: '10:00', end: '11:00' },
      { event: 'Lunch', start: '12:00', end: '13:00' },
    ]);
    setDocs('This is a sample document for Q&A.');
  }, [zenCode]);

  const handleSave = () => {
    // Simulate branching logic (generate new ZenCode)
    const newZenCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`New branch created with ZenCode: ${newZenCode}`);
  };

  return (
    <Box p="xl">
      <Title order={2} mb="xl">
        ZenCode Room: {zenCode}
      </Title>

      <Paper shadow="md" p="lg" mb="xl">
        <Title order={3} mb="md">Tasks</Title>
        <Stack>
          {tasks.map((task) => (
            <Text key={task.id}>{task.text}</Text>
          ))}
        </Stack>
      </Paper>

      <SchedulePlanner mode="zen-code" schedule={schedule} />

      <Paper shadow="md" p="lg" mb="xl">
        <Title order={3} mb="md">Documents</Title>
        <Text>{docs}</Text>
      </Paper>

      <Button onClick={handleSave} fullWidth mb="md">
        Save Changes (New Branch)
      </Button>

      <Button
        onClick={() => exportToPDF({ tasks, schedule, docs })}
        fullWidth
      >
        Export to PDF
      </Button>
    </Box>
  );
}
export default ZenCodeRoom;