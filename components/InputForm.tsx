import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  onGenerate: (genre: string, characters: string, premise: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [genre, setGenre] = useState('Sci-Fi Mystery');
  const [characters, setCharacters] = useState('A grizzled detective and a rogue AI');
  const [premise, setPremise] = useState('A series of impossible murders on a Martian colony');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (premise.trim()) {
      onGenerate(genre, characters, premise);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-slate-300 mb-2">
          Genre
        </label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="e.g., Fantasy, Noir, Romance"
          className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      </div>
      <div>
        <label htmlFor="characters" className="block text-sm font-medium text-slate-300 mb-2">
          Characters
        </label>
        <input
          id="characters"
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          placeholder="e.g., A tired knight, a clever thief"
          className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      </div>
      <div>
        <label htmlFor="premise" className="block text-sm font-medium text-slate-300 mb-2">
          Premise / Keywords <span className="text-red-400">*</span>
        </label>
        <textarea
          id="premise"
          rows={4}
          value={premise}
          onChange={(e) => setPremise(e.target.value)}
          placeholder="e.g., A magical library that contains the future"
          required
          className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !premise.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Ideas
          </>
        )}
      </button>
    </form>
  );
};
