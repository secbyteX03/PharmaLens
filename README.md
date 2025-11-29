# PharmaLens: AI-Powered Medication Identification & Safety

PharmaLens is a web application designed to combat counterfeit medications and improve health literacy. Users can take a picture of a medication (a pill or its packaging), and the app will provide immediate, crucial information about its use, ingredients, side effects, and more.

**Live Demo:** [https://pharmalens-06104265-9325f.web.app](https://pharmalens-06104265-9325f.web.app)

![PharmaLens Desktop UI](assets/UIview.PNG)
---

## How It Works

The application uses a simple but powerful workflow to deliver real-time medication analysis:

1.  **Image Upload**: The user uploads an image of a medication directly in the browser.
2.  **Frontend Processing**: The React frontend converts the image into a base64-encoded string.
3.  **Backend Request**: The frontend sends this string to a Firebase Cloud Function.
4.  **AI Analysis with Genkit**: The Cloud Function triggers a flow built with **Genkit**, an open-source AI framework from Google.
5.  **Gemini Model**: The Genkit flow passes the image data and a detailed prompt to **Google's Gemini 1.5 Flash model**.
6.  **JSON Response**: The Gemini model analyzes the image, identifies the medication, and returns a structured JSON object containing all the required information.
7.  **Display Results**: The Firebase Function relays the JSON response back to the React frontend, which then parses and displays the information in a user-friendly format.

---

## Technology Stack

PharmaLens is built with a modern, scalable, and AI-centric technology stack:

-   **Frontend**: A responsive web application built with **React** and **TypeScript**.
-   **Backend**: Serverless logic hosted on **Firebase Cloud Functions**.
-   **Core AI Framework**: **Genkit (from Google)** to streamline the development and management of the AI-powered workflow.
-   **AI Model**: **Google's Gemini 1.5 Flash**, a powerful, multimodal large language model.
-   **Deployment**: The entire application is hosted on **Firebase**, with the frontend on Firebase Hosting and the backend on Cloud Functions.

---

## Features

-   **Image-Based Analysis**: Upload a photo of a pill or its packaging for instant identification.
-   **Comprehensive Information**: Get structured details on the medication's name, primary use, active ingredients, and dosage.
-   **Critical Safety Warnings**: See prominent alerts for severe reactions, drug interactions, and contraindications.
-   **User-Friendly Interface**: Information is presented in easy-to-read cards with clear icons, designed for all literacy levels.
-   **Responsive Design**: The application is fully functional on both mobile and desktop browsers.

---

## Getting Started

Follow these instructions to set up, run, and deploy the project.

### Prerequisites

Make sure you have the following software installed:

-   **Node.js**: Version 20.x or later.
-   **npm**: Node Package Manager (comes with Node.js).
-   **Firebase CLI**: Google's command-line tool for Firebase.
    ```bash
    npm install -g firebase-tools
    ```

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/secbyteX03/PharmaLens.git
    cd PharmaLens
    ```

2.  **Log in to Firebase**:
    Authenticate the Firebase CLI with your Google account.
    ```bash
    firebase login
    ```

3.  **Configure a Firebase Project**:
    -   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    -   In your local project, connect it to your Firebase project by running:
        ```bash
        firebase use --add
        ```
    -   Select your new project from the list.

4.  **Install Frontend Dependencies**:
    In the root directory of the project, run:
    ```bash
    npm install
    ```

5.  **Install Backend Dependencies**:
    Navigate to the `functions` directory and install its dependencies:
    ```bash
    cd functions
    npm install
    cd ..
    ```

### Running the Application Locally

To test the full application, you need to run both the frontend and the backend emulators.

1.  **Run the Backend Emulator**:
    In the root directory, start the Firebase emulators. This will host the Cloud Function locally.
    ```bash
    firebase emulators:start --only functions
    ```

2.  **Run the Frontend Development Server**:
    In a separate terminal, also in the root directory, start the React app:
    ```bash
    npm start
    ```
    This will open the application in your browser at `http://localhost:3000`. The frontend will automatically connect to the local function emulator.

### Deployment

To deploy the entire application to Firebase:

1.  **Build the Frontend**:
    Create an optimized, production-ready build of the React app:
    ```bash
    npm run build
    ```

2.  **Deploy to Firebase**:
    Deploy both the frontend (Hosting) and the backend (Cloud Functions) with a single command:
    ```bash
    firebase deploy
    ```
    After deployment, the Firebase CLI will provide you with the live URL for your application.
