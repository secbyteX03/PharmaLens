
import React, { useRef, useState, useEffect } from 'react';
import { UploadIcon, CameraIcon, MicrophoneIcon } from './icons';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface ImageUploaderProps {
    onImageSelect: (base64: string, mimeType: string) => void;
    onVoiceCommand?: (command: string) => void;
    isLoading: boolean;
    counterfeitWarning?: string;
}

const ImageUploader = ({ onImageSelect, onVoiceCommand, isLoading, counterfeitWarning }: ImageUploaderProps) => {
    const { 
        isListening, 
        transcript, 
        error: speechError, 
        isSupported: isSpeechSupported,
        startListening, 
        stopListening 
    } = useSpeechToText();
    
    // Handle voice commands when transcript changes
    useEffect(() => {
        if (transcript && onVoiceCommand) {
            onVoiceCommand(transcript);
        }
    }, [transcript, onVoiceCommand]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (file: File | null) => {
        if (file && (file.type.startsWith('image/'))) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                onImageSelect(base64, file.type);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (PNG, JPG, etc.).");
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div 
                    className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                        dragActive 
                            ? 'border-teal-500 bg-teal-50/50' 
                            : 'border-gray-200 hover:border-teal-400 bg-white/80 hover:bg-teal-50/30'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="pointer-events-none">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-4">
                            <UploadIcon className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Medication Image</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Drag & drop your image here, or{' '}
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className="font-medium text-teal-600 hover:text-teal-500 focus:outline-none"
                            >
                                browse
                            </button>
                        </p>
                        <p className="text-xs text-gray-400">Supports JPG, PNG (max 10MB)</p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        disabled={isLoading}
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={isLoading}
                        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CameraIcon className="h-5 w-5 text-gray-500" />
                        <span>Take a Photo</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={isLoading}
                        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-transparent bg-teal-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>Choose from Device</span>
                    </button>
                </div>
            </div>
            
            {/* Counterfeit Warning */}
            {counterfeitWarning && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {counterfeitWarning}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Voice Command Section */}
            {isSpeechSupported && (
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or use voice command</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            onClick={isListening ? stopListening : startListening}
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                                isListening 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-teal-600 hover:bg-teal-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                        >
                            <MicrophoneIcon className={`h-5 w-5 mr-2 ${isListening ? 'animate-pulse' : ''}`} />
                            {isListening ? 'Listening...' : 'Speak Command'}
                        </button>
                    </div>
                    
                    {speechError && (
                        <p className="mt-2 text-sm text-red-600 text-center">{speechError}</p>
                    )}
                    
                    {transcript && (
                        <p className="mt-2 text-sm text-gray-600 text-center">
                            <span className="font-medium">You said:</span> {transcript}
                        </p>
                    )}
                </div>
            )}
            
            {dragActive && <div className="fixed inset-0 w-full h-full z-50" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </>
    );
};

export default ImageUploader;
