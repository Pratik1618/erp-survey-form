'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/components/form-context';

export function SiteDetailsForm() {
  const { surveyData, setSurveyData } = useFormContext();

  const handleChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const fields = [
    { label: 'Client Name', key: 'clientName' as const, required: true },
    { label: 'Site Name', key: 'siteName' as const, required: true },
    { label: 'Survey ID', key: 'surveyId' as const },
    { label: 'Address', key: 'address' as const, required: true },
    {label:"Pincode",key:"pincode" as const ,required:true},
    { label: 'Survey Date', key: 'surveyDate' as const, type: 'date' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Client and Site Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-2">
              <Label htmlFor={field.key} className="text-foreground font-medium">
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id={field.key}
                type={field.type || 'text'}
                value={surveyData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="bg-background text-foreground border-border"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
