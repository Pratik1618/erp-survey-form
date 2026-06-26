'use client';

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from '@/components/form-context';

const CLEANABLE_ROWS = [
  'Carpeted Area: ',
  'Marble:',
  'Vinyl:',
  'Tiles :',
  'Granite flooring',
  'Wooden: Flooring',
  'Epoxy:',
  'common area (Stairs, Passage, lobbies, balconies. Etc)',
  'Basement Area including Parking:',
  'Utility Area',
  'External Area(Excluding Landscaping area): (Sft & Type of Surface)',
  'External Roads: (length x width & Type of Surface)',
];

// Additional services removed and migrated to Step 3 schema

export function CleanableAreasForm() {
  const { surveyData, setSurveyData } = useFormContext();

  // Initialize cleanableAreas and additionalServices in surveyData if not present
  useEffect(() => {
    const updates: Record<string, any> = {};
    let needsUpdate = false;

    if (!surveyData.cleanableAreas) {
      updates.cleanableAreas = CLEANABLE_ROWS.reduce<Record<string, any>>((acc, row) => {
        acc[row] = { yesNo: '', area: '', remarks: '' };
        return acc;
      }, {});
      needsUpdate = true;
    }



    if (needsUpdate) {
      setSurveyData({
        ...surveyData,
        ...updates,
      });
    }
  }, [surveyData, setSurveyData]);


  const cleanableAreas = surveyData.cleanableAreas || {};

  // Automatically calculate Total Area Under Scope (sum of C25:C36)
  useEffect(() => {
    if (!surveyData.cleanableAreas) {
      return;
    }

    let total = 0;
    Object.values(surveyData.cleanableAreas).forEach((val: any) => {
      if (val && val.yesNo === 'yes' && val.area) {
        const cleanStr = String(val.area).replace(/,/g, '').trim();
        const num = parseFloat(cleanStr);
        if (!isNaN(num)) {
          total += num;
        }
      }
    });

    const totalStr = total > 0 ? String(total) : '';
    if (surveyData.totalAreaUnderScope !== totalStr) {
      setSurveyData((prev: any) => ({
        ...prev,
        totalAreaUnderScope: totalStr,
      }));
    }
  }, [surveyData.cleanableAreas, surveyData.totalAreaUnderScope, setSurveyData]);

  const handleCleanableChange = (row: string, field: 'yesNo' | 'area' | 'remarks', value: string) => {
    const updatedAreas = {
      ...cleanableAreas,
      [row]: {
        ...(cleanableAreas[row] || { yesNo: '', area: '', remarks: '' }),
        [field]: value,
      },
    };

    if (field === 'yesNo' && value === 'no') {
      updatedAreas[row].area = '';
    }

    setSurveyData({
      ...surveyData,
      cleanableAreas: updatedAreas,
    });
  };

  return (
    <div className="space-y-8">
      {/* Cleanable Area Details Table */}
      <Card className="bg-card border-border p-6 overflow-x-auto shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cleanable Area Details</h3>
        <p className="text-xs text-muted-foreground mb-6">Specify the cleanable flooring types and areas under scope.</p>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 text-sm font-semibold text-muted-foreground w-1/3">Area Flooring Type</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-28">Yes / No</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-36">Area (Sq. Ft.)</th>
              <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {CLEANABLE_ROWS.map((row) => {
              const rowData = cleanableAreas[row] || { yesNo: '', area: '', remarks: '' };
              return (
                <tr key={row} className="hover:bg-muted/20">
                  <td className="py-3 text-sm font-medium text-foreground">{row}</td>
                  <td className="py-3 px-4">
                    <Select
                      value={rowData.yesNo || ''}
                      onValueChange={(value) => handleCleanableChange(row, 'yesNo', value)}
                    >
                      <SelectTrigger className="bg-background text-foreground border-border h-9 w-20">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      value={rowData.area || ''}
                      placeholder="e.g. 5000"
                      onChange={(e) => handleCleanableChange(row, 'area', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm"
                      disabled={rowData.yesNo !== 'yes'}
                    />
                  </td>
                  <td className="py-3 pl-4">
                    <Input
                      type="text"
                      value={rowData.remarks || ''}
                      placeholder="Add flooring details..."
                      onChange={(e) => handleCleanableChange(row, 'remarks', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Cleanable Area Summaries */}
        <div className="mt-6 border-t border-border pt-6 max-w-md">
          <div className="flex flex-col gap-2">
            <Label htmlFor="totalAreaUnderScope" className="text-foreground font-medium text-sm">
              Total  Area Under Scope : (sum of rows 25 to 36)
            </Label>
            <Input
              id="totalAreaUnderScope"
              type="text"
              placeholder="Calculated automatically..."
              value={surveyData.totalAreaUnderScope || ''}
              readOnly
              className="bg-slate-50 text-slate-500 border-border h-10 cursor-not-allowed font-semibold"
            />
          </div>
        </div>
      </Card>


    </div>
  );
}
