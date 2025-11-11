import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 text-center border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
          Scenario Spark
        </h1>
      </div>
      <p className="mt-2 text-md text-slate-400">Your AI co-writer for endless story ideas</p>
    </header>
  );
};
