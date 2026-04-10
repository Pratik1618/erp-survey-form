import React from 'react';
import { cookies } from 'next/headers';
import { FormProvider } from '@/components/form-context';
import { DashboardClient } from '@/components/dashboard-client';

export default async function Home() {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get('role')?.value;
  const currentRole: 'maker' | 'checker' =
    roleCookie === 'checker' || roleCookie === 'approver' ? 'checker' : 'maker';

  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <DashboardClient currentRole={currentRole} />
      </div>
    </FormProvider>
  );
}
