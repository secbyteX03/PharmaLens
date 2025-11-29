const functions = require('firebase-functions');
const { configureGenkit } = require('@genkit-ai/core');
const { defineFlow, runFlow } = require('@genkit-ai/flow');
const { generate } = require('@genkit-ai/ai');
const { gemini15Flash, googleAI } = require('@genkit-ai/googleai');
const { firebase } = require('@genkit-ai/firebase');
const z = require('zod');

configureGenkit({
  plugins: [
    firebase(),
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const medicationInfoSchema = z.object({
  isMedication: z.boolean(),
  medicationName: z.string(),
  primaryUse: z.string(),
  activeIngredients: z.array(z.string()),
  ageGroup: z.string(),
  treatableSymptoms: z.array(z.string()),
  contraindicatedGroups: z.array(z.string()),
  dosageDuration: z.string(),
  approximateCostKsh: z.string(),
  commonSideEffects: z.array(z.string()),
  severeReactions: z.array(z.string()),
  doNotMixWith: z.array(z.string()),
  medicationInteractions: z.array(z.string()),
  alternativeMedications: z.array(z.string()),
  disclaimer: z.string(),
  counterfeitWarning: z.string().optional(),
  sources: z.array(z.object({
    uri: z.string(),
    title: z.string(),
  })).optional(),
});

const getPrompt = () => `You are an expert African Pharmacist and Medical Safety Assistant. Your goal is to analyze an image and provide life-saving information. You MUST use your search tool to find the most accurate and up-to-date information.\n\nIMAGE-SPECIFIC INSTRUCTIONS:\n- First, determine if the image contains a medication (pill, tablet, capsule, or packaging).\n- If it is CLEARLY NOT a medication (e.g., a person, a car, food, a landscape): Set "isMedication" to false and other fields to "Not Applicable".\n- If it is a medication box/package: Read the name and details directly. Set "isMedication" to true.\n- If it is a loose pill/tablet: Describe its physical characteristics (shape, color, imprints). Use search to identify it. Set "isMedication" to true.\n\nRESPONSE INSTRUCTIONS:\nYour entire response MUST be a single, valid JSON object that conforms to the specified schema. Do not include any other text, greetings, or explanations outside of the JSON object. Start with "{" and end with "}"\n\nFIELD-SPECIFIC GUIDELINES:\n- **isMedication**: CRITICAL! Must be \'true\' if it\'s a pill/package, \'false\' otherwise.\n- **medicationName**: The identified name. If unidentifiable, state \'Could not identify medication\'.\n- **contraindicatedGroups**: List groups who should NOT take this (e.g., \'Pregnant women\', \'People with liver conditions\').\n- **dosageDuration**: State the typical duration of use (e.g., \'For 5 days\'.\n- **approximateCostKsh**: Provide a price range in Kenyan Shillings (Ksh). Example: \'Ksh 200 - 300\'. If unknown, state \'Cost varies\'.\n- **disclaimer**: Must be: "This is AI-generated information and not a substitute for professional medical advice. Always consult a doctor or pharmacist."\n- **counterfeitWarning**: Analyze the image for any signs of counterfeit medication. If there are any red flags, provide a warning. Otherwise, state \'No immediate signs of counterfeit detected, but always verify with a pharmacist.\'\n- **sources**: Provide at least one source for the information you provide. The source should be a valid URL and title.\n`;

const medicationIdentifierFlow = defineFlow(
  {
    name: 'medicationIdentifierFlow',
    inputSchema: z.string(),
    outputSchema: medicationInfoSchema,
  },
  async (dataUrl) => {
    const llmResponse = await generate({
      prompt: [
        { text: getPrompt() },
        { media: { url: dataUrl } },
      ],
      model: gemini15Flash,
      output: { schema: medicationInfoSchema }
    });

    return llmResponse.output();
  }
);


exports.medicationIdentifier = functions.https.onCall(async (data) => {
  console.log("Received data:", JSON.stringify(data));
  let dataUrl = data.dataUrl;

  if (!dataUrl || typeof dataUrl !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a `dataUrl` string.');
  }
  const prefix = 'data:image/jpeg;base64,';
  while (dataUrl.startsWith(prefix + prefix)) {
    dataUrl = dataUrl.substring(prefix.length);
  }

  try {
    // Run the Genkit flow
    const result = await runFlow(medicationIdentifierFlow, dataUrl);
    return result;
  } catch (e) {
    console.error("Flow failed with an error:", e);
    throw new functions.https.HttpsError('internal', 'Analysis failed: The AI model encountered an error.', e.message);
  }
});
