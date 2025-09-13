
import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/60 backdrop-blur-sm border-b border-cyan-500/20 shadow-lg p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-cyan-400" />
                <h1 className="text-2xl font-bold font-orbitron text-white tracking-widest">
                    AI POSTER FORGE
                </h1>
            </div>
            <a 
                href="https://github.com/google-gemini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-white transition-colors duration-300"
            >
                Powered by Gemini API
            </a>
        </header>
    );
};
