import { siteSurveySchema } from './site-survey';
import { educationalSurveySchema } from './educational-survey';
import { guestHouseSurveySchema } from './guest-house-survey';
import { hotelsSurveySchema } from './hotels-survey';
import { SurveySchema } from './types';

// Registry of all active survey schemas
export const surveyRegistry: Record<string, SurveySchema> = {
  'site-survey': siteSurveySchema,
  'educational-survey': educationalSurveySchema,
  'guest-house-survey': guestHouseSurveySchema,
  'hotels-survey': hotelsSurveySchema,
};

// Return a survey schema by its type, falling back to the default site-survey
export function getSurveySchema(surveyType?: string): SurveySchema {
  if (!surveyType || !surveyRegistry[surveyType]) {
    return siteSurveySchema;
  }
  return surveyRegistry[surveyType];
}

// Helper to get all registered surveys (useful for selection dropdowns/cards)
export function getAllSurveys(): SurveySchema[] {
  return Object.values(surveyRegistry);
}

// Dynamically generate an empty data object initialized with the correct keys for a schema
export function getDefaultSurveyData(surveyType: string): Record<string, any> {
  const schema = getSurveySchema(surveyType);
  const data: Record<string, any> = {
    surveyType: schema.surveyType,
  };

  schema.steps.forEach((step) => {
    step.sections?.forEach((section) => {
      section.fields.forEach((field) => {
        data[field.key] = '';
        if (field.type === 'file') {
          data[`${field.key}Name`] = '';
        }
      });
    });
  });

  return data;
}

export * from './types';
export { siteSurveySchema };
