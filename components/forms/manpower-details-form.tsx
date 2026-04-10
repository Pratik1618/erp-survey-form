'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormContext, ManpowerRow } from '@/components/form-context';
import { Trash2, Plus } from 'lucide-react';

const MANPOWER_COUNT_FIELDS: Array<keyof ManpowerRow> = [
  'shift1Count',
  'shift2Count',
  'shift3Count',
  'generalShiftCount',
];

function calculateTotalManpower(row: ManpowerRow): number {
  return MANPOWER_COUNT_FIELDS.reduce((total, field) => {
    const count = Number(row[field] || 0);
    return total + (Number.isNaN(count) ? 0 : count);
  }, 0);
}

export function ManpowerDetailsForm() {
  const { manpowerData, setManpowerData } = useFormContext();
  const grandTotalManpower = manpowerData.reduce((total, row) => {
    const rowTotal = Number(row.totalManpower || 0);
    return total + (Number.isNaN(rowTotal) ? 0 : rowTotal);
  }, 0);

  const handleChange = (index: number, field: keyof ManpowerRow, value: string) => {
    const updated = [...manpowerData];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updated[index].totalManpower = calculateTotalManpower(updated[index]);

    setManpowerData(updated);
  };

  const handleAddRow = () => {
    const newRow: ManpowerRow = {
      id: Date.now().toString(),
      serviceType: '',
      manpowerName: '',
      expectedSalary: '',
      shift1Count: '',
      shift1StartTime: '',
      shift1EndTime: '',
      shift2Count: '',
      shift2StartTime: '',
      shift2EndTime: '',
      shift3Count: '',
      shift3StartTime: '',
      shift3EndTime: '',
      generalShiftCount: '',
      generalShiftStartTime: '',
      generalShiftEndTime: '',
      totalManpower: 0,
    };
    setManpowerData([...manpowerData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setManpowerData(manpowerData.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Manpower Details With Shift-Time & Count
          </h2>
          <Button
            onClick={handleAddRow}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>

        <div className="space-y-6">
          {manpowerData.map((row, index) => (
            <div key={row.id} className="border border-border rounded-lg p-6 bg-background">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Entry {index + 1}</h3>
                {manpowerData.length > 1 && (
                  <Button
                    onClick={() => handleDeleteRow(index)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`service-type-${index}`} className="text-foreground font-medium text-sm">
                    Service Type
                  </Label>
                  <Input
                    id={`service-type-${index}`}
                    value={row.serviceType}
                    onChange={(e) => handleChange(index, 'serviceType', e.target.value)}
                    className="bg-card text-foreground border-border text-sm"
                    placeholder="e.g., Housekeeping"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`manpower-name-${index}`} className="text-foreground font-medium text-sm">
                    Manpower Name
                  </Label>
                  <Input
                    id={`manpower-name-${index}`}
                    value={row.manpowerName}
                    onChange={(e) => handleChange(index, 'manpowerName', e.target.value)}
                    className="bg-card text-foreground border-border text-sm"
                    placeholder="e.g., Housekeeper"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`expected-salary-${index}`} className="text-foreground font-medium text-sm">
                    Expected Salary
                  </Label>
                  <Input
                    id={`expected-salary-${index}`}
                    type="number"
                    value={row.expectedSalary}
                    onChange={(e) => handleChange(index, 'expectedSalary', e.target.value)}
                    className="bg-card text-foreground border-border text-sm"
                    placeholder="e.g., 18000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-sm">Shift 1</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Count</Label>
                      <Input
                        type="number"
                        value={row.shift1Count}
                        onChange={(e) => handleChange(index, 'shift1Count', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Start Time</Label>
                      <Input
                        type="time"
                        value={row.shift1StartTime}
                        onChange={(e) => handleChange(index, 'shift1StartTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={row.shift1EndTime}
                        onChange={(e) => handleChange(index, 'shift1EndTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-sm">Shift 2</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Count</Label>
                      <Input
                        type="number"
                        value={row.shift2Count}
                        onChange={(e) => handleChange(index, 'shift2Count', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Start Time</Label>
                      <Input
                        type="time"
                        value={row.shift2StartTime}
                        onChange={(e) => handleChange(index, 'shift2StartTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={row.shift2EndTime}
                        onChange={(e) => handleChange(index, 'shift2EndTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-sm">Shift 3</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Count</Label>
                      <Input
                        type="number"
                        value={row.shift3Count}
                        onChange={(e) => handleChange(index, 'shift3Count', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Start Time</Label>
                      <Input
                        type="time"
                        value={row.shift3StartTime}
                        onChange={(e) => handleChange(index, 'shift3StartTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={row.shift3EndTime}
                        onChange={(e) => handleChange(index, 'shift3EndTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-sm">General Shift</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">General Shift Count</Label>
                      <Input
                        type="number"
                        value={row.generalShiftCount}
                        onChange={(e) => handleChange(index, 'generalShiftCount', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Start Time</Label>
                      <Input
                        type="time"
                        value={row.generalShiftStartTime}
                        onChange={(e) => handleChange(index, 'generalShiftStartTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={row.generalShiftEndTime}
                        onChange={(e) => handleChange(index, 'generalShiftEndTime', e.target.value)}
                        className="bg-card text-foreground border-border text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <Label className="text-foreground font-medium text-sm">Total Manpower</Label>
                      <Input
                        type="number"
                        value={row.totalManpower}
                        className="bg-card text-foreground border-border text-sm"
                        placeholder="0"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <div className="flex justify-end">
            <div className="w-full max-w-xs flex flex-col gap-2">
              <Label className="text-foreground font-medium text-sm">Grand Total Manpower</Label>
              <Input
                type="number"
                value={grandTotalManpower}
                className="bg-card text-foreground border-border text-sm font-semibold"
                readOnly
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
