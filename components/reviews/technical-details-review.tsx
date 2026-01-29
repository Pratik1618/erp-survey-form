'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';

export function TechnicalDetailsReview() {
  const { submittedVersion } = useFormContext();

  if (!submittedVersion) return null;

  const sections = [
    {
      title: 'Electrical Details',
      fields: [
        { label: 'SEB Load', value: submittedVersion.sebLoad },
        { label: 'Generator Capacity', value: submittedVersion.generatorCapacity },
        { label: 'Generator Brand', value: submittedVersion.generatorBrand },
        { label: 'DG Operating Hours', value: submittedVersion.dgOperatingHours },
        { label: 'Fuel Used', value: submittedVersion.fuelUsed },
        { label: 'Fuel Storage Capacity', value: submittedVersion.fuelStorageCapacity },
      ],
    },
    {
      title: 'HVAC System',
      fields: [
        { label: 'AC Type', value: submittedVersion.acType },
        { label: 'Plant Capacity', value: submittedVersion.acPlantCapacity },
        { label: 'Operating Hours', value: submittedVersion.acOperatingHours },
        { label: 'Design Temperature', value: submittedVersion.designTemp },
        { label: 'Supplied By', value: submittedVersion.acSuppliedBy },
      ],
    },
    {
      title: 'Fire Safety',
      fields: [
        { label: 'Sprinkler System', value: submittedVersion.sprinklerSystem },
        { label: 'Smoke Detection', value: submittedVersion.smokeDetection },
        { label: 'Fire Alarm Panel', value: submittedVersion.fireAlarmPanel },
        { label: 'Tank Capacity', value: submittedVersion.fireTankCapacity },
      ],
    },
    {
      title: 'Water Management',
      fields: [
        { label: 'Water Source', value: submittedVersion.waterSource },
        { label: 'Storage Tanks', value: submittedVersion.waterStorageTanks },
        { label: 'Softener Capacity', value: submittedVersion.waterSoftenerCapacity },
        { label: 'RO Plant Capacity', value: submittedVersion.roPlantCapacity },
        { label: 'STP Capacity', value: submittedVersion.stpCapacity },
      ],
    },
    {
      title: 'Security',
      fields: [
        { label: 'CCTV Cameras', value: submittedVersion.cctvCameras },
        { label: 'Manned Security Desk', value: submittedVersion.mannedSecurityDesk },
        { label: 'Door Alarm', value: submittedVersion.touchDoorAlarm },
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

      {submittedVersion.remarks && (
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Remarks</h3>
          <p className="text-foreground whitespace-pre-wrap">{submittedVersion.remarks}</p>
        </Card>
      )}
    </div>
  );
}
