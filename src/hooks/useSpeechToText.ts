import { useState, useCallback, useEffect } from 'react';

export const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Check for browser support
    const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    const recognition = isSupported ? new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)() : null;

    useEffect(() => {
        if (!recognition) return;

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            setTranscript(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognition.stop();
        };
    }, [recognition]);

    const startListening = useCallback(() => {
        if (!recognition) {
            setError('Speech recognition is not supported in your browser.');
            return;
        }
        
        try {
            setTranscript('');
            setError(null);
            setIsListening(true);
            recognition.start();
        } catch (err) {
            console.error('Error starting speech recognition:', err);
            setError('Error starting speech recognition');
            setIsListening(false);
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition]);

    return {
        isListening,
        transcript,
        error,
        isSupported,
        startListening,
        stopListening,
    };
};
