'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/components/form-context';
import { Plus, Trash2 } from 'lucide-react';

export function GuestAmenitiesForm() {
  const { surveyData, setSurveyData } = useFormContext();

  // Initialize guestAmenities list in surveyData if not present
  useEffect(() => {
    if (!surveyData.guestAmenities || surveyData.guestAmenities.length === 0) {
      setSurveyData({
        ...surveyData,
        guestAmenities: [{ id: '1', details: '', quantity: '' }],
      });
    }
  }, [surveyData, setSurveyData]);

  const amenities = surveyData.guestAmenities || [];

  const handleRowChange = (id: string, field: 'details' | 'quantity', value: string) => {
    const updated = amenities.map((item: any) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setSurveyData({
      ...surveyData,
      guestAmenities: updated,
    });
  };

  const handleAddRow = () => {
    const newId = String(
      amenities.reduce((max: number, item: any) => Math.max(max, Number(item.id || 0)), 0) + 1
    );
    setSurveyData({
      ...surveyData,
      guestAmenities: [...amenities, { id: newId, details: '', quantity: '' }],
    });
  };

  const handleDeleteRow = (id: string) => {
    // Keep at least one row
    if (amenities.length <= 1) {
      setSurveyData({
        ...surveyData,
        guestAmenities: [{ id: '1', details: '', quantity: '' }],
      });
      return;
    }

    const updated = amenities.filter((item: any) => item.id !== id);
    setSurveyData({
      ...surveyData,
      guestAmenities: updated,
    });
  };

  return (
    <Card className="bg-card border-border p-6 overflow-x-auto shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Guest Amenities</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Specify the guest amenities to be provided at the guest house and their quantities.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleAddRow}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm font-medium w-fit h-9"
        >
          <Plus className="w-4 h-4" />
          Add Amenity
        </Button>
      </div>

      <table className="w-full min-w-[500px] border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 text-sm font-semibold text-muted-foreground w-8">#</th>
            <th className="pb-3 text-sm font-semibold text-muted-foreground w-2/3">Details (Description)</th>
            <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-40">Quantity</th>
            <th className="pb-3 text-sm font-semibold text-muted-foreground w-12 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {amenities.map((item: any, index: number) => (
            <tr key={item.id} className="hover:bg-muted/10">
              <td className="py-3 text-sm font-medium text-muted-foreground">{index + 1}</td>
              <td className="py-3 pr-4">
                <Input
                  type="text"
                  value={item.details || ''}
                  placeholder="e.g. Toothbrush, Soap, Bath Towel..."
                  onChange={(e) => handleRowChange(item.id, 'details', e.target.value)}
                  className="bg-background text-foreground border-border h-9 text-sm"
                />
              </td>
              <td className="py-3 px-4">
                <Input
                  type="text"
                  value={item.quantity || ''}
                  placeholder="e.g. 2 per room"
                  onChange={(e) => handleRowChange(item.id, 'quantity', e.target.value)}
                  className="bg-background text-foreground border-border h-9 text-sm"
                />
              </td>
              <td className="py-3 text-right">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteRow(item.id)}
                  className="text-destructive hover:bg-red-50 hover:text-red-700 h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
