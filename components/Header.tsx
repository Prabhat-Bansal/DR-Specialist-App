
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView(AppView.Home)}
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-2 group-hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">DR<span className="text-blue-600">Specialist</span></span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setView(AppView.Home)}
              className={`${currentView === AppView.Home ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} font-medium transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => setView(AppView.Browse)}
              className={`${currentView === AppView.Browse ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} font-medium transition-colors`}
            >
              Browse Specialists
            </button>
            <button 
              onClick={() => setView(AppView.About)}
              className={`${currentView === AppView.About ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} font-medium transition-colors`}
            >
              About
            </button>
          </nav>

          <div className="md:hidden">
            {/* Mobile menu could be added here for production readiness */}
          </div>
        </div>
      </div>
    </header>
  );
};
