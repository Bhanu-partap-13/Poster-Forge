
import { GoogleGenAI, Modality } from "@google/genai";
import type { AspectRatio } from '../types';
import { MODELS } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const dataUrlToPart = (dataUrl: string) => {
    const [meta, base64Data] = dataUrl.split(',');
    const mimeType = meta.match(/:(.*?);/)?.[1] || 'image/png';
    return {
        inlineData: {
            data: base64Data,
            mimeType,
        },
    };
};

export const removeBackground = async (imageBase64: string): Promise<string> => {
    const imagePart = dataUrlToPart(imageBase64);
    const prompt = 'Isolate the main product in this image. Remove the background completely and replace it with a solid, plain white background. Ensure the product\'s shadows are preserved if possible for realism, but only on the white background.';

    const response = await ai.models.generateContent({
        model: MODELS.IMAGE_EDITING,
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        }
    });

    const imageResponsePart = response.candidates?.[0]?.content.parts.find(part => part.inlineData);
    if (!imageResponsePart?.inlineData) {
        throw new Error('AI did not return an image for background removal.');
    }
    const { data, mimeType } = imageResponsePart.inlineData;
    return `data:${mimeType};base64,${data}`;
};


export const generateInitialPoster = async (productImageBase64: string, concept: string, ratio: AspectRatio): Promise<string> => {
    // Step 1: Generate the background
    const backgroundResponse = await ai.models.generateImages({
        model: MODELS.IMAGE_GENERATION,
        prompt: `Create a high-quality, photorealistic background for a product poster. The concept is: "${concept}". The background should be visually appealing but not distract from the main product that will be added later.`,
        config: {
            numberOfImages: 1,
            aspectRatio: ratio,
        }
    });

    const backgroundBase64 = backgroundResponse.generatedImages[0]?.image.imageBytes;
    if (!backgroundBase64) {
        throw new Error('AI failed to generate a background image.');
    }
    const backgroundMimeType = backgroundResponse.generatedImages[0]?.image.mimeType || 'image/png';
    const backgroundDataUrl = `data:${backgroundMimeType};base64,${backgroundBase64}`;
    
    // Step 2: Composite the product onto the background
    const backgroundPart = dataUrlToPart(backgroundDataUrl);
    const productPart = dataUrlToPart(productImageBase64);
    const compositePrompt = 'Take the product from the second image (which has a plain white background) and place it realistically onto the first image (the background scene). Blend the product seamlessly, adjusting lighting and shadows to make it look natural in the new environment. Do not include the white background from the product image in the final result.';

    const compositeResponse = await ai.models.generateContent({
        model: MODELS.IMAGE_EDITING,
        contents: { parts: [backgroundPart, productPart, { text: compositePrompt }] },
         config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        }
    });
    
    const finalImagePart = compositeResponse.candidates?.[0]?.content.parts.find(part => part.inlineData);
     if (!finalImagePart?.inlineData) {
        throw new Error('AI did not return an image after composition.');
    }

    const { data, mimeType } = finalImagePart.inlineData;
    return `data:${mimeType};base64,${data}`;
};


export const editPoster = async (currentPosterBase64: string, instruction: string): Promise<string> => {
    const imagePart = dataUrlToPart(currentPosterBase64);

    const response = await ai.models.generateContent({
        model: MODELS.IMAGE_EDITING,
        contents: { parts: [imagePart, { text: instruction }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        }
    });

    const imageResponsePart = response.candidates?.[0]?.content.parts.find(part => part.inlineData);
    if (!imageResponsePart?.inlineData) {
        throw new Error('AI did not return an edited image.');
    }
    const { data, mimeType } = imageResponsePart.inlineData;
    return `data:${mimeType};base64,${data}`;
};
