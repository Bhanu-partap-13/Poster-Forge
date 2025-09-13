
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Workspace } from './components/Workspace';
import { PosterGallery } from './components/PosterGallery';
import type { AspectRatio, GeneratedPoster } from './types';
import { removeBackground, generateInitialPoster, editPoster } from './services/geminiService';
import { Header } from './components/Header';
import { LoadingOverlay } from './components/LoadingOverlay';

const App: React.FC = () => {
    const [originalImages, setOriginalImages] = useState<File[]>([]);
    const [processedImages, setProcessedImages] = useState<string[]>([]);
    const [activeProductImage, setActiveProductImage] = useState<string | null>(null);
    const [currentPoster, setCurrentPoster] = useState<GeneratedPoster | null>(null);
    const [savedPosters, setSavedPosters] = useState<GeneratedPoster[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleImageUpload = (files: FileList) => {
        setOriginalImages(Array.from(files));
        setProcessedImages([]);
        setActiveProductImage(null);
    };

    const handleBackgroundRemoval = useCallback(async () => {
        if (originalImages.length === 0) return;
        setIsLoading(true);
        setLoadingMessage('Removing backgrounds...');
        setError(null);
        try {
            const processed: string[] = [];
            for (const file of originalImages) {
                const base64Image = await fileToBase64(file);
                const result = await removeBackground(base64Image);
                processed.push(result);
            }
            setProcessedImages(processed);
        } catch (err) {
            console.error(err);
            setError('Failed to remove backgrounds. Please check the API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [originalImages]);

    const handlePosterGeneration = useCallback(async (concept: string, ratio: AspectRatio) => {
        if (!activeProductImage) {
            setError('Please select a product image first.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Generating poster masterpiece...');
        setError(null);
        try {
            const result = await generateInitialPoster(activeProductImage, concept, ratio);
            setCurrentPoster({ id: Date.now().toString(), src: result, concept });
        } catch (err) {
            console.error(err);
            setError('Failed to generate poster. Please try a different concept or check API key.');
        } finally {
            setIsLoading(false);
        }
    }, [activeProductImage]);

    const handlePosterEdit = useCallback(async (instruction: string) => {
        if (!currentPoster) return;
        setIsLoading(true);
        setLoadingMessage('Applying your edits...');
        setError(null);
        try {
            const result = await editPoster(currentPoster.src, instruction);
            setCurrentPoster({ ...currentPoster, src: result });
        } catch (err) {
            console.error(err);
            setError('Failed to edit poster. The request might be too complex. Please try a simpler instruction.');
        } finally {
            setIsLoading(false);
        }
    }, [currentPoster]);

    const handleSavePoster = useCallback(() => {
        if (currentPoster && !savedPosters.find(p => p.id === currentPoster.id)) {
            setSavedPosters(prev => [currentPoster, ...prev]);
        }
    }, [currentPoster, savedPosters]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
            <Header />
            {error && (
                <div className="bg-red-800/50 text-red-200 border border-red-600 p-3 text-center text-sm z-50">
                    <strong>Error:</strong> {error}
                </div>
            )}
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-[calc(100vh-80px)]">
                <div className="lg:col-span-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg shadow-2xl shadow-cyan-500/10 overflow-y-auto p-4 flex flex-col gap-4">
                    <ControlPanel
                        onImageUpload={handleImageUpload}
                        onRemoveBackground={handleBackgroundRemoval}
                        originalImages={originalImages}
                        processedImages={processedImages}
                        activeProductImage={activeProductImage}
                        onProductSelect={setActiveProductImage}
                        onGeneratePoster={handlePosterGeneration}
                        onEditPoster={handlePosterEdit}
                        isEditingEnabled={!!currentPoster}
                    />
                </div>
                <div className="lg:col-span-6 bg-gray-900/50 border border-cyan-500/20 rounded-lg shadow-2xl shadow-cyan-500/10 flex flex-col relative">
                    {isLoading && <LoadingOverlay message={loadingMessage} />}
                    <Workspace
                        poster={currentPoster}
                        onSave={handleSavePoster}
                    />
                </div>
                <div className="lg:col-span-3 bg-gray-900/50 border border-cyan-500/20 rounded-lg shadow-2xl shadow-cyan-500/10 flex flex-col">
                    <PosterGallery savedPosters={savedPosters} />
                </div>
            </main>
        </div>
    );
};

export default App;
