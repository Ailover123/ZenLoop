import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      tasks: [],
      completedTasks: [],
      zenCodeTasks: [],
      zenCodeDocuments: [],
      stats: {
        totalFocusTime: 0,
        totalSessions: 0,
        dailyStreak: 0,
        lastCompletedDate: null,
      },
      settings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        darkMode: false,
        soundEnabled: true,
        notificationsEnabled: true,
      },
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, { ...task, id: Date.now() }] })),
      completeTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          return {
            tasks: state.tasks.filter((t) => t.id !== taskId),
            completedTasks: [...state.completedTasks, { ...task, completedAt: new Date() }],
          };
        }),
      updateStats: (focusTime) =>
        set((state) => {
          const today = new Date().toDateString();
          const lastDate = state.stats.lastCompletedDate;
          const isConsecutiveDay = lastDate && new Date(lastDate).toDateString() === new Date(Date.now() - 86400000).toDateString();

          return {
            stats: {
              ...state.stats,
              totalFocusTime: state.stats.totalFocusTime + focusTime,
              totalSessions: state.stats.totalSessions + 1,
              dailyStreak: isConsecutiveDay ? state.stats.dailyStreak + 1 : 1,
              lastCompletedDate: today,
            },
          };
        }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      // ZenCode Room functions
      getTasksForRoom: (roomId) =>
        set((state) => {
          return state.zenCodeTasks.filter(task => task.roomId === roomId);
        }),
      getDocumentsForRoom: (roomId) =>
        set((state) => {
          return state.zenCodeDocuments.filter(doc => doc.roomId === roomId);
        }),
      saveZenCodeDocument: (document, roomId) =>
        set((state) => ({
          zenCodeDocuments: [...state.zenCodeDocuments, { ...document, roomId, id: Date.now() }]
        })),
      deleteZenCodeDocument: (docId) =>
        set((state) => ({
          zenCodeDocuments: state.zenCodeDocuments.filter(doc => doc.id !== docId)
        })),
      addZenCodeTask: (task, roomId) =>
        set((state) => ({
          zenCodeTasks: [...state.zenCodeTasks, { ...task, roomId, id: Date.now() }]
        })),
      completeZenCodeTask: (taskId) =>
        set((state) => ({
          zenCodeTasks: state.zenCodeTasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        })),
    }),
    {
      name: 'zenloop-storage',
    }
  )
);

export default useStore;
