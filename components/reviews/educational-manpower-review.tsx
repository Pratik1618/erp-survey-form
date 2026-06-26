'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ManpowerDeploymentRow {
  id: string;
  designation: string;
  employeesCount: string;
  grossSalary: string;
}

interface EducationalManpowerReviewProps {
  data: Record<string, any>;
}

export function EducationalManpowerReview({ data }: EducationalManpowerReviewProps) {
  const currentManpower = (data.currentManpower || []) as ManpowerDeploymentRow[];
  const suggestedManpower = (data.suggestedManpower || []) as ManpowerDeploymentRow[];

  const renderTable = (rows: ManpowerDeploymentRow[], title: string) => {
    const totalEmployees = rows.reduce((acc, row) => acc + Number(row.employeesCount || 0), 0);

    return (
      <Card className="bg-card border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
        {rows.length === 0 || (rows.length === 1 && !rows[0].designation) ? (
          <p className="text-sm text-muted-foreground">No manpower deployment specified.</p>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-sm font-semibold text-muted-foreground w-1/2">Designation</th>
                    <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-28">No. of Employees</th>
                    <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4 w-32">Gross Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-muted/20">
                      <td className="py-3 text-sm text-foreground">{row.designation || '—'}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-foreground">{row.employeesCount || '—'}</td>
                      <td className="py-3 pl-4 text-sm text-foreground">
                        {row.grossSalary ? `₹${Number(row.grossSalary).toLocaleString()}` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center border-t border-border pt-4 mt-2">
              <span className="text-sm font-medium text-muted-foreground">Total Staff Count</span>
              <span className="text-sm font-bold text-foreground">{totalEmployees}</span>
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {renderTable(currentManpower, 'Current Manpower Deployment')}
      {renderTable(suggestedManpower, 'Suggested Manpower Deployment')}
    </div>
  );
}
