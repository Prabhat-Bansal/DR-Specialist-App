
import React from 'react';

interface SpecialistCardProps {
  name: string;
  field: string;
  description: string;
  icon: string;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({ name, field, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 p-6 transition-all group">
      <div className="text-3xl mb-4 p-3 bg-blue-50 w-fit rounded-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{name}</h3>
      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">{field}</p>
      <p className="text-slate-600 text-sm line-clamp-3">
        {description}
      </p>
      <button className="mt-4 text-sm font-medium text-slate-900 hover:text-blue-600 flex items-center transition-colors">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
