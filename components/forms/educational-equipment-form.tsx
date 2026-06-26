'use client';

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form-context';
import { Plus, Trash2 } from 'lucide-react';

interface EquipmentRow {
  id: string;
  description: string;
  quantity: string;
}

export function EducationalEquipmentForm() {
  const { surveyData, setSurveyData } = useFormContext();

  // Initialize arrays in surveyData if not present
  useEffect(() => {
    const updates: Record<string, any> = {};
    let needsUpdate = false;

    if (!surveyData.currentEquipment || surveyData.currentEquipment.length === 0) {
      updates.currentEquipment = [{ id: '1', description: '', quantity: '' }];
      needsUpdate = true;
    }

    if (!surveyData.suggestedEquipment || surveyData.suggestedEquipment.length === 0) {
      updates.suggestedEquipment = [{ id: '1', description: '', quantity: '' }];
      needsUpdate = true;
    }

    if (needsUpdate) {
      setSurveyData({
        ...surveyData,
        ...updates,
      });
    }
  }, [surveyData, setSurveyData]);

  const currentEquipment = (surveyData.currentEquipment || []) as EquipmentRow[];
  const suggestedEquipment = (surveyData.suggestedEquipment || []) as EquipmentRow[];

  const handleRowChange = (
    type: 'currentEquipment' | 'suggestedEquipment',
    index: number,
    field: 'description' | 'quantity',
    value: string
  ) => {
    const list = [...(surveyData[type] || [])] as EquipmentRow[];
    list[index] = {
      ...list[index],
      [field]: value,
    };

    setSurveyData({
      ...surveyData,
      [type]: list,
    });
  };

  const handleAddRow = (type: 'currentEquipment' | 'suggestedEquipment') => {
    const list = [...(surveyData[type] || [])] as EquipmentRow[];
    list.push({
      id: Date.now().toString(),
      description: '',
      quantity: '',
    });

    setSurveyData({
      ...surveyData,
      [type]: list,
    });
  };

  const handleDeleteRow = (type: 'currentEquipment' | 'suggestedEquipment', index: number) => {
    const list = [...(surveyData[type] || [])] as EquipmentRow[];
    const filtered = list.filter((_, i) => i !== index);

    setSurveyData({
      ...surveyData,
      [type]: filtered,
    });
  };

  const renderTable = (type: 'currentEquipment' | 'suggestedEquipment', title: string) => {
    const rows = (surveyData[type] || []) as EquipmentRow[];

    return (
      <Card className="bg-card border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Button
            onClick={() => handleAddRow(type)}
            size="sm"
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 h-9"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-sm font-semibold text-muted-foreground w-3/4">Description</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-28">Quantity</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-muted/20">
                  <td className="py-3">
                    <Input
                      type="text"
                      value={row.description || ''}
                      placeholder="e.g., Single Disc Scrubbing Machine"
                      onChange={(e) => handleRowChange(type, index, 'description', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm w-full"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      value={row.quantity || ''}
                      placeholder="e.g., 2"
                      onChange={(e) => handleRowChange(type, index, 'quantity', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm w-full"
                    />
                  </td>
                  <td className="py-3 pl-4 text-center">
                    {rows.length > 1 && (
                      <Button
                        onClick={() => handleDeleteRow(type, index)}
                        size="sm"
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white h-9 w-9 p-0 flex items-center justify-center rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {renderTable('currentEquipment', 'Current Cleaning Equipment')}
      {renderTable('suggestedEquipment', 'Suggested Cleaning Equipment')}
    </div>
  );
}
