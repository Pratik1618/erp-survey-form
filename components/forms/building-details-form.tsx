'use client';

import React from 'react';
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

export function BuildingDetailsForm() {
  const { surveyData, setSurveyData } = useFormContext();

  const handleChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const handleNumberChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const handleTimeChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Plot Area */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Plot Area</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="builtUpArea" className="text-foreground font-medium">
              Built-up Area (sq ft)
            </Label>
            <Input
              id="builtUpArea"
              type="number"
              value={surveyData.builtUpArea}
              onChange={(e) => handleNumberChange('builtUpArea', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter built-up area"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="totalCarpetArea" className="text-foreground font-medium">
              Total Carpet Area (sq ft)
            </Label>
            <Input
              id="totalCarpetArea"
              type="number"
              value={surveyData.totalCarpetArea}
              onChange={(e) => handleNumberChange('totalCarpetArea', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter total carpet area"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="floors" className="text-foreground font-medium">
              Number of Floors
            </Label>
            <Input
              id="floors"
              type="number"
              value={surveyData.floors}
              onChange={(e) => handleNumberChange('floors', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of floors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workStations" className="text-foreground font-medium">
              Work Stations
            </Label>
            <Input
              id="workStations"
              type="number"
              value={surveyData.workStations}
              onChange={(e) => handleNumberChange('workStations', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter work stations"
            />
          </div>
        </div>
      </Card>

      {/* Capacity & Operations */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Capacity & Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="totalEmployees" className="text-foreground font-medium">
              Total Employees
            </Label>
            <Input
              id="totalEmployees"
              type="number"
              value={surveyData.totalEmployees}
              onChange={(e) => handleNumberChange('totalEmployees', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter total employees"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="officeHoursFrom" className="text-foreground font-medium">
              Office Hours From
            </Label>
            <Input
              id="officeHoursFrom"
              type="time"
              value={surveyData.officeHoursFrom}
              onChange={(e) => handleTimeChange('officeHoursFrom', e.target.value)}
              className="bg-background text-foreground border-border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="officeHoursTo" className="text-foreground font-medium">
              Office Hours To
            </Label>
            <Input
              id="officeHoursTo"
              type="time"
              value={surveyData.officeHoursTo}
              onChange={(e) => handleTimeChange('officeHoursTo', e.target.value)}
              className="bg-background text-foreground border-border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="staircases" className="text-foreground font-medium">
              Staircases
            </Label>
            <Input
              id="staircases"
              type="number"
              value={surveyData.staircases}
              onChange={(e) => handleNumberChange('staircases', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of staircases"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="staircaseFlooring" className="text-foreground font-medium">
              Staircase Flooring
            </Label>
            <Input
              id="staircaseFlooring"
              type="text"
              value={surveyData.staircaseFlooring}
              onChange={(e) => handleChange('staircaseFlooring', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter staircase flooring type"
            />
          </div>
        </div>
      </Card>

      {/* Common Areas */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Common Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="commonArea" className="text-foreground font-medium">
              Common Area (sq ft)
            </Label>
            <Input
              id="commonArea"
              type="number"
              value={surveyData.commonArea}
              onChange={(e) => handleNumberChange('commonArea', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter common area"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="commonAreaFlooring" className="text-foreground font-medium">
              Common Area Flooring
            </Label>
            <Input
              id="commonAreaFlooring"
              type="text"
              value={surveyData.commonAreaFlooring}
              onChange={(e) => handleChange('commonAreaFlooring', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter flooring type"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="occupiedAreaFlooring" className="text-foreground font-medium">
              Occupied Area Flooring
            </Label>
            <Input
              id="occupiedAreaFlooring"
              type="text"
              value={surveyData.occupiedAreaFlooring}
              onChange={(e) => handleChange('occupiedAreaFlooring', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter flooring type"
            />
          </div>
        </div>
      </Card>

      {/* Facilities */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="gentToiletsCount" className="text-foreground font-medium">
              Gents Toilets
            </Label>
            <Input
              id="gentToiletsCount"
              type="number"
              value={surveyData.gentToiletsCount}
              onChange={(e) => handleNumberChange('gentToiletsCount', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of gents toilets"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ladyToiletsCount" className="text-foreground font-medium">
              Ladies Toilets
            </Label>
            <Input
              id="ladyToiletsCount"
              type="number"
              value={surveyData.ladyToiletsCount}
              onChange={(e) => handleNumberChange('ladyToiletsCount', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of ladies toilets"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="toiletries" className="text-foreground font-medium">
              Toiletries Provided
            </Label>
            <Select value={surveyData.toiletries} onValueChange={(value) => handleChange('toiletries', value)}>
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basementsCount" className="text-foreground font-medium">
              Basements Count
            </Label>
            <Input
              id="basementsCount"
              type="number"
              value={surveyData.basementsCount}
              onChange={(e) => handleNumberChange('basementsCount', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of basements"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basementsUsedFor" className="text-foreground font-medium">
              Basements Used For
            </Label>
            <Input
              id="basementsUsedFor"
              type="text"
              value={surveyData.basementsUsedFor}
              onChange={(e) => handleChange('basementsUsedFor', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter basement usage"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basementsFlooring" className="text-foreground font-medium">
              Basements Flooring
            </Label>
            <Input
              id="basementsFlooring"
              type="text"
              value={surveyData.basementsFlooring}
              onChange={(e) => handleChange('basementsFlooring', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter flooring type"
            />
          </div>
        </div>
      </Card>

      {/* Parking */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Parking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="groundLevelParking" className="text-foreground font-medium">
              Ground Level Parking
            </Label>
            <Input
              id="groundLevelParking"
              type="number"
              value={surveyData.groundLevelParking}
              onChange={(e) => handleNumberChange('groundLevelParking', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of parking spaces"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basementParking" className="text-foreground font-medium">
              Basement Parking
            </Label>
            <Input
              id="basementParking"
              type="number"
              value={surveyData.basementParking}
              onChange={(e) => handleNumberChange('basementParking', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of parking spaces"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="outsideParking" className="text-foreground font-medium">
              Outside Parking
            </Label>
            <Input
              id="outsideParking"
              type="number"
              value={surveyData.outsideParking}
              onChange={(e) => handleNumberChange('outsideParking', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of parking spaces"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="visitorParking" className="text-foreground font-medium">
              Visitor Parking
            </Label>
            <Input
              id="visitorParking"
              type="number"
              value={surveyData.visitorParking}
              onChange={(e) => handleNumberChange('visitorParking', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter number of parking spaces"
            />
          </div>
        </div>
      </Card>

      {/* Glass Areas */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Glass Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="totalFacadeGlass" className="text-foreground font-medium">
              Total Façade Glass
            </Label>
            <Select value={surveyData.totalFacadeGlass} onValueChange={(value) => handleChange('totalFacadeGlass', value)}>
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="totalOtherGlass" className="text-foreground font-medium">
              Total Other Glass
            </Label>
            <Select value={surveyData.totalOtherGlass} onValueChange={(value) => handleChange('totalOtherGlass', value)}>
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="electricalRoomLocation" className="text-foreground font-medium">
              Electrical Room Location
            </Label>
            <Input
              id="electricalRoomLocation"
              type="text"
              value={surveyData.electricalRoomLocation}
              onChange={(e) => handleChange('electricalRoomLocation', e.target.value)}
              className="bg-background text-foreground border-border"
              placeholder="Enter location"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
