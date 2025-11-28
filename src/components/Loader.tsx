
import React, { useState, useEffect } from 'react';

const loadingMessages = [
    "Analyzing medication image...",
    "Identifying active ingredients...",
    "Cross-referencing medical databases...",
    "Checking for common interactions...",
    "Compiling safety information...",
    "Finalizing your report...",
];

const Loader = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="relative flex justify-center items-center">
                <div className="absolute w-24 h-24 rounded-full animate-spin border-4 border-solid border-teal-500 border-t-transparent"></div>
                <svg className="w-16 h-16 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5.75V3.75M12 20.25V18.25M18.25 12H20.25M3.75 12H5.75M16.794 7.206L18.207 5.793M5.793 18.207L7.206 16.794M16.794 16.794L18.207 18.207M5.793 5.793L7.206 7.206" />
                </svg>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-700">Please wait</p>
            <p className="mt-2 text-sm text-gray-500 transition-opacity duration-500">
                {loadingMessages[messageIndex]}
            </p>
        </div>
    );
};

export default Loader;
