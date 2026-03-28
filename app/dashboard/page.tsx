'use client';

import React, { useState } from 'react';
import { FormProvider } from '@/components/form-context';
import { Header } from '@/components/header';
import { RoleSelector } from '@/components/role-selector';
import { MakerStepper } from '@/components/maker-stepper';
import { CheckerTable } from '@/components/checker-table';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<'maker' | 'checker'>('maker');

  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        <div className="container mx-auto py-8 px-4">
          <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />
          {currentRole === 'maker' ? (
            <MakerStepper />
          ) : (
            <CheckerTable />
          )}
        </div>
      </div>
    </FormProvider>
  );
}
