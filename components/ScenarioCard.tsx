import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ScenarioCardProps {
  title: string;
  description: string;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description }) => {
  return (
    <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
      <div className="flex items-center gap-3 mb-3">
        <SparklesIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
};
