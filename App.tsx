import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { generateScenarios } from './services/geminiService';
import type { Scenario } from './types';

const App: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (genre: string, characters: string, premise: string) => {
    setIsLoading(true);
    setError(null);
    setScenarios([]);

    try {
      const result = await generateScenarios(genre, characters, premise);
      setScenarios(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg backdrop-blur-sm">
              <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ResultDisplay scenarios={scenarios} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Powered by Gemini. Designed to spark your creativity.</p>
      </footer>
    </div>
  );
};

export default App;
