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
    { label: 'Contact Person', value: submittedVersion.clientContactPersonName },
    { label: 'Contact Email', value: submittedVersion.clientContactEmail },
    { label: 'Contact Mobile', value: submittedVersion.clientContactMobile },
    { label: 'Survey ID', value: submittedVersion.surveyId },
    { label: 'Address', value: submittedVersion.address },
    { label: 'Pincode', value: submittedVersion.pincode },
    { label: 'Survey Date', value: submittedVersion.surveyDate },
    { label: 'Supporting Information', value: submittedVersion.clientSupportNotes },
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
        {submittedVersion.clientSupportAttachment ? (
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Attached Support File</label>
            {submittedVersion.clientSupportAttachment.startsWith('data:image/') ? (
              <img
                src={submittedVersion.clientSupportAttachment}
                alt={submittedVersion.clientSupportAttachmentName || 'Attached file'}
                className="max-h-64 w-full rounded-md border border-border object-contain"
              />
            ) : (
              <p className="text-foreground font-medium">
                {submittedVersion.clientSupportAttachmentName || 'Attached file'}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
