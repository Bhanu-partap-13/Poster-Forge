
import React from 'react';
import type { GeneratedPoster } from '../types';
import { DownloadIcon, ImageIcon, SaveIcon } from './icons';

interface WorkspaceProps {
    poster: GeneratedPoster | null;
    onSave: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ poster, onSave }) => {

    const handleDownload = () => {
        if (!poster) return;
        const link = document.createElement('a');
        link.href = poster.src;
        link.download = `poster-${poster.concept.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            {poster ? (
                <>
                    <div className="flex-grow w-full flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src={poster.src}
                            alt={poster.concept}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg border border-gray-600 transition-all duration-300"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            Download
                        </button>
                         <button
                            onClick={onSave}
                            className="flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-500 text-white font-semibold py-2 px-5 rounded-lg border border-cyan-500 transition-all duration-300"
                        >
                            <SaveIcon className="w-5 h-5" />
                            Add to Gallery
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500 flex flex-col items-center">
                    <ImageIcon className="w-24 h-24 mb-4" />
                    <h2 className="text-xl font-orbitron font-bold">Your Poster Awaits</h2>
                    <p className="max-w-xs">Follow the steps on the left to generate your AI-powered poster design.</p>
                </div>
            )}
        </div>
    );
};
