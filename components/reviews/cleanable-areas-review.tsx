'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface CleanableAreasReviewProps {
  data: Record<string, any>;
}

export function CleanableAreasReview({ data }: CleanableAreasReviewProps) {
  const cleanableAreas = data.cleanableAreas || {};

  return (
    <div className="space-y-8">
      {/* Cleanable Area Details */}
      <Card className="bg-card border-border p-6 overflow-x-auto shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">Cleanable Area Details</h3>
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 text-sm font-semibold text-muted-foreground w-1/3">Area Flooring Type</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-24">Included</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-36">Area (Sq. Ft.)</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Object.entries(cleanableAreas).map(([row, rowData]: [string, any]) => (
              <tr key={row} className="hover:bg-muted/10">
                <td className="py-3 text-sm font-medium text-foreground">{row}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    rowData.yesNo === 'yes' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {rowData.yesNo === 'yes' ? 'Yes' : rowData.yesNo === 'no' ? 'No' : '—'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-foreground font-semibold">
                  {rowData.area ? `${Number(rowData.area).toLocaleString()} sq ft` : '—'}
                </td>
                <td className="py-3 pl-4 text-sm text-muted-foreground">{rowData.remarks || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cleanable Area Summaries */}
        <div className="mt-6 border-t border-border pt-6 max-w-md">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Total  Area Under Scope : (sum of rows 25 to 36)</label>
            <p className="text-sm font-semibold text-foreground">
              {data.totalAreaUnderScope || '—'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
