'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { SectionDefinition } from '@/lib/survey-schemas';

interface DynamicReviewSectionProps {
  section: SectionDefinition;
  data: Record<string, any>;
}

export function DynamicReviewSection({ section, data }: DynamicReviewSectionProps) {
  return (
    <Card className="bg-card border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">{section.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.fields.map((field) => {
          const value = data[field.key];

          if (field.type === 'file') {
            if (!value) return null;
            const fileNameKey = `${field.key}Name`;
            const fileName = String(data[fileNameKey] || 'Attached file');

            return (
              <div key={field.key} className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                {String(value).startsWith('data:image/') ? (
                  <img
                    src={String(value)}
                    alt={fileName}
                    className="max-h-64 rounded-md border border-border object-contain w-full"
                  />
                ) : (
                  <p className="text-foreground font-medium">{fileName}</p>
                )}
              </div>
            );
          }

          return (
            <div key={field.key} className={`flex flex-col gap-2 ${field.className || ''}`}>
              <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
              <p className="text-foreground font-medium">{value || '—'}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
