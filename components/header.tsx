'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentRole: 'maker' | 'checker';
}

export function Header({ currentRole }: HeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      router.replace('/login');
      router.refresh();
    }
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-foreground">I SMART FACITECH</h1>
              <p className="text-sm text-muted-foreground">ERP Survey Form</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={currentRole === 'maker' ? 'default' : 'outline'}>
              {currentRole === 'maker' ? 'Maker Mode' : 'Checker Mode'}
            </Badge>
            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
