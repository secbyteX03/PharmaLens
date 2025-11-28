
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config'; // This will load the API key

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
