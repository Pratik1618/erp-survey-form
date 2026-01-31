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
    { label: 'Built-up Area (sq ft)', value: submittedVersion.builtUpArea },
    { label: 'Total Carpet Area (sq ft)', value: submittedVersion.totalCarpetArea },
    { label: 'Number of Floors', value: submittedVersion.floors },
    { label: 'Work Stations', value: submittedVersion.workStations },
  ],
},
{
  title: 'Capacity & Operations',
  fields: [
    { label: 'Total Employees', value: submittedVersion.totalEmployees },
    { label: 'Office Hours From', value: submittedVersion.officeHoursFrom },
    { label: 'Office Hours To', value: submittedVersion.officeHoursTo },
    { label: 'Staircases', value: submittedVersion.staircases },
    { label: 'Staircase Flooring', value: submittedVersion.staircaseFlooring },
  ],
},
{
  title: 'Common Areas',
  fields: [
    { label: 'Common Area (sq ft)', value: submittedVersion.commonArea },
    { label: 'Common Area Flooring', value: submittedVersion.commonAreaFlooring },
    { label: 'Occupied Area Flooring', value: submittedVersion.occupiedAreaFlooring },
  ],
},
{
  title: 'Facilities',
  fields: [
    { label: 'Gents Toilets', value: submittedVersion.gentToiletsCount },
    { label: 'Ladies Toilets', value: submittedVersion.ladyToiletsCount },
    { label: 'Toiletries Provided', value: submittedVersion.toiletries },
    { label: 'Basements Count', value: submittedVersion.basementsCount },
    { label: 'Basements Used For', value: submittedVersion.basementsUsedFor },
    { label: 'Basements Flooring', value: submittedVersion.basementsFlooring },
  ],
},
{
  title: 'Parking',
  fields: [
    { label: 'Ground Level Parking', value: submittedVersion.groundLevelParking },
    { label: 'Basement Parking', value: submittedVersion.basementParking },
    { label: 'Outside Parking', value: submittedVersion.outsideParking },
    { label: 'Visitor Parking', value: submittedVersion.visitorParking },
  ],
},
{
  title: 'Glass Areas',
  fields: [
    { label: 'Total Façade Glass', value: submittedVersion.totalFacadeGlass },
    { label: 'Total Other Glass', value: submittedVersion.totalOtherGlass },
    { label: 'Electrical Room Location', value: submittedVersion.electricalRoomLocation },
  ],
}
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
