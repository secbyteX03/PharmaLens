
import { getFunctions, httpsCallable } from "firebase/functions";
import { MedicationInfo } from '../types';
import { app } from "../firebase"; // Import the initialized app

// Initialize Firebase functions
const functions = getFunctions(app); // Pass the app instance

// Create a callable function
const medicationIdentifier = httpsCallable(functions, 'medicationIdentifier');

export const useGemini = () => {

    const analyzeMedicationImage = async (base64Image: string, mimeType: string): Promise<MedicationInfo> => {
        try {
            console.log('Calling Firebase function...');

            // Create a data URL from the base64 image and mime type
            const dataUrl = `data:${mimeType};base64,${base64Image}`;

            // Call the Firebase function with the data URL
            const result = await medicationIdentifier({ dataUrl });
            
            const parsedResponse = result.data as MedicationInfo;

            if (!parsedResponse) {
                throw new Error('Empty response from the function');
            }

            return parsedResponse;

        } catch (error) {
            console.error("Error analyzing medication image:", error);
            if (error instanceof Error) {
                // Handle specific error types if needed
                if (error.message.includes("not a medication")) {
                    throw error;
                }

                // Handle JSON parsing errors
                if (error instanceof SyntaxError) {
                    throw new Error("The AI response could not be processed. Please try again with a clearer image.");
                }
                
                // Generic error handling
                throw new Error(`Analysis failed: ${error.message}`);
            }
            throw new Error("An unknown error occurred while processing the image.");
        }
    };

    return { analyzeMedicationImage };
};
