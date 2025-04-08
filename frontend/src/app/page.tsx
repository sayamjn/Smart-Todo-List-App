'use client';

import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import TaskTabs from '@/components/tasks/TaskTabs';

export default function Home() {
  const {
    tasks,
    tasksByStatus,
    counts,
    loading,
    error,
    createTask,
    markTaskComplete,
    deleteTask,
    refreshTasks
  } = useTasks();
  
  const [activeTab, setActiveTab] = useState('all');
  
  // Get tasks to display based on active tab
  const getDisplayTasks = () => {
    switch (activeTab) {
      case 'ongoing':
        return tasksByStatus.ongoing;
      case 'success':
        return tasksByStatus.success;
      case 'failure':
        return tasksByStatus.failure;
      case 'all':
      default:
        return tasks;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Smart Todo List</h1>
          <p className="text-gray-600 mt-2">Manage your tasks with intelligent time-based status tracking</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <TaskForm onSubmit={createTask} />
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Task Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ongoing:</span>
                  <span className="text-blue-600 font-medium">{counts.ongoing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="text-green-600 font-medium">{counts.success}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Failed:</span>
                  <span className="text-red-600 font-medium">{counts.failure}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <span className="text-gray-800 font-medium">
                    {counts.ongoing + counts.success + counts.failure}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <TaskTabs
              activeTab={activeTab}
              counts={counts}
              onChange={setActiveTab}
            />
            
            {loading && tasks.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading tasks...</div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                {error}
              </div>
            ) : (
              <>
                {activeTab === 'all' ? (
                  <>
                    <TaskList
                      tasks={tasksByStatus.ongoing}
                      status="ongoing"
                      onComplete={markTaskComplete}
                      onDelete={deleteTask}
                      onRefresh={refreshTasks}
                    />
                    
                    <TaskList
                      tasks={tasksByStatus.success}
                      status="success"
                      onComplete={markTaskComplete}
                      onDelete={deleteTask}
                      onRefresh={refreshTasks}
                    />
                    
                    <TaskList
                      tasks={tasksByStatus.failure}
                      status="failure"
                      onComplete={markTaskComplete}
                      onDelete={deleteTask}
                      onRefresh={refreshTasks}
                    />
                  </>
                ) : (
                  <TaskList
                    tasks={getDisplayTasks()}
                    status={activeTab as 'ongoing' | 'success' | 'failure'}
                    onComplete={markTaskComplete}
                    onDelete={deleteTask}
                    onRefresh={refreshTasks}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}