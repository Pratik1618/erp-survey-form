'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext, type SurveyData } from '@/components/form-context';
import { FieldDefinition } from '@/lib/survey-schemas';

interface DynamicFieldProps {
  field: FieldDefinition;
}

export function DynamicField({ field }: DynamicFieldProps) {
  const { surveyData, setSurveyData } = useFormContext();

  // Type-safe key cast to ensure compatibility with SurveyData keys
  const dataKey = field.key as keyof SurveyData;

  const handleValueChange = (value: string) => {
    setSurveyData({
      ...surveyData,
      [dataKey]: value,
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
        [dataKey]: String(reader.result ?? ''),
        // Store filename in the [key]Name field following our naming convention
        [`${field.key}Name` as keyof SurveyData]: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const renderInput = () => {
    const value = String(surveyData[dataKey] ?? '');

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.key}
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="bg-background text-foreground border-border min-h-[100px]"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={handleValueChange}>
            <SelectTrigger className="bg-background text-foreground border-border w-full">
              <SelectValue placeholder={field.placeholder || 'Select option'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'file':
        const fileNameKey = `${field.key}Name` as keyof SurveyData;
        const attachedName = String(surveyData[fileNameKey] ?? '');
        return (
          <div className="space-y-2">
            <Input
              id={field.key}
              type="file"
              accept={field.accept}
              onChange={(e) => handleAttachmentChange(e.target.files?.[0])}
              className="bg-background text-foreground border-border w-full cursor-pointer"
            />
            {attachedName ? (
              <p className="text-xs text-muted-foreground">
                Attached file: <span className="font-semibold text-foreground">{attachedName}</span>
              </p>
            ) : null}
          </div>
        );

      default:
        // Handles text, number, email, tel, date, time
        return (
          <Input
            id={field.key}
            type={field.type}
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="bg-background text-foreground border-border w-full"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${field.className || ''}`}>
      <Label htmlFor={field.key} className="text-foreground font-medium text-sm">
        {field.label}
        {field.required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
}
