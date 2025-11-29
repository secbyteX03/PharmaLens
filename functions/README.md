# PharmaLens Backend: Firebase Cloud Function with Genkit

This directory contains the backend logic for the PharmaLens application, built as a single Firebase Cloud Function.

## Overview

The backend is responsible for receiving an image of a medication from the frontend, analyzing it with Google's Gemini AI model, and returning a structured JSON response with detailed information about the medication.

## How It Works

1.  **HTTPS Trigger**: The function (`medicationIdentifier`) is an HTTPS-triggered Cloud Function. It is called by the React frontend when a user uploads an image.

2.  **Genkit Flow**: The function uses **Genkit**, an open-source AI framework from Google, to define and execute the AI-powered workflow. This flow is named `medicationIdentifierFlow`.

3.  **Input and Output**: The flow takes a base64-encoded image string as input and is configured to return a structured JSON object that adheres to a specific Zod schema (`medicationInfoSchema`). This ensures that the AI's output is always in a predictable and usable format.

4.  **AI Analysis with Gemini**: The Genkit flow uses the `@genkit-ai/googleai` plugin to interact with the **Gemini 1.5 Flash model**. It sends the image and a detailed prompt to the model.

5.  **Structured Response**: The prompt instructs the Gemini model to act as an expert pharmacist and to return its analysis in a specific JSON format. Genkit handles the parsing of this output, ensuring it matches the defined schema.

6.  **Error Handling**: The function includes robust error handling. If the AI model fails or if there's an issue with the flow, a specific `HttpsError` is thrown, which can be caught and handled by the frontend.

## Technology Stack

-   **Runtime**: Node.js
-   **Framework**: Firebase Cloud Functions
-   **AI Integration**: Genkit
-   **AI Model**: Google Gemini 1.5 Flash
-   **Schema Validation**: Zod

## Setup and Deployment

All dependencies and deployment scripts are managed from the root of the PharmaLens project.

-   **Installation**: Run `npm install` from this directory (or from the root, which will install for all workspaces).
-   **Local Emulation**: Run `firebase emulators:start --only functions` from the root directory to test the function locally.
-   **Deployment**: Run `firebase deploy --only functions` from the root directory to deploy the function to your Firebase project.

See the main `README.md` file in the root directory for complete setup and deployment instructions.
