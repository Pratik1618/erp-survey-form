'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';

export function BuildingDetailsReview() {
  const { submittedVersion } = useFormContext();

  if (!submittedVersion) return null;

  const sections = [
    {
      title: 'Plot Area',
      fields: [
        { label: 'Built-up Area', value: submittedVersion.builtUpArea },
        { label: 'Total Carpet Area', value: submittedVersion.totalCarpetArea },
        { label: 'Floors', value: submittedVersion.floors },
        { label: 'Work Stations', value: submittedVersion.workStations },
      ],
    },
    {
      title: 'Capacity & Operations',
      fields: [
        { label: 'Total Employees', value: submittedVersion.totalEmployees },
        { label: 'Office Hours', value: submittedVersion.officeHours },
        { label: 'Staircases', value: submittedVersion.staircases },
        { label: 'Staircase Flooring', value: submittedVersion.staircaseFlooring },
      ],
    },
    {
      title: 'Parking',
      fields: [
        { label: 'Ground Level', value: submittedVersion.groundLevelParking },
        { label: 'Basement', value: submittedVersion.basementParking },
        { label: 'Outside', value: submittedVersion.outsideParking },
        { label: 'Visitor', value: submittedVersion.visitorParking },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title} className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                <p className="text-foreground font-medium">{field.value || '—'}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
