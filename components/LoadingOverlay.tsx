
import React from 'react';
import { LoadingSpinnerIcon } from './icons';

interface LoadingOverlayProps {
    message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
    return (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg">
            <LoadingSpinnerIcon className="w-12 h-12 text-cyan-400" />
            <p className="mt-4 text-lg font-semibold font-orbitron text-white">{message}</p>
        </div>
    );
};
