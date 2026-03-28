import React from 'react';
import { cookies } from 'next/headers';
import { FormProvider } from '@/components/form-context';
import { Header } from '@/components/header';
import { MakerStepper } from '@/components/maker-stepper';
import { CheckerTable } from '@/components/checker-table';

export default async function Home() {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get('role')?.value;
  const currentRole: 'maker' | 'checker' =
    roleCookie === 'checker' || roleCookie === 'approver' ? 'checker' : 'maker';

  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <Header currentRole={currentRole} />
        <div className="container mx-auto py-8 px-4">
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
