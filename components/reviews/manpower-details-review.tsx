'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EMPTY_VALUE = '-';

export function ManpowerDetailsReview() {
  const { submittedManpower } = useFormContext();

  if (!submittedManpower || submittedManpower.length === 0) {
    return null;
  }

  const grandTotalManpower = submittedManpower.reduce((total, row) => {
    const rowTotal = Number(row.totalManpower || 0);
    return total + (Number.isNaN(rowTotal) ? 0 : rowTotal);
  }, 0);

  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Manpower Details With Shift-Time & Count
      </h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground">Service Type</TableHead>
              <TableHead className="text-foreground">Manpower Name</TableHead>
              <TableHead className="text-foreground">Expected Salary</TableHead>
              <TableHead className="text-foreground">Shift 1 (Count)</TableHead>
              <TableHead className="text-foreground">Shift 1 (Time)</TableHead>
              <TableHead className="text-foreground">Shift 2 (Count)</TableHead>
              <TableHead className="text-foreground">Shift 2 (Time)</TableHead>
              <TableHead className="text-foreground">Shift 3 (Count)</TableHead>
              <TableHead className="text-foreground">Shift 3 (Time)</TableHead>
              <TableHead className="text-foreground">General Shift (Count)</TableHead>
              <TableHead className="text-foreground">General Shift (Time)</TableHead>
              <TableHead className="text-foreground text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submittedManpower.map((row) => (
              <TableRow key={row.id} className="border-border hover:bg-background/50">
                <TableCell className="text-foreground">{row.serviceType}</TableCell>
                <TableCell className="text-foreground">{row.manpowerName}</TableCell>
                <TableCell className="text-foreground">{row.expectedSalary || EMPTY_VALUE}</TableCell>
                <TableCell className="text-foreground">{row.shift1Count || EMPTY_VALUE}</TableCell>
                <TableCell className="text-foreground text-xs">
                  {row.shift1StartTime && row.shift1EndTime
                    ? `${row.shift1StartTime} - ${row.shift1EndTime}`
                    : EMPTY_VALUE}
                </TableCell>
                <TableCell className="text-foreground">{row.shift2Count || EMPTY_VALUE}</TableCell>
                <TableCell className="text-foreground text-xs">
                  {row.shift2StartTime && row.shift2EndTime
                    ? `${row.shift2StartTime} - ${row.shift2EndTime}`
                    : EMPTY_VALUE}
                </TableCell>
                <TableCell className="text-foreground">{row.shift3Count || EMPTY_VALUE}</TableCell>
                <TableCell className="text-foreground text-xs">
                  {row.shift3StartTime && row.shift3EndTime
                    ? `${row.shift3StartTime} - ${row.shift3EndTime}`
                    : EMPTY_VALUE}
                </TableCell>
                <TableCell className="text-foreground">{row.generalShiftCount || EMPTY_VALUE}</TableCell>
                <TableCell className="text-foreground text-xs">
                  {row.generalShiftStartTime && row.generalShiftEndTime
                    ? `${row.generalShiftStartTime} - ${row.generalShiftEndTime}`
                    : EMPTY_VALUE}
                </TableCell>
                <TableCell className="text-foreground text-right font-semibold">
                  {row.totalManpower || EMPTY_VALUE}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-border hover:bg-transparent">
              <TableCell colSpan={11} className="text-right font-semibold text-foreground">
                Grand Total Manpower
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {grandTotalManpower}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
