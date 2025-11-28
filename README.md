
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
