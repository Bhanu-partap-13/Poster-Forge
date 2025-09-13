import React, { useState, useEffect } from 'react';
import { UploadIcon, WandIcon } from './icons';

interface ImageUploaderProps {
    onImageUpload: (files: FileList) => void;
    onRemoveBackground: () => void;
    originalImages: File[];
    processedImages: string[];
    activeProductImage: string | null;
    onProductSelect: (imageBase64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageUpload,
    onRemoveBackground,
    originalImages,
    processedImages,
    activeProductImage,
    onProductSelect,
}) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        if (originalImages.length === 0) {
            setPreviewUrls([]);
            return;
        }

        const urls = originalImages.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        // Cleanup function to revoke the object URLs when the component unmounts or originalImages change
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [originalImages]);

    return (
        <div className="flex flex-col gap-4">
            <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-gray-700/50 hover:bg-gray-700 border-2 border-dashed border-gray-500 hover:border-cyan-400 transition-colors duration-300 rounded-lg p-6 text-center"
            >
                <div className="flex flex-col items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-cyan-400">Click to upload</span>
                    <span className="text-xs text-gray-400">or drag and drop images</span>
                </div>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => e.target.files && onImageUpload(e.target.files)}
                />
            </label>

            {previewUrls.length > 0 && (
                 <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Your uploads:</h3>
                     <div className="grid grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                             <div key={index} className="rounded-md overflow-hidden ring-2 ring-gray-700">
                                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover aspect-square" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {originalImages.length > 0 && (
                <button
                    onClick={onRemoveBackground}
                    className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                    <WandIcon className="w-5 h-5" />
                    Remove Backgrounds
                </button>
            )}

            {processedImages.length > 0 && (
                 <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Select a product to use:</h3>
                     <div className="grid grid-cols-3 gap-2">
                        {processedImages.map((imgSrc, index) => (
                            <div
                                key={index}
                                onClick={() => onProductSelect(imgSrc)}
                                className={`cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${activeProductImage === imgSrc ? 'ring-4 ring-cyan-500 shadow-lg' : 'ring-2 ring-gray-700 hover:ring-cyan-500'}`}
                            >
                                <img src={imgSrc} alt={`Processed product ${index + 1}`} className="w-full h-full object-cover aspect-square bg-white" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};