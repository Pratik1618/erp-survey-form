'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface GuestAmenitiesReviewProps {
  data: Record<string, any>;
}

export function GuestAmenitiesReview({ data }: GuestAmenitiesReviewProps) {
  const amenities = data.guestAmenities || [];

  if (amenities.length === 0) {
    return (
      <Card className="bg-card border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-2">Guest Amenities</h3>
        <p className="text-sm text-muted-foreground">No guest amenities specified.</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border p-6 overflow-x-auto shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Guest Amenities Details</h3>
      <p className="text-xs text-muted-foreground mb-6">Review guest amenities and their quantities under scope.</p>
      <table className="w-full min-w-[400px] border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 text-sm font-semibold text-muted-foreground w-12">#</th>
            <th className="pb-3 text-sm font-semibold text-muted-foreground w-2/3">Details (Description)</th>
            <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4">Quantity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {amenities.map((item: any, index: number) => (
            <tr key={item.id || String(index)} className="hover:bg-muted/10">
              <td className="py-3 text-sm font-medium text-muted-foreground">{index + 1}</td>
              <td className="py-3 pr-4 text-sm text-foreground font-medium">{item.details || '—'}</td>
              <td className="py-3 pl-4 text-sm text-foreground font-semibold">{item.quantity || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
