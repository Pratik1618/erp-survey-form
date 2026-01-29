'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form-context';

interface RoleSelectorProps {
  currentRole: 'maker' | 'checker';
  onRoleChange: (role: 'maker' | 'checker') => void;
}

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const { approvalStatus } = useFormContext();

  return (
    <Card className="mb-8 bg-card border-border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Maker Mode</h3>
            <p className="text-sm text-muted-foreground">
              Edit and submit the survey form
            </p>
          </div>
          <Button
            onClick={() => onRoleChange('maker')}
            variant={currentRole === 'maker' ? 'default' : 'outline'}
            className={currentRole === 'maker' ? 'bg-primary' : ''}
          >
            {currentRole === 'maker' ? '✓ Active' : 'Switch'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Checker Mode</h3>
            <p className="text-sm text-muted-foreground">
              Review and approve submissions {approvalStatus !== 'pending' && `(${approvalStatus})`}
            </p>
          </div>
          <Button
            onClick={() => onRoleChange('checker')}
            variant={currentRole === 'checker' ? 'default' : 'outline'}
            className={currentRole === 'checker' ? 'bg-primary' : ''}
          >
            {currentRole === 'checker' ? '✓ Active' : 'Switch'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
