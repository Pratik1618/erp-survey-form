'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/components/form-context';

export function BuildingDetailsForm() {
  const { surveyData, setSurveyData } = useFormContext();

  const handleChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const sections = [
    {
      title: 'Plot Area',
      fields: [
        { label: 'Built-up Area (sq ft)', key: 'builtUpArea' as const },
        { label: 'Total Carpet Area (sq ft)', key: 'totalCarpetArea' as const },
        { label: 'Number of Floors', key: 'floors' as const },
        { label: 'Work Stations', key: 'workStations' as const },
      ],
    },
    {
      title: 'Capacity & Operations',
      fields: [
        { label: 'Total Employees', key: 'totalEmployees' as const },
        { label: 'Office Hours', key: 'officeHours' as const },
        { label: 'Staircases', key: 'staircases' as const },
        { label: 'Staircase Flooring', key: 'staircaseFlooring' as const },
      ],
    },
    {
      title: 'Common Areas',
      fields: [
        { label: 'Common Area (sq ft)', key: 'commonArea' as const },
        { label: 'Common Area Flooring', key: 'commonAreaFlooring' as const },
        { label: 'Occupied Area Flooring', key: 'occupiedAreaFlooring' as const },
      ],
    },
    {
      title: 'Facilities',
      fields: [
        { label: 'Gents Toilets', key: 'gentToiletsCount' as const },
        { label: 'Ladies Toilets', key: 'ladyToiletsCount' as const },
        { label: 'Toiletries Provided', key: 'toiletries' as const },
        { label: 'Basements Count', key: 'basementsCount' as const },
        { label: 'Basements Used For', key: 'basementsUsedFor' as const },
        { label: 'Basements Flooring', key: 'basementsFlooring' as const },
      ],
    },
    {
      title: 'Parking',
      fields: [
        { label: 'Ground Level Parking', key: 'groundLevelParking' as const },
        { label: 'Basement Parking', key: 'basementParking' as const },
        { label: 'Outside Parking', key: 'outsideParking' as const },
        { label: 'Visitor Parking', key: 'visitorParking' as const },
      ],
    },
    {
      title: 'Glass Areas',
      fields: [
        { label: 'Total Façade Glass', key: 'totalFacadeGlass' as const },
        { label: 'Total Other Glass', key: 'totalOtherGlass' as const },
        { label: 'Electrical Room Location', key: 'electricalRoomLocation' as const },
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
              <div key={field.key} className="flex flex-col gap-2">
                <Label htmlFor={field.key} className="text-foreground font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  type="text"
                  value={surveyData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="bg-background text-foreground border-border"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
