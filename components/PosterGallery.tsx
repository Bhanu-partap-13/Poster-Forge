
import React from 'react';
import type { GeneratedPoster } from '../types';
import { CollectionIcon } from './icons';

interface PosterGalleryProps {
    savedPosters: GeneratedPoster[];
}

export const PosterGallery: React.FC<PosterGalleryProps> = ({ savedPosters }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="p-3 border-b border-gray-700/50 bg-gray-800/20">
                <h2 className="text-lg font-orbitron font-semibold text-cyan-400 text-center">
                    Poster Gallery
                </h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                {savedPosters.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {savedPosters.map((poster) => (
                            <div key={poster.id} className="group relative rounded-md overflow-hidden aspect-w-3 aspect-h-4 bg-gray-800">
                                <img src={poster.src} alt={poster.concept} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                                    <p className="text-xs text-white text-center">{poster.concept}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                        <CollectionIcon className="w-16 h-16 mb-4" />
                        <p className="font-semibold">Your saved posters will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
