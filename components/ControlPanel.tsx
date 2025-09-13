
import React, { useState } from 'react';
import type { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { ImageUploader } from './ImageUploader';
import { ChatEditor } from './ChatEditor';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface ControlPanelProps {
    onImageUpload: (files: FileList) => void;
    onRemoveBackground: () => void;
    originalImages: File[];
    processedImages: string[];
    activeProductImage: string | null;
    onProductSelect: (imageBase64: string) => void;
    onGeneratePoster: (concept: string, ratio: AspectRatio) => void;
    onEditPoster: (instruction: string) => void;
    isEditingEnabled: boolean;
}

const Section: React.FC<{ title: string; step: number; children: React.ReactNode }> = ({ title, step, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border border-gray-700/50 rounded-lg bg-gray-800/20">
            <button
                className="w-full flex justify-between items-center p-3 bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-lg font-orbitron font-semibold text-cyan-400">
                    <span className="text-gray-500 mr-2">{step}.</span>{title}
                </h2>
                {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
    onImageUpload, onRemoveBackground, originalImages, processedImages,
    activeProductImage, onProductSelect, onGeneratePoster, onEditPoster, isEditingEnabled
}) => {
    const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
    const [concept, setConcept] = useState('');

    const handleGenerateClick = () => {
        if (concept.trim()) {
            onGeneratePoster(concept, selectedRatio);
        }
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <Section title="Upload Product" step={1}>
                <ImageUploader
                    onImageUpload={onImageUpload}
                    onRemoveBackground={onRemoveBackground}
                    originalImages={originalImages}
                    processedImages={processedImages}
                    activeProductImage={activeProductImage}
                    onProductSelect={onProductSelect}
                />
            </Section>
            
            <Section title="Design Concept" step={2}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                        <div className="grid grid-cols-3 gap-2">
                            {ASPECT_RATIOS.map(ratio => (
                                <button
                                    key={ratio}
                                    onClick={() => setSelectedRatio(ratio)}
                                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 border-2 ${
                                        selectedRatio === ratio
                                            ? 'bg-cyan-500 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/30'
                                            : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-cyan-500'
                                    }`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                         <label htmlFor="concept" className="block text-sm font-medium text-gray-300 mb-2">Poster Concept</label>
                         <textarea
                            id="concept"
                            rows={4}
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            placeholder="e.g., A futuristic ad on a neon-lit Tokyo street"
                        />
                    </div>
                    <button
                        onClick={handleGenerateClick}
                        disabled={!activeProductImage || !concept.trim()}
                        className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 flex items-center justify-center gap-2"
                    >
                        Generate Poster
                    </button>
                </div>
            </Section>
            
            <Section title="Iterate & Refine" step={3}>
                <ChatEditor onSendMessage={onEditPoster} isEnabled={isEditingEnabled} />
            </Section>
        </div>
    );
};
