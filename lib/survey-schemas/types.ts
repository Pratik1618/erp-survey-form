export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'tel'
  | 'date'
  | 'time'
  | 'select'
  | 'textarea'
  | 'file';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  className?: string; // Tailwind class e.g., 'md:col-span-2' for wider fields
  accept?: string; // e.g., 'image/*' for file fields
}

export interface SectionDefinition {
  id: string;
  title: string;
  fields: FieldDefinition[];
}

export interface SurveyStep {
  id: number;
  title: string;
  description: string;
  sections?: SectionDefinition[];
  hasCustomComponent?: boolean; // True if the step renders a custom React component (like Manpower details)
  customComponentId?: string; // E.g., 'manpower-table'
}

export interface SurveySchema {
  surveyType: string;
  title: string;
  steps: SurveyStep[];
}
