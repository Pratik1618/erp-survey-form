'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';
import { SiteDetailsForm } from '@/components/forms/site-details-form';
import { BuildingDetailsForm } from '@/components/forms/building-details-form';
import { TechnicalDetailsForm } from '@/components/forms/technical-details-form';
import { ManpowerDetailsForm } from '@/components/forms/manpower-details-form';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ManpowerRow, SurveyData } from '@/components/form-context';
import { getApiUrl } from '@/lib/api-url';

const STEPS = [
  { id: 1, title: 'Site Details', description: 'Client and site information' },
  { id: 2, title: 'Building Details', description: 'Building specifications' },
  { id: 3, title: 'Technical Details', description: 'Technical infrastructure' },
  { id: 4, title: 'Manpower Details', description: 'Staffing information' },
];

const TIME_FIELDS: Array<keyof SurveyData> = ['officeHoursFrom', 'officeHoursTo'];
const MANPOWER_TIME_FIELDS: Array<keyof ManpowerRow> = [
  'shift1StartTime',
  'shift1EndTime',
  'shift2StartTime',
  'shift2EndTime',
  'shift3StartTime',
  'shift3EndTime',
  'generalShiftStartTime',
  'generalShiftEndTime',
];
const MANPOWER_NUMBER_FIELDS: Array<keyof ManpowerRow> = [
  'expectedSalary',
  'shift1Count',
  'shift2Count',
  'shift3Count',
  'generalShiftCount',
  'totalManpower',
];

function normalizeTime(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const twentyFourHourMatch = trimmed.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (twentyFourHourMatch) {
    return `${twentyFourHourMatch[1].padStart(2, '0')}:${twentyFourHourMatch[2]}`;
  }

  const twelveHourMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!twelveHourMatch) {
    return trimmed;
  }

  let hours = Number(twelveHourMatch[1]);
  const minutes = twelveHourMatch[2];
  const meridiem = twelveHourMatch[3].toUpperCase();

  if (meridiem === 'AM') {
    hours = hours === 12 ? 0 : hours;
  } else if (hours !== 12) {
    hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

function normalizeValue(value: string, key?: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (key?.toLowerCase().includes('time') || TIME_FIELDS.includes(key as keyof SurveyData)) {
    return normalizeTime(trimmed);
  }

  if (/^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(trimmed)) {
    return trimmed.replaceAll(',', '');
  }

  return trimmed;
}

function normalizeNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const normalized = trimmed.replaceAll(',', '');
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? normalized : parsed;
}

function omitEmptyEntries<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null) {
        return false;
      }

      if (typeof entry === 'string') {
        return entry.trim() !== '';
      }

      if (Array.isArray(entry)) {
        return entry.length > 0;
      }

      return true;
    })
  );
}

function buildSurveyPayload(surveyData: SurveyData, manpowerData: ManpowerRow[]) {
  const normalizedSurveyData = omitEmptyEntries(
    Object.entries(surveyData).map(([key, value]) => [key, normalizeValue(String(value ?? ''), key)])
      .reduce<Record<string, unknown>>((accumulator, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
      }, {})
  );

  const normalizedManpowerData = manpowerData
    .map((row) =>
      omitEmptyEntries(
        Object.entries(row).map(([key, value]) => {
        if (key === 'id') {
          return [key, String(value ?? '')];
        }

        if (MANPOWER_TIME_FIELDS.includes(key as keyof ManpowerRow)) {
          return [key, normalizeTime(String(value ?? ''))];
        }

        if (MANPOWER_NUMBER_FIELDS.includes(key as keyof ManpowerRow)) {
          return [key, normalizeNumber(String(value ?? ''))];
        }

        return [key, normalizeValue(String(value ?? ''), key)];
        }).reduce<Record<string, unknown>>((accumulator, [key, value]) => {
          accumulator[key] = value;
          return accumulator;
        }, {})
      )
    )
    .filter((row) => Object.keys(row).length > 0);

  return {
    surveyData: normalizedSurveyData,
    manpowerData: normalizedManpowerData,
  };
}

export function MakerStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { surveyData, manpowerData, setSubmittedVersion, setSubmittedManpower, setApprovalStatus } =
    useFormContext();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(getApiUrl('/api/survey/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(buildSurveyPayload(surveyData, manpowerData)),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          data?.details ||
          (typeof data?.results === 'string' ? data.results : '') ||
          'Failed to submit survey.';
        throw new Error(message);
      }

      setSubmittedVersion(JSON.parse(JSON.stringify(surveyData)));
      setSubmittedManpower(JSON.parse(JSON.stringify(manpowerData)));
      setApprovalStatus('pending');
      setSubmitted(true);
      setTimeout(() => {
        setCurrentStep(1);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit survey.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SiteDetailsForm />;
      case 2:
        return <BuildingDetailsForm />;
      case 3:
        return <TechnicalDetailsForm />;
      case 4:
        return <ManpowerDetailsForm />;
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
        <p className="text-gray-600">Your survey form has been submitted for approval.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {submitError ? (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      {/* Stepper */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold cursor-pointer transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : currentStep > step.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="ml-3 flex-1">
                <div className={`text-sm font-semibold ${currentStep === step.id ? 'text-blue-600' : 'text-gray-700'}`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-1 mx-2 ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{STEPS[currentStep - 1].title}</h2>
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
