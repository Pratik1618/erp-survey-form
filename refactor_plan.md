# Project Refactor Plan: Multi-Survey Platform Integration

We will transition the codebase from a hardcoded single-survey form to a scalable, configuration-driven multi-survey platform. The first step is to freeze the current survey (to be known as the **Site Survey Form**), extract its fields into a reusable schema, and refactor the UI to render from that schema. This ensures **zero change in behavior** for your most-used case, while paving the way to easily add the other 4-5 surveys via configuration files.

---

## Architectural Design

### 1. Schema Definition (`lib/survey-schemas/types.ts`)
We will define type safety for our survey templates, allowing each step and section to be rendered dynamically.

```typescript
export type FieldType = 'text' | 'number' | 'email' | 'tel' | 'date' | 'time' | 'select' | 'textarea' | 'file';

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
  options?: FieldOption[]; // for select fields
  className?: string; // e.g. 'md:col-span-2'
  accept?: string; // e.g. 'image/*'
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
  hasCustomComponent?: boolean; // For complex custom steps (e.g., Manpower table)
  customComponentId?: string;
}

export interface SurveySchema {
  surveyType: string;
  title: string;
  steps: SurveyStep[];
}
```

### 2. Base Survey Schema (`lib/survey-schemas/site-survey.ts`)
We will extract the current survey's structure into a static schema configuration. This represents the **"Site Survey Form"**.

### 3. Schema Registry (`lib/survey-schemas/index.ts`)
A central registry containing all available surveys. 
* Default/Initial survey: `site-survey`
* Future additions (Technical, Soft Services, Educational, etc.) will just register new schema configurations here.

---

## Execution Phases

### Phase 1: Create the Schema Layer
1. Create `lib/survey-schemas/types.ts`.
2. Create `lib/survey-schemas/site-survey.ts` and define the exact fields for:
   * **Site Details:** Client Name, Site Name, Address, Contact details, supporting attachments, etc.
   * **Building Details:** Plot Area, Capacity, Common Areas, Toilet count, Parking, Glass details.
   * **Technical Details:** Power supply, HVAC, Lifts, Fire safety, Water, Waste, Horticulture, Security, Pantry, Remarks.
3. Register the schema in `lib/survey-schemas/index.ts`.

### Phase 2: Generic Fields and Form Renderer
Create a set of reusable dynamic input components under `components/forms/dynamic-field.tsx`:
* Renders `Input`, `Textarea`, `Select`, or `File` based on the schema `FieldType`.
* Integrates with the existing `FormContext`.

Create `components/forms/dynamic-section.tsx`:
* Groups and lays out the dynamic fields in a standard Shadcn `Card` layout.

### Phase 3: Stepper & Maker View Refactoring
1. Update `components/maker-stepper.tsx`:
   * Load the active `SurveySchema` from context.
   * Dynamically generate the stepper header.
   * For standard steps, render the dynamic sections.
   * For the **Manpower Details** step (which has custom tabular logic), mount the existing `ManpowerDetailsForm` component by matching `customComponentId === 'manpower-table'`.
2. Keep the default survey set to `site-survey` so users land on the same screen with **no visual or behavioral changes**.

### Phase 4: Dynamic Review & Checker View
Refactor the review screens (`components/reviews/`) to also use the same schema configuration.
* Avoids creating 5 different review components for the new survey types.
* Uses the active schema to read the keys from `SurveyData` and render them in a clean read-only grid.

### Phase 5: Integrate surveyType in API Payload
Update `components/maker-stepper.tsx` and the Next.js API route `/api/survey/create` to include `surveyType: 'site-survey'` in the payload. This informs the backend and checker dashboard which template is being loaded.

---

## Rollout Order of New Surveys (Post-Refactor)
Once the base refactor is complete, new surveys will be added in this sequence by simply creating their JSON schemas:
1. **Technical Survey**
2. **Soft Services Survey**
3. **Educational Survey**
4. **Hospitals Survey**
5. **Guest House / Hotels Survey**
