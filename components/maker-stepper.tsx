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

const STEPS = [
  { id: 1, title: 'Site Details', description: 'Client and site information' },
  { id: 2, title: 'Building Details', description: 'Building specifications' },
  { id: 3, title: 'Technical Details', description: 'Technical infrastructure' },
  { id: 4, title: 'Manpower Details', description: 'Staffing information' },
];

export function MakerStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { surveyData, manpowerData, setSubmittedVersion, setSubmittedManpower, setSurveyData, setManpowerData } = useFormContext();

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

  const handleSubmit = () => {
    setSubmittedVersion(surveyData);
    setSubmittedManpower(manpowerData);
    setSubmitted(true);
    setTimeout(() => {
      setCurrentStep(1);
      setSubmitted(false);
    }, 2000);
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
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
              <Check className="w-4 h-4" />
              Submit Form
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
