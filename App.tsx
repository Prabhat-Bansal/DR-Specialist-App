
import React, { useState, useCallback } from 'react';
import { AppView, SearchResult } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SpecialistCard } from './components/SpecialistCard';
import { COMMON_SPECIALISTS, DISCLAIMER } from './constants';
import { analyzeSymptoms } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    setResult(null);
    setView(AppView.Search);

    try {
      const analysis = await analyzeSymptoms(searchQuery);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze symptoms. Please try again with more detail.");
    } finally {
      setIsSearching(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Find the <span className="text-blue-600">Right Specialist</span> for Your Health.
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Describe your symptoms or condition, and our AI will guide you to the appropriate medical professional.
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="E.g., persistent knee pain, frequent heartburn..."
            className="w-full pl-6 pr-32 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none shadow-lg text-lg transition-all"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-slate-400 flex items-center"
          >
            {isSearching ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Find Specialist"}
          </button>
        </form>
        
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase mr-2 mt-1">Common:</span>
          {["Back pain", "Vision problems", "Skin rash", "Diabetes"].map((q) => (
            <button 
              key={q}
              onClick={() => { setSearchQuery(q); }}
              className="text-sm bg-white border border-slate-200 px-3 py-1 rounded-full hover:border-blue-400 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Specialists</h2>
            <p className="text-slate-500">Quickly browse common medical fields</p>
          </div>
          <button 
            onClick={() => setView(AppView.Browse)}
            className="text-blue-600 font-semibold hover:underline flex items-center"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMON_SPECIALISTS.slice(0, 8).map((spec) => (
            <SpecialistCard key={spec.name} {...spec} />
          ))}
        </div>
      </section>

      {/* Safety Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="bg-amber-100 p-4 rounded-full text-amber-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Safety First</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              If you or someone around you is experiencing sudden severe pain, chest tightness, or difficulty breathing, skip the search and seek emergency medical attention immediately.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors whitespace-nowrap">
            Emergency Guidelines
          </button>
        </div>
      </section>
    </div>
  );

  const renderSearch = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <button 
        onClick={() => setView(AppView.Home)}
        className="text-slate-500 hover:text-slate-900 mb-8 flex items-center transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to home
      </button>

      {isSearching && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="inline-block animate-bounce mb-4 bg-blue-100 p-4 rounded-full text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.383a4 4 0 01-4.653-.138l-.318-.213a2 2 0 00-1.288-.351l-2.634.33a2 2 0 00-1.72 1.982V18a2 2 0 002 2h3.064a2 2 0 001.391-.566l7.284-7.284a2 2 0 000-2.828l-.138-.138a2 2 0 00-2.828 0l-7.284 7.284a2 2 0 00-.566 1.391V20" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your request...</h2>
          <p className="text-slate-500">Comparing symptoms with medical specialties.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center">
          <div className="bg-red-100 p-4 rounded-full text-red-600 w-fit mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button 
            onClick={() => setView(AppView.Home)}
            className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-blue-600 p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-blue-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-blue-50 mb-4 inline-block">
                    Recommended Specialist
                  </span>
                  <h2 className="text-4xl font-extrabold">{result.specialist.specialistName}</h2>
                  <p className="text-blue-100 text-lg mt-2 font-medium">{result.specialist.category}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm text-4xl">
                  {/* Placeholder for an icon, ideally mapping the category to an emoji */}
                  🩺
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Why this specialist?</h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {result.explanation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">About {result.specialist.specialistName}s</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {result.specialist.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Commonly Treated</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {result.specialist.commonConditions.map((cond, idx) => (
                      <li key={idx} className="flex items-center text-slate-600">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cond}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">When to see them?</h3>
                <p className="text-slate-600 italic">"{result.specialist.whenToSeeThem}"</p>
              </div>

              {result.specialist.urgencyWarning && (
                <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl">
                  <div className="flex items-center text-red-800 font-bold mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    URGENT ACTION MAY BE REQUIRED
                  </div>
                  <p className="text-red-700">{result.specialist.urgencyWarning}</p>
                </div>
              )}
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-slate-500 max-w-md">
                Always confirm with your primary care physician before booking a specialist.
              </p>
              <button 
                onClick={() => window.print()}
                className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-500 mb-4">Didn't find what you were looking for?</p>
            <button 
              onClick={() => { setView(AppView.Home); setSearchQuery(''); setResult(null); }}
              className="text-blue-600 font-bold hover:underline"
            >
              Start a new search
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderBrowse = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Medical Directory</h1>
        <p className="text-slate-600">A comprehensive list of healthcare specialists and their fields.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {COMMON_SPECIALISTS.map((spec) => (
          <SpecialistCard key={spec.name} {...spec} />
        ))}
        {/* Placeholder for more cards in a real app */}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-3xl mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About DRSpecialist</h1>
      <div className="prose prose-slate lg:prose-lg">
        <p className="text-lg text-slate-600 mb-6">
          Navigating the healthcare system can be overwhelming. Knowing exactly which doctor to call when something feels "off" is the first step toward recovery.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
        <p className="text-slate-600 mb-8">
          DRSpecialist leverages artificial intelligence to bridge the gap between complex symptoms and professional care. We aim to reduce uncertainty and ensure patients reach the right expertise faster.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-8">
          <h3 className="text-blue-900 font-bold mb-2">How it works</h3>
          <p className="text-blue-800">
            Our tool uses Natural Language Processing to analyze your input, cross-referencing it with standard medical specialty guidelines. It identifies key indicators that point toward specific medical fields.
          </p>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Important Notice</h2>
        <p className="text-slate-500 italic text-sm">
          {DISCLAIMER}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {currentView === AppView.Home && renderHome()}
        {currentView === AppView.Search && renderSearch()}
        {currentView === AppView.Browse && renderBrowse()}
        {currentView === AppView.About && renderAbout()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
