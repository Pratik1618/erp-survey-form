'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';

export function SiteDetailsReview() {
  const { submittedVersion } = useFormContext();

  if (!submittedVersion) return null;

  const fields = [
    { label: 'Client Name', value: submittedVersion.clientName },
    { label: 'Site Name', value: submittedVersion.siteName },
    { label: 'Survey ID', value: submittedVersion.surveyId },
    { label: 'Address', value: submittedVersion.address },
    { label: 'Pincode', value: submittedVersion.pincode },
    { label: 'Survey Date', value: submittedVersion.surveyDate },
  ];

  return (
    
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Client and Site Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
            <p className="text-foreground font-medium">{field.value || '—'}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
