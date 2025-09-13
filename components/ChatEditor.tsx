
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ChatEditorProps {
    onSendMessage: (message: string) => void;
    isEnabled: boolean;
}

export const ChatEditor: React.FC<ChatEditorProps> = ({ onSendMessage, isEnabled }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">
                {isEnabled ? 'Describe changes you want to see.' : 'Generate a poster to enable editing.'}
            </p>
            <div className="relative">
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!isEnabled}
                    placeholder={isEnabled ? 'e.g., Change background to a beach' : 'Disabled'}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-md p-2 pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:bg-gray-800 disabled:cursor-not-allowed"
                />
                <button
                    onClick={handleSend}
                    disabled={!isEnabled || !message.trim()}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
