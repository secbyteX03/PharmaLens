
const { configure } = require('genkit');
const { googleAI } = require('@genkit-ai/googleai');
const { firebase } = require('@genkit-ai/firebase');

module.exports = {
  plugins: [
    googleAI(),
    firebase(),
  ],
  flows: [
    {
      name: 'medicationIdentifier',
      inputSchema: { type: 'string' },
      outputSchema: { type: 'string' },
    },
  ],
  logLevel: 'debug',
  enableTracing: true,
};
