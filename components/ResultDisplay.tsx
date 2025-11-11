import React from 'react';
import { ScenarioCard } from './ScenarioCard';
import { SparklesIcon } from './icons/SparklesIcon';
import type { Scenario } from '../types';

interface ResultDisplayProps {
  scenarios: Scenario[];
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-slate-800 p-6 rounded-lg">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-4/5"></div>
      </div>
    ))}
  </div>
);

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 border-2 border-dashed border-slate-700 rounded-2xl h-full">
    <SparklesIcon className="w-16 h-16 text-slate-600 mb-4" />
    <h2 className="text-2xl font-bold text-slate-300">Let's Create Something New</h2>
    <p className="mt-2 text-slate-400 max-w-md">Fill in the details on the left and click "Generate Ideas" to let the AI brainstorm unique story scenarios for you.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ scenarios, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div>
          <h3 className="text-xl font-semibold text-red-400">An Error Occurred</h3>
          <p className="mt-2 text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (scenarios.length === 0) {
    return <InitialState />;
  }

  return (
    <div className="space-y-6">
      {scenarios.map((scenario, index) => (
        <ScenarioCard key={index} title={scenario.title} description={scenario.description} />
      ))}
    </div>
  );
};
