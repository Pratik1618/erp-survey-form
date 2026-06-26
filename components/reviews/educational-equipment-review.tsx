'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface EquipmentRow {
  id: string;
  description: string;
  quantity: string;
}

interface EducationalEquipmentReviewProps {
  data: Record<string, any>;
}

export function EducationalEquipmentReview({ data }: EducationalEquipmentReviewProps) {
  const currentEquipment = (data.currentEquipment || []) as EquipmentRow[];
  const suggestedEquipment = (data.suggestedEquipment || []) as EquipmentRow[];

  const renderTable = (rows: EquipmentRow[], title: string) => {
    return (
      <Card className="bg-card border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
        {rows.length === 0 || (rows.length === 1 && !rows[0].description) ? (
          <p className="text-sm text-muted-foreground">No equipment deployment specified.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-semibold text-muted-foreground w-3/4">Description</th>
                  <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4 w-28">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/20">
                    <td className="py-3 text-sm text-foreground">{row.description || '—'}</td>
                    <td className="py-3 pl-4 text-sm font-semibold text-foreground">{row.quantity || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {renderTable(currentEquipment, 'Current Cleaning Equipment')}
      {renderTable(suggestedEquipment, 'Suggested Cleaning Equipment')}
    </div>
  );
}
