'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { SectionDefinition } from '@/lib/survey-schemas';
import { DynamicField } from './dynamic-field';

interface DynamicSectionProps {
  section: SectionDefinition;
}

export function DynamicSection({ section }: DynamicSectionProps) {
  return (
    <Card className="bg-card border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">{section.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.fields.map((field) => (
          <DynamicField key={field.key} field={field} />
        ))}
      </div>
    </Card>
  );
}
