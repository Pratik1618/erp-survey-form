'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from '@/components/form-context';

export function TechnicalDetailsForm() {
  const { surveyData, setSurveyData } = useFormContext();

  const handleChange = (field: keyof typeof surveyData, value: string) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    });
  };

  const sections = [
    {
      title: 'Electrical Details - Power Supply',
      fields: [
        { label: 'SEB Sanctioned Maximum Load (HT/LT)', key: 'sebLoad' as const },
        { label: 'Installed Capacity', key: 'installedCapacity' as const },
        { label: 'Back-up Power - Capacity (KVA)', key: 'generatorCapacity' as const },
        { label: 'Generator Brand Name', key: 'generatorBrand' as const },
        { label: 'Expected Average Operating Hours (DG per day)', key: 'dgOperatingHours' as const },
        { label: 'Year of DG Installation', key: 'dgInstallationYear' as const },
        { label: 'Fuel Used', key: 'fuelUsed' as const },
        { label: 'Capacity of Fuel Storage Tanks & Quantity', key: 'fuelStorageCapacity' as const },
        { label: 'AMF Operations Available (Y/N)', key: 'amfOperations' as const },
        { label: 'Synchronization Panel for Load Sharing', key: 'synchronizationPanel' as const },
        { label: 'Back-up UPS - Make, Quantity & Capacity', key: 'upsCapacity' as const },
        { label: 'Transformer - Make, Quantity & Capacity', key: 'transformerCapacity' as const },
        { label: 'Average kWh Cost from Existing DG', key: 'averageKwhCost' as const },
      ],
    },
    {
      title: 'Lifts/Escalators',
      fields: [
        { label: 'Passenger Lifts - Make', key: 'passengerLiftsMake' as const },
        { label: 'Passenger Lifts - Number of Lifts', key: 'passengerLiftsCount' as const },
        { label: 'Passenger Lifts - Capacity per Lift', key: 'passengerLiftCapacityPerLift' as const },
        { label: 'Passenger Lifts - Weight Capacity', key: 'passengerLiftWeightCapacity' as const },
        { label: 'Service Lifts - Make', key: 'passengerLiftsMake' as const },
        { label: 'Service Lifts - Number of Lifts', key: 'serviceLiftsCount' as const },
        { label: 'Service Lifts - Capacity per Lift', key: 'serviceLiftsCapacityPerLift' as const },
        { label: 'Service Lifts - Weight Capacity', key: 'serviceLiftsWeightCapacity' as const },
      ],
    },
    {
      title: 'HVAC - Air Conditioning System',
      fields: [
        { label: 'Type of AC System (Pkg/Chiller/Split/Window)', key: 'acType' as const },
        { label: 'Total Plant Capacity (TR)', key: 'acPlantCapacity' as const },
        { label: 'Hours of Operation for AC System', key: 'acOperatingHours' as const },
        { label: 'Design Conditions (Temp/RH)', key: 'designTemp' as const },
        { label: 'AC Supplied By', key: 'acSuppliedBy' as const },
        { label: 'Year of AC Installation', key: 'acInstallationYear' as const },
        { label: 'Cooling Media of Condensers (Air/Water)', key: 'coolingMediaCondensers' as const },
        { label: 'Number of AHU\'s & Capacity', key: 'ahuCount' as const },
        { label: 'Number of FCU\'s', key: 'fcuCount' as const },
        { label: 'Condenser Pumps (Capacity & Quantity)', key: 'condenserPumpsCapacity' as const },
        { label: 'Chiller Pumps (Capacity & Quantity)', key: 'chillerPumpsCapacity' as const },
        { label: 'Cooling Towers - Make, Type & Capacity', key: 'coolingTowersDetails' as const },
        { label: 'Pipelines Length', key: 'pipelines' as const },
      ],
    },
    {
      title: 'Fire Safety System',
      fields: [
        { label: 'Details of Sprinkler System', key: 'sprinklerSystem' as const },
        { label: 'Availability of Hose Reel Numbers on Each Floor', key: 'hoseReelCount' as const },
        { label: 'Details of Smoke/Heat Detection System', key: 'smokeDetection' as const },
        { label: 'Availability of Public Address System', key: 'publicAddress' as const },
        { label: 'Availability of Pressurized Staircases', key: 'pressurizedStaircases' as const },
        { label: 'Details of Fire System Pumps', key: 'fireSystemPumps' as const },
        { label: 'Diesel Pump (HP)', key: 'dieselPump' as const },
        { label: 'Sprinkler Pump (HP)', key: 'sprinklerPump' as const },
        { label: 'Hydrant Pump (HP)', key: 'hydrantPump' as const },
        { label: 'Jockey Pump (HP)', key: 'jockryPump' as const },
        { label: 'Portable Extinguishers - Quantity & Make', key: 'portableExtinguishers' as const },
        { label: 'Fire Alarm Panel Details', key: 'fireAlarmPanel' as const },
        { label: 'Capacity of Tanks for Fire System', key: 'fireTankCapacity' as const },
      ],
    },
    {
      title: 'Building Systems & Controls',
      fields: [
        { label: 'Façade Cleaning System (Type & Supplier)', key: 'facadeCleaningType' as const },
        { label: 'Building Access Control System (Supplier)', key: 'buildingAccessControl' as const },
        { label: 'Building Automation System (BMS) - Make & Type', key: 'bmsMake' as const },
      ],
    },
    {
      title: 'Water Availability & Management',
      fields: [
        { label: 'Source of Water (Borewell/Corporation)', key: 'waterSource' as const },
        { label: 'Number of Pumps with Details', key: 'waterPumps' as const },
        { label: 'Domestic Water Pump Details', key: 'domesticPumpDetails' as const },
        { label: 'Flushing Water Pump Details', key: 'flushingPumpDetails' as const },
        { label: 'Capacity of Domestic Water Storage Tanks', key: 'drinkingWaterCapacity' as const },
        { label: 'Capacity of Flushing Water Storage Tanks', key: 'flushingWaterCapacity' as const },
        { label: 'Source of Drinking Water (Treated or Not)', key: 'drinkingWaterTreated' as const },
      ],
    },
    {
      title: 'Water Treatment Details',
      fields: [
        { label: 'Water Softener - Make & Capacity', key: 'waterSoftenerCapacity' as const },
        { label: 'R/O Plant - Make & Capacity', key: 'roPlantCapacity' as const },
        { label: 'STP - Make, Type & Capacity', key: 'stpMakeType' as const },
      ],
    },
    {
      title: 'Waste Disposal',
      fields: [
        { label: 'Type of Waste', key: 'wasteType' as const },
        { label: 'To be Disposed of Up To', key: 'wasteDisposal' as const },
      ],
    },
    {
      title: 'Horticulture',
      fields: [
        { label: 'Landscaping Area', key: 'landscapingAreaValue' as const },
        { label: 'Indoor Plants (Type & Quantity)', key: 'indoorPlantsDetails' as const },
      ],
    },
    {
      title: 'Security System',
      fields: [
        { label: 'CCTV (Number of Cameras)', key: 'cctvCameras' as const },
        { label: 'Manned Security Desk', key: 'mannedSecurityDesk' as const },
        { label: 'Touch Door Alarm', key: 'touchDoorAlarm' as const },
      ],
    },
    {
      title: 'Pantry Facilities',
      fields: [
        { label: 'Wet Pantry Provided (Y/N)', key: 'wetPantryProvided' as const },
        { label: 'Wet Pantry Allowed in Space (Y/N)', key: 'wetPantryAllowed' as const },
        { label: 'Water Supply Location', key: 'waterSupplyLocation' as const },
        { label: 'Water Drainage Locations', key: 'waterDrainageLocations' as const },
        { label: 'Cafeteria Details with Occupancy & Timings', key: 'cafeteriaDetails' as const },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title} className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <Label htmlFor={field.key} className="text-foreground font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  type="text"
                  value={surveyData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="bg-background text-foreground border-border"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Remarks & Comments</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="remarks" className="text-foreground font-medium">
            Remarks
          </Label>
          <Textarea
            id="remarks"
            value={surveyData.remarks}
            onChange={(e) => handleChange('remarks', e.target.value)}
            className="bg-background text-foreground border-border min-h-30"
            placeholder="Enter any additional remarks or comments..."
          />
        </div>
      </Card>
    </div>
  );
}
