'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { MakerDashboard } from '@/components/maker-dashboard';
import { CheckerTable } from '@/components/checker-table';

interface DashboardClientProps {
  currentRole: 'maker' | 'checker';
}

export function DashboardClient({ currentRole }: DashboardClientProps) {
  const [headerActions, setHeaderActions] = useState<React.ReactNode | null>(null);

  return (
    <>
      <Header currentRole={currentRole} actions={headerActions} />
      <div className="container mx-auto py-8 px-4">
        {currentRole === 'maker' ? (
          <MakerDashboard onHeaderActionsChange={setHeaderActions} />
        ) : (
          <CheckerTable />
        )}
      </div>
    </>
  );
}
