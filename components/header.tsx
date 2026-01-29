'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  currentRole: 'maker' | 'checker';
  onRoleChange: (role: 'maker' | 'checker') => void;
}

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-foreground">
                I SMART FACITECH
              </h1>
              <p className="text-sm text-muted-foreground">
                ERP Survey Form - Maker-Checker Workflow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={currentRole === 'maker' ? 'default' : 'outline'}>
              {currentRole === 'maker' ? '✏️ Maker Mode' : '👁️ Checker Mode'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
