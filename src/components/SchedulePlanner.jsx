import React, { useState } from 'react';
import { Plus, Clock, Calendar, Edit2, Trash2 } from 'lucide-react';

export function SchedulePlanner({ schedule = [] }) {
  const [events, setEvents] = useState(schedule);
  const [newEvent, setNewEvent] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addEvent = () => {
    if (newEvent && start && end) {
      const newEventObj = {
        id: Date.now(),
        event: newEvent,
        start,
        end,
        created: new Date().toISOString()
      };
      setEvents([...events, newEventObj]);
      setNewEvent('');
      setStart('');
      setEnd('');
      setShowAddForm(false);
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const sortedEvents = events.sort((a, b) => {
    const timeA = a.start.replace(':', '');
    const timeB = b.start.replace(':', '');
    return timeA - timeB;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Daily Schedule</h3>
            <p className="text-white/70">Plan your day effectively</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Event</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-white/80 text-sm font-medium mb-2">Event</label>
              <input
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                placeholder="Meeting, workout, etc."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={addEvent}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white/50" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">No events scheduled</h4>
            <p className="text-white/60">Add your first event to get started with planning your day.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-400" />
              Today's Schedule ({sortedEvents.length} events)
            </h4>

            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {sortedEvents.map((event, index) => {
                const isCurrentTime = () => {
                  const now = new Date();
                  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                  return currentTime >= event.start && currentTime <= event.end;
                };

                return (
                  <div
                    key={event.id || index}
                    className={`
                      relative p-4 rounded-xl border transition-all duration-200 group
                      ${isCurrentTime()
                        ? 'bg-purple-500/20 border-purple-400/40 shadow-lg shadow-purple-500/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    {isCurrentTime() && (
                      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`
                            px-3 py-1 rounded-lg text-sm font-medium
                            ${isCurrentTime()
                              ? 'bg-purple-400/30 text-purple-200 border border-purple-400/50'
                              : 'bg-white/10 text-white/80 border border-white/20'
                            }
                          `}>
                            {event.start} - {event.end}
                          </div>

                          {isCurrentTime() && (
                            <span className="px-2 py-1 bg-green-400/20 text-green-300 text-xs font-medium rounded border border-green-400/30">
                              ● LIVE
                            </span>
                          )}
                        </div>

                        <h5 className="text-white font-semibold text-lg">{event.event}</h5>

                        {/* Duration calculation */}
                        <p className="text-white/60 text-sm mt-1">
                          Duration: {(() => {
                            const startTime = new Date(`2000-01-01 ${event.start}`);
                            const endTime = new Date(`2000-01-01 ${event.end}`);
                            const diffMs = endTime - startTime;
                            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
                          })()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-all duration-200"
                          title="Edit event"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeEvent(event.id || index)}
                          className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                          title="Delete event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}