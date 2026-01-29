'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MakerView } from '@/components/maker-view';
import { CheckerView } from '@/components/checker-view';

interface SurveyFormProps {
  currentRole: 'maker' | 'checker';
}

export function SurveyForm({ currentRole }: SurveyFormProps) {
  const [activeTab, setActiveTab] = useState('site-details');

  if (currentRole === 'maker') {
    return <MakerView activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  return <CheckerView activeTab={activeTab} setActiveTab={setActiveTab} />;
}
