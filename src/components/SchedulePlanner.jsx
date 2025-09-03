import { useState } from 'react';
import { Box, Paper, Text, Button, TextInput, Stack } from '@mantine/core';

export function SchedulePlanner({ schedule = [] }) {
  const [events, setEvents] = useState(schedule);
  const [newEvent, setNewEvent] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const addEvent = () => {
    if (newEvent && start && end) {
      const newEventObj = { event: newEvent, start, end };
      setEvents([...events, newEventObj]);
      setNewEvent('');
      setStart('');
      setEnd('');
    }
  };

  return (
    <Box>
      <Title order={3} mb="md">Daily Schedule</Title>
      <Paper shadow="md" p="lg" mb="md">
        <Stack>
          <TextInput
            label="Event"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add event"
          />
          <TextInput
            label="Start Time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="HH:MM"
          />
          <TextInput
            label="End Time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="HH:MM"
          />
          <Button onClick={addEvent}>Add Event</Button>
        </Stack>
      </Paper>

      <Stack>
        {events.map((event, index) => (
          <Paper key={index} p="sm" withBorder>
            <Text>{event.event}</Text>
            <Text size="sm" color="dimmed">
              {event.start} - {event.end}
            </Text>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}