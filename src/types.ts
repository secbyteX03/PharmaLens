
export interface MedicationInfo {
  isMedication: boolean;
  medicationName: string;
  primaryUse: string;
  activeIngredients: string[];
  ageGroup: string;
  treatableSymptoms: string[];
  contraindicatedGroups: string[];
  dosageDuration: string;
  approximateCostKsh: string;
  commonSideEffects: string[];
  severeReactions: string[];
  doNotMixWith: string[]; // For food, drinks, activities
  medicationInteractions: string[]; // For other drugs
  alternativeMedications: string[];
  disclaimer: string;
  counterfeitWarning?: string; // Warning about potential counterfeit medication
  sources?: { uri: string; title: string; }[];
}
