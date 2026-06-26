'use client';

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form-context';
import { Plus, Trash2 } from 'lucide-react';

interface ManpowerDeploymentRow {
  id: string;
  designation: string;
  employeesCount: string;
  grossSalary: string;
}

export function EducationalManpowerForm() {
  const { surveyData, setSurveyData } = useFormContext();

  // Initialize arrays in surveyData if not present
  useEffect(() => {
    const updates: Record<string, any> = {};
    let needsUpdate = false;

    if (!surveyData.currentManpower || surveyData.currentManpower.length === 0) {
      updates.currentManpower = [{ id: '1', designation: '', employeesCount: '', grossSalary: '' }];
      needsUpdate = true;
    }

    if (!surveyData.suggestedManpower || surveyData.suggestedManpower.length === 0) {
      updates.suggestedManpower = [{ id: '1', designation: '', employeesCount: '', grossSalary: '' }];
      needsUpdate = true;
    }

    if (needsUpdate) {
      setSurveyData({
        ...surveyData,
        ...updates,
      });
    }
  }, [surveyData, setSurveyData]);

  const currentManpower = (surveyData.currentManpower || []) as ManpowerDeploymentRow[];
  const suggestedManpower = (surveyData.suggestedManpower || []) as ManpowerDeploymentRow[];

  const handleRowChange = (
    type: 'currentManpower' | 'suggestedManpower',
    index: number,
    field: 'designation' | 'employeesCount' | 'grossSalary',
    value: string
  ) => {
    const list = [...(surveyData[type] || [])] as ManpowerDeploymentRow[];
    list[index] = {
      ...list[index],
      [field]: value,
    };

    setSurveyData({
      ...surveyData,
      [type]: list,
    });
  };

  const handleAddRow = (type: 'currentManpower' | 'suggestedManpower') => {
    const list = [...(surveyData[type] || [])] as ManpowerDeploymentRow[];
    list.push({
      id: Date.now().toString(),
      designation: '',
      employeesCount: '',
      grossSalary: '',
    });

    setSurveyData({
      ...surveyData,
      [type]: list,
    });
  };

  const handleDeleteRow = (type: 'currentManpower' | 'suggestedManpower', index: number) => {
    const list = [...(surveyData[type] || [])] as ManpowerDeploymentRow[];
    const filtered = list.filter((_, i) => i !== index);

    setSurveyData({
      ...surveyData,
      [type]: filtered,
    });
  };

  const renderTable = (type: 'currentManpower' | 'suggestedManpower', title: string) => {
    const rows = (surveyData[type] || []) as ManpowerDeploymentRow[];

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
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-sm font-semibold text-muted-foreground w-1/2">Designation</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-28">No. of Employees</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground px-4 w-32">Gross Salary</th>
                <th className="pb-3 text-sm font-semibold text-muted-foreground pl-4 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-muted/20">
                  <td className="py-3">
                    <Input
                      type="text"
                      value={row.designation || ''}
                      placeholder="e.g., Housekeeper / Supervisor"
                      onChange={(e) => handleRowChange(type, index, 'designation', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm w-full"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      value={row.employeesCount || ''}
                      placeholder="e.g., 5"
                      onChange={(e) => handleRowChange(type, index, 'employeesCount', e.target.value)}
                      className="bg-background text-foreground border-border h-9 text-sm w-full"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      value={row.grossSalary || ''}
                      placeholder="e.g., 18500"
                      onChange={(e) => handleRowChange(type, index, 'grossSalary', e.target.value)}
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
      {renderTable('currentManpower', 'Current Manpower Deployment')}
      {renderTable('suggestedManpower', 'Suggested Manpower Deployment')}
    </div>
  );
}
