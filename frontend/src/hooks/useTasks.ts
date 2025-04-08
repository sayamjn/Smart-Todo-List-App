import { useState, useEffect, useCallback } from 'react';
import { Task, TaskInput, TaskCounts, TaskApi } from '@/utils/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksByStatus, setTasksByStatus] = useState<{
    ongoing: Task[];
    success: Task[];
    failure: Task[];
  }>({
    ongoing: [],
    success: [],
    failure: []
  });
  const [counts, setCounts] = useState<TaskCounts>({
    ongoing: 0,
    success: 0,
    failure: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TaskApi.getAll();
      setTasks(data);
      
      const ongoing = data.filter(task => task.status === 'ongoing');
      const success = data.filter(task => task.status === 'success');
      const failure = data.filter(task => task.status === 'failure');
      
      setTasksByStatus({ ongoing, success, failure });
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCounts = useCallback(async () => {
    try {
      const data = await TaskApi.getCounts();
      setCounts(data);
    } catch (err) {
      console.error('Failed to fetch counts:', err);
    }
  }, []);

  const createTask = async (taskData: TaskInput) => {
    try {
      setLoading(true);
      await TaskApi.create(taskData);
      await fetchTasks();
      await fetchCounts();
      return true;
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, taskData: Partial<TaskInput>) => {
    try {
      setLoading(true);
      await TaskApi.update(id, taskData);
      await fetchTasks();
      await fetchCounts();
      return true;
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await TaskApi.delete(id);
      await fetchTasks();
      await fetchCounts();
      return true;
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const markTaskComplete = async (id: string) => {
    return updateTask(id, { status: 'success' });
  };

  useEffect(() => {
    fetchTasks();
    fetchCounts();
    
    const interval = setInterval(() => {
      fetchTasks();
      fetchCounts();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [fetchTasks, fetchCounts]);

  return {
    tasks,
    tasksByStatus,
    counts,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    refreshTasks: fetchTasks
  };
};