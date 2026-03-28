'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';

interface RoleSelectorProps {
  currentRole: 'maker' | 'checker';
}

export function RoleSelector({ currentRole }: RoleSelectorProps) {
  const { approvalStatus } = useFormContext();

  return (
    <Card className="mb-8 bg-card border-border p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground">
            {currentRole === 'maker' ? 'Maker Mode' : 'Checker Mode'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentRole === 'maker'
              ? 'Edit and submit the survey form'
              : `Review and approve submissions${
                  approvalStatus !== 'pending' ? ` (${approvalStatus})` : ''
                }`}
          </p>
        </div>
        <span className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Active
        </span>
      </div>
    </Card>
  );
}
