
import React from 'react';
import { DISCLAIMER } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">DRSpecialist</h3>
            <p className="text-sm leading-relaxed max-w-md">
              Helping you find clarity in healthcare by identifying the right specialists for your unique needs. Powered by advanced AI to guide your medical journey.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-widest text-xs">Medical Disclaimer</h3>
            <p className="text-xs leading-relaxed text-slate-400 italic">
              {DISCLAIMER}
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} DRSpecialist. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
