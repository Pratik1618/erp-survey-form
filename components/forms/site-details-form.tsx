'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from '@/components/form-context';

export function SiteDetailsForm() {
  const { surveyData, setSurveyData } = useFormContext();

  const handleChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const handleAttachmentChange = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSurveyData({
        ...surveyData,
        clientSupportAttachment: String(reader.result ?? ''),
        clientSupportAttachmentName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const fields = [
    { label: 'Client Name', key: 'clientName' as const, required: true },
    { label: 'Site Name', key: 'siteName' as const, required: true },
    { label: 'Survey ID', key: 'surveyId' as const },
    { label: 'Address', key: 'address' as const, required: true },
    { label: 'Pincode', key: 'pincode' as const, required: true },
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="clientContactPersonName" className="text-foreground font-medium">
              Contact Person Name
            </Label>
            <Input
              id="clientContactPersonName"
              type="text"
              value={surveyData.clientContactPersonName}
              onChange={(e) => handleChange('clientContactPersonName', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter contact person name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="clientContactEmail" className="text-foreground font-medium">
              Contact Email
            </Label>
            <Input
              id="clientContactEmail"
              type="email"
              value={surveyData.clientContactEmail}
              onChange={(e) => handleChange('clientContactEmail', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter contact email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="clientContactMobile" className="text-foreground font-medium">
              Contact Mobile
            </Label>
            <Input
              id="clientContactMobile"
              type="tel"
              value={surveyData.clientContactMobile}
              onChange={(e) => handleChange('clientContactMobile', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter contact mobile"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label htmlFor="clientSupportNotes" className="text-foreground font-medium">
              Supporting Information
            </Label>
            <Textarea
              id="clientSupportNotes"
              value={surveyData.clientSupportNotes}
              onChange={(e) => handleChange('clientSupportNotes', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Add any supporting information or notes"
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label htmlFor="clientSupportAttachment" className="text-foreground font-medium">
              Attach Visiting Card / Supporting File
            </Label>
            <Input
              id="clientSupportAttachment"
              type="file"
              onChange={(event) => handleAttachmentChange(event.target.files?.[0])}
              className="bg-background text-foreground border-border"
            />
            {surveyData.clientSupportAttachmentName ? (
              <p className="text-sm text-muted-foreground">Attached: {surveyData.clientSupportAttachmentName}</p>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
