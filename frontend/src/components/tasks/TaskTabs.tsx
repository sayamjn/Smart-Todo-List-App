import React from 'react';
import { TaskCounts } from '@/utils/api';

interface TaskTabsProps {
  activeTab: string;
  counts: TaskCounts;
  onChange: (tab: string) => void;
}


const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab, counts, onChange }) => {
  const tabs = [
    { id: 'all', label: 'All Tasks', count: counts.ongoing + counts.success + counts.failure },
    { id: 'ongoing', label: 'Ongoing', count: counts.ongoing, color: 'blue' },
    { id: 'success', label: 'Completed', count: counts.success, color: 'green' },
    { id: 'failure', label: 'Failed', count: counts.failure, color: 'red' }
  ];

  

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              py-2 px-4 font-medium text-sm focus:outline-none
              ${activeTab === tab.id
                ? `border-b-2 border-${tab.color || 'blue'}-500 text-${tab.color || 'blue'}-600`
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 bg-${tab.color || 'gray'}-100 text-${tab.color || 'gray'}-700 rounded-full px-2 py-0.5 text-xs`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskTabs;