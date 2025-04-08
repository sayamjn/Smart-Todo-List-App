import React, { useState } from 'react';
import { TaskInput } from '@/utils/api';
import { getDefaultDeadline } from '@/utils/dateUtils';

interface TaskFormProps {
  onSubmit: (task: TaskInput) => Promise<boolean>;
}


const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(getDefaultDeadline());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!deadline) {
      setError('Deadline is required');
      return;
    }
    
    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      setError('Deadline must be in the future');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await onSubmit({
        title,
        description,
        deadline: deadlineDate.toISOString()
      });
      
      if (success) {
        // Reset form
        setTitle('');
        setDescription('');
        setDeadline(getDefaultDeadline());
      }
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            maxLength={100}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description (optional)"
            rows={3}
            maxLength={500}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline *
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;