export interface Task {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    status: 'ongoing' | 'success' | 'failure';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TaskInput {
    title: string;
    description?: string;
    deadline: string;
    status?: 'ongoing' | 'success' | 'failure';
  }
  
  export interface TaskCounts {
    ongoing: number;
    success: number;
    failure: number;
  }
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'An error occurred');
      }
  
      const data = await response.json();
      return data.data as T;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  
  export const TaskApi = {
    getAll: () => fetchApi<Task[]>('/tasks'),
  
    getByStatus: (status: 'ongoing' | 'success' | 'failure') => 
      fetchApi<Task[]>(`/tasks/status/${status}`),
  
    getById: (id: string) => fetchApi<Task>(`/tasks/${id}`),
  
    create: (task: TaskInput) => 
      fetchApi<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
      }),
  
    update: (id: string, task: Partial<TaskInput>) => 
      fetchApi<Task>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task)
      }),
  
    delete: (id: string) => 
      fetchApi<object>(`/tasks/${id}`, {
        method: 'DELETE'
      }),
  
    getCounts: () => fetchApi<TaskCounts>('/tasks/counts/all')
  };