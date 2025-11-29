
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CameraIcon, VideoCameraIcon, XMarkIcon } from './icons';

interface ImageUploaderProps {
    onImageSelect: (base64: string, mimeType: string) => void;
    isLoading: boolean;
}

const ImageUploader = ({ onImageSelect, isLoading }: ImageUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFileChange = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                onImageSelect(reader.result as string, file.type);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const openCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setIsCameraOpen(true);
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Could not access the camera. Please ensure you have given the necessary permissions.");
        }
    }, []);

    const closeCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    }, []);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            onImageSelect(dataUrl, 'image/jpeg');
            closeCamera();
        }
    };

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);


    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        const input = document.getElementById('file-upload') as HTMLInputElement;
        input?.click();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        }
    };
    
    if (isCameraOpen) {
        return (
            <div className="w-full max-w-lg mx-auto text-center">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md mb-4" />
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleCapture}
                        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center">
                        <CameraIcon className="w-6 h-6 mr-2"/>
                        Capture Photo
                    </button>
                    <button
                        onClick={closeCamera}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 inline-flex items-center">
                        <XMarkIcon className="w-6 h-6 mr-2"/>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
                    isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                }`}>
                <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={onInputChange} disabled={isLoading} />
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                        <CameraIcon className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Drag & Drop or Upload an Image</p>
                    <p className="text-gray-500">or</p>
                    <div className="flex space-x-4">
                         <button
                            type="button"
                            onClick={handleClick}
                            className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            disabled={isLoading}>
                            Choose a file
                        </button>
                        <button
                            type="button"
                            onClick={openCamera}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center"
                            disabled={isLoading}>
                            <VideoCameraIcon className="w-5 h-5 mr-2" />
                            Take a Photo
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
