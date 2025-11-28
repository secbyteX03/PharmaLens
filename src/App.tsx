
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { useGemini } from './hooks/useGemini';
import { MedicationInfo } from './types';

const App = () => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<MedicationInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { analyzeMedicationImage } = useGemini();
    
    // Add a nice gradient background to the app
    const appStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 100%)',
    };

    const handleImageAnalysis = useCallback(async (base64: string, mimeType: string) => {
        setImage(base64);
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeMedicationImage(base64, mimeType);
            setResult(analysisResult);
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [analyzeMedicationImage]);

    const handleReset = () => {
        setImage(null);
        setResult(null);
        setError(null);
        setIsLoading(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            const isConfigError = error.includes("API Key not configured");
            return (
                <ErrorDisplay
                    message={error}
                    onRetry={isConfigError ? () => window.location.reload() : handleReset}
                    retryText={isConfigError ? "Reload Page" : "Try Again"}
                />
            );
        }
        if (result && image) {
            return <ResultDisplay result={result} image={image} onReset={handleReset} />;
        }
        return <ImageUploader onImageSelect={handleImageAnalysis} isLoading={isLoading} />;
    };

    return (
        <div style={appStyle} className="min-h-screen">
            <Header />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyze Medication</h2>
                        {renderContent()}
                    </div>
                </div>
                {result || error ? (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Analyze Another Medication
                        </button>
                    </div>
                ) : null}
            </main>
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
                    <p> {new Date().getFullYear()} PharmaLens. All rights reserved.</p>
                    <p className="mt-2">This tool provides AI-generated information and is not a substitute for professional medical advice.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
