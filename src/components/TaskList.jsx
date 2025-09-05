import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaCheck } from 'react-icons/fa';
import useStore from '../store/useStore';
import '../styles/TaskList.css';

const TaskList = () => {
  const { tasks, addTask, completeTask } = useStore();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({
        title: newTask,
        createdAt: new Date(),
        completed: false,
      });
      setNewTask('');
    }
  };

  return (
    <motion.div
      className="task-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="task-list-title">📝 Tasks</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <motion.button
          type="submit"
          className="add-task-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!newTask.trim()}
        >
          <FaPlus />
        </motion.button>
      </form>

      <div className="tasks-wrapper">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className="task-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
            >
              <span className="task-title">{task.title}</span>
              <div className="task-actions">
                <motion.button
                  className="task-action-btn complete"
                  onClick={() => completeTask(task.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCheck />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No tasks yet! Add one to get started 🚀</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
