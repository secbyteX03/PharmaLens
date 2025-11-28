
import { MedicationInfo } from '../types';

// Types for the Gemini API response
interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

// This is a global variable set by config.js
declare global {
    var GEMINI_API_KEY: string | undefined;
}

// The JSON structure is now defined in the prompt itself.
const getPrompt = () => `You are an expert African Pharmacist and Medical Safety Assistant. Your goal is to analyze an image and provide life-saving information. You MUST use your search tool to find the most accurate and up-to-date information.

IMAGE-SPECIFIC INSTRUCTIONS:
- First, determine if the image contains a medication (pill, tablet, capsule, or packaging).
- If it is CLEARLY NOT a medication (e.g., a person, a car, food, a landscape): Set "isMedication" to false and other fields to "Not Applicable".
- If it is a medication box/package: Read the name and details directly. Set "isMedication" to true.
- If it is a loose pill/tablet: Describe its physical characteristics (shape, color, imprints). Use search to identify it. Set "isMedication" to true.

RESPONSE INSTRUCTIONS:
Your entire response MUST be a single, valid JSON object. Do not include any other text, greetings, or explanations outside of the JSON object. Start with "{" and end with "}".

Populate this exact JSON structure:
{
  "isMedication": boolean,
  "medicationName": "string",
  "primaryUse": "string",
  "activeIngredients": ["string"],
  "ageGroup": "string",
  "treatableSymptoms": ["string"],
  "contraindicatedGroups": ["string"],
  "dosageDuration": "string",
  "approximateCostKsh": "string",
  "commonSideEffects": ["string"],
  "severeReactions": ["string"],
  "doNotMixWith": ["string"],
  "medicationInteractions": ["string"],
  "alternativeMedications": ["string"],
  "disclaimer": "string"
}

FIELD-SPECIFIC GUIDELINES:
- **isMedication**: CRITICAL! Must be 'true' if it's a pill/package, 'false' otherwise.
- **medicationName**: The identified name. If unidentifiable, state 'Could not identify medication'.
- **contraindicatedGroups**: List groups who should NOT take this (e.g., 'Pregnant women', 'People with liver conditions').
- **dosageDuration**: State the typical duration of use (e.g., 'For 5 days').
- **approximateCostKsh**: Provide a price range in Kenyan Shillings (Ksh). Example: 'Ksh 200 - 300'. If unknown, state 'Cost varies'.
- **disclaimer**: Must be: "This is AI-generated information and not a substitute for professional medical advice. Always consult a doctor or pharmacist."
`;

// Remove unused interfaces as they're not being used in the code

// Remove the fileToGenerativePart function as we're handling inline data directly



export const useGemini = () => {
    const apiKey = globalThis.GEMINI_API_KEY;
    
    // Function to call the Gemini API directly
    const callGeminiAPI = async (prompt: string, imageData: string, mimeType: string) => {
        if (!apiKey) {
            throw new Error("Gemini API Key not configured. Please edit 'config.js' and add your API key.");
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;
        
        const requestBody = {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: imageData.split(',')[1] // Remove the data URL prefix
                        }
                    }
                ]
            }]
        };

        try {
            console.log('Sending request to:', API_URL);
            console.log('Request body:', JSON.stringify(requestBody, null, 2));
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();
            console.log('API Response:', responseData);

            if (!response.ok) {
                const errorMessage = responseData.error?.message || 
                                  responseData[0]?.error?.message || 
                                  'Failed to process image';
                throw new Error(`API Error (${response.status}): ${errorMessage}`);
            }

            return responseData;
        } catch (error) {
            console.error('API Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`API request failed: ${errorMessage}`);
        }
    };

    const analyzeMedicationImage = async (base64Image: string, mimeType: string): Promise<MedicationInfo> => {
        try {
            console.log('Sending request to Gemini API...');
            const response = await callGeminiAPI(getPrompt(), base64Image, mimeType);
            
            // Check for errors in the response
            if (response.error) {
                throw new Error(response.error.message);
            }
            
            // Extract the response text
            const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
            console.log('API Response:', responseText);
            
            if (!responseText) {
                throw new Error('Empty response from the API');
            }
            
            // Try to parse the JSON response
            let parsedResponse: MedicationInfo;
            try {
                parsedResponse = JSON.parse(responseText);
            } catch (e) {
                // If direct parsing fails, try to extract JSON from markdown code blocks
                const jsonMatch = responseText.match(/```(?:json)?\n([\s\S]*?)\n```/);
                if (jsonMatch && jsonMatch[1]) {
                    parsedResponse = JSON.parse(jsonMatch[1]);
                } else {
                    // If no code block found, try to find JSON in the response
                    const jsonStart = responseText.indexOf('{');
                    const jsonEnd = responseText.lastIndexOf('}') + 1;
                    if (jsonStart !== -1 && jsonEnd > 0) {
                        const jsonString = responseText.substring(jsonStart, jsonEnd);
                        parsedResponse = JSON.parse(jsonString);
                    } else {
                        throw new Error('Could not parse the response as JSON');
                    }
                }
            }

            // Add counterfeit detection warning
            if (parsedResponse.medicationName.toLowerCase().includes('unknown') || 
                parsedResponse.medicationName.toLowerCase().includes('unidentified')) {
                parsedResponse.counterfeitWarning = 'Warning: This medication could not be clearly identified. Please verify with a pharmacist.';
            }

            return parsedResponse;
        } catch (error) {
            console.error("Error analyzing medication image:", error);
            if (error instanceof Error) {
                // Special handling for specific error types
                if (error.message.includes("does not appear to be a medication") ||
                    error.message.includes("API Key not configured")) {
                    throw error; // These are user-friendly messages already
                }
                
                // Handle JSON parsing errors
                if (error instanceof SyntaxError) {
                    throw new Error("The AI response could not be processed. Please try again with a clearer image.");
                }
                
                // Handle API key or authentication errors
                if (error.message.includes("API key")) {
                    throw new Error("Authentication failed. Please check your API key in config.js");
                }
                
                // Generic error handling
                throw new Error(`Analysis failed: ${error.message}`);
            }
            throw new Error("An unknown error occurred while processing the image.");
        }
    };

    return { analyzeMedicationImage };
};
