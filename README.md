
# PharmaLens: AI Medication Identifier

PharmaLens is a web application that uses Google's Gemini AI to identify medications from an uploaded image. It provides detailed, easy-to-understand information about the medication, including its uses, side effects, contraindications, and more.

## Features

- **Image-based Identification**: Upload a photo of a medication box or a loose pill.
- **AI-Powered Analysis**: Uses Gemini with Google Search grounding to identify the medication and retrieve up-to-date information.
- **Comprehensive Details**: Get information on primary use, symptoms treated, active ingredients, side effects, and critical warnings.
- **Localized Information**: Includes estimated cost in Kenyan Shillings (Ksh) and suitability for different groups.
- **Safety First**: Provides a clear disclaimer and lists web sources for verification.

---

## 🚀 Getting Started: How to Run This Project

An example API key has been included so you can test the project immediately.

### Step 1: Run the Application with a Local Server

For security reasons, modern web browsers restrict some functionality (like API calls) when you open an HTML file directly from your computer (`file://...`). To make the app work correctly, you need to serve it from a simple local web server.

If you have **Node.js** installed, this is the easiest method:

1.  Open your terminal or command prompt.
2.  Navigate to the project's root directory (the folder containing `index.html`).
3.  Install the `serve` package globally by running this command once:
    ```bash
    npm install -g serve
    ```
4.  Start the server by running:
    ```bash
    serve
    ```
5.  Your terminal will show a local address, usually `http://localhost:3000`.
6.  Open this address in your web browser.

The application should now load and function correctly!

### (Optional) Step 2: Use Your Own API Key

The included example API key may be subject to rate limits. For best performance, it is highly recommended to use your own free API key.

1.  Go to **Google AI Studio**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2.  Sign in with your Google account and click "**Create API key**".
3.  Copy your new API key.
4.  Open the `config.js` file in the project's root directory.
5.  Replace the existing key with your own key:
    ```javascript
    window.GEMINI_API_KEY = "YOUR_NEW_PERSONAL_API_KEY";
    ```
6.  Save the file and refresh your browser.

---

# PharmaLens - AI-Powered Medication Identification

## Overview
PharmaLens is a mobile-first web application that helps users identify medications and access critical safety information through AI-powered image recognition. Designed with a focus on accessibility, it includes voice commands and supports multiple languages to serve diverse communities.

## Features

- **AI-Powered Medication Identification**: Upload or take photos of medications for instant identification
- **Counterfeit Detection**: Get alerts about potential counterfeit medications
- **Voice Commands**: Fully operable through voice for accessibility
- **Multilingual Support**: Available in multiple languages including English, French, Swahili, and Arabic
- **Offline Functionality**: Core features work without internet connection

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18 or later
- npm (comes with Node.js) or yarn
- Firebase account (for backend services)
- Google Gemini API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/secbyteX03/PharmaLens.git
   cd pharmalens
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open in browser**
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Firebase Setup

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, Storage, and Cloud Functions
3. Add a web app to your Firebase project and copy the configuration
4. Update the Firebase configuration in `src/firebase.ts`

## Available Scripts

In the project directory, you can run:

- `npm start` or `yarn start`: Runs the app in development mode
- `npm test` or `yarn test`: Launches the test runner
- `npm run build` or `yarn build`: Builds the app for production
- `npm run eject`: Ejects from Create React App configuration

## Troubleshooting

- **"Analysis failed..." error**: Ensure your Gemini API key is valid and has sufficient quota
- **Firebase errors**: Verify your Firebase configuration and enable required services
- **Build issues**: Clear node_modules and reinstall dependencies
  ```bash
  rm -rf node_modules
  npm install
  ```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
