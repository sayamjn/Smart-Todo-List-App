import React from 'react';
import { Task } from '@/utils/api';
import { formatDate } from '@/utils/dateUtils';
import Countdown from '../ui/Countdown';



interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onDelete,
  onRefresh
}) => {


  // Define status badge style
  const getStatusBadgeStyle = () => {
    switch (task.status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
      style={{
        borderLeftColor: 
          task.status === 'ongoing' ? '#3b82f6' :
          task.status === 'success' ? '#10b981' :
          '#ef4444'
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeStyle()}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-3 flex flex-col">
        <div className="text-xs text-gray-500">Deadline: {formatDate(task.deadline)}</div>
        {task.status === 'ongoing' && (
          <div className="mt-1">
            <Countdown
              deadline={task.deadline}
              onExpire={onRefresh}
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        {task.status === 'ongoing' && (
          <button
            onClick={() => onComplete(task._id)}
            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;