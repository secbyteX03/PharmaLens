
import React from 'react';
import { WarningIcon } from './icons';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
    retryText?: string;
}

const ErrorDisplay = ({ message, onRetry, retryText = "Try Again" }: ErrorDisplayProps) => {
    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg max-w-2xl mx-auto">
            <div className="flex">
                <div className="flex-shrink-0">
                    <WarningIcon className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800">An Error Occurred</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>{message}</p>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={onRetry}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            {retryText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorDisplay;
