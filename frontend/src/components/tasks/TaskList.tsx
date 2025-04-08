import React from 'react';
import { Task } from '@/utils/api';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  status: 'ongoing' | 'success' | 'failure';
  onComplete: (id: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onRefresh: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  status,
  onComplete,
  onDelete,
  onRefresh
}) => {
  // Status-specific styles and messages
  const getStatusConfig = () => {
    switch (status) {
      case 'ongoing':
        return {
          title: 'Ongoing Tasks',
          emptyMessage: 'No ongoing tasks. Add a new task to get started!',
          icon: '⏳',
          color: 'blue'
        };
      case 'success':
        return {
          title: 'Completed Tasks',
          emptyMessage: 'No completed tasks yet. Keep up the good work!',
          icon: '✅',
          color: 'green'
        };
      case 'failure':
        return {
          title: 'Failed Tasks',
          emptyMessage: 'No failed tasks. Great job staying on schedule!',
          icon: '❌',
          color: 'red'
        };
      default:
        return {
          title: 'Tasks',
          emptyMessage: 'No tasks found.',
          icon: '📋',
          color: 'gray'
        };
    }
  };

  const { title, emptyMessage, icon, color } = getStatusConfig();

  return (
    <div className="mb-8">
      <div className={`flex items-center mb-4 text-${color}-600`}>
        <span className="mr-2 text-xl">{icon}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-sm">
          {tasks.length}
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;