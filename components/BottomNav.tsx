
import React from 'react';
import { Briefcase, PlusSquare, Eye } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ALL_JOBS' as TabType, label: 'All Jobs', icon: Briefcase },
    { id: 'POST_JOB' as TabType, label: 'Post Job', icon: PlusSquare },
    { id: 'VIEWED_JOBS' as TabType, label: 'Viewed', icon: Eye },
  ];

  return (
    <nav className="bg-white border-t border-gray-100 fixed bottom-0 left-0 right-0 z-20 px-4 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
