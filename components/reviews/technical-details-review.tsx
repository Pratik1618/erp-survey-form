'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { useFormContext } from '@/components/form-context';

export function TechnicalDetailsReview() {
  const { submittedVersion } = useFormContext();

  if (!submittedVersion) return null;

  const sections = [
   {
  title: 'Electrical Details - Power Supply',
  fields: [
    { label: 'SEB Sanctioned Maximum Load (HT/LT)', value: submittedVersion.sebLoad },
    { label: 'Installed Capacity', value: submittedVersion.installedCapacity },
    { label: 'Back-up Power - Capacity (KVA)', value: submittedVersion.generatorCapacity },
    { label: 'Generator Brand Name', value: submittedVersion.generatorBrand },
    { label: 'Expected Average Operating Hours (DG per day)', value: submittedVersion.dgOperatingHours },
    { label: 'Year of DG Installation', value: submittedVersion.dgInstallationYear },
    { label: 'Fuel Used', value: submittedVersion.fuelUsed },
    { label: 'Capacity of Fuel Storage Tanks & Quantity', value: submittedVersion.fuelStorageCapacity },
    { label: 'AMF Operations Available (Y/N)', value: submittedVersion.amfOperations },
    { label: 'Synchronization Panel for Load Sharing', value: submittedVersion.synchronizationPanel },
    { label: 'Back-up UPS - Make, Quantity & Capacity', value: submittedVersion.upsCapacity },
    { label: 'Transformer - Make, Quantity & Capacity', value: submittedVersion.transformerCapacity },
    { label: 'Average kWh Cost from Existing DG', value: submittedVersion.averageKwhCost },
  ],
},
{
  title: 'Lifts/Escalators',
  fields: [
    { label: 'Passenger Lifts - Make', value: submittedVersion.passengerLiftsMake },
    { label: 'Passenger Lifts - Number of Lifts', value: submittedVersion.passengerLiftsCount },
    { label: 'Passenger Lifts - Capacity per Lift', value: submittedVersion.passengerLiftCapacityPerLift },
    { label: 'Passenger Lifts - Weight Capacity', value: submittedVersion.passengerLiftWeightCapacity },

    { label: 'Service Lifts - Make', value: submittedVersion.serviceLiftsMake },
    { label: 'Service Lifts - Number of Lifts', value: submittedVersion.serviceLiftsCount },
    { label: 'Service Lifts - Capacity per Lift', value: submittedVersion.serviceLiftsCapacityPerLift },
    { label: 'Service Lifts - Weight Capacity', value: submittedVersion.serviceLiftsWeightCapacity },
  ],
},

  {
  title: 'HVAC - Air Conditioning System',
  fields: [
    { label: 'Type of AC System (Pkg/Chiller/Split/Window)', value: submittedVersion.acType },
    { label: 'Total Plant Capacity (TR)', value: submittedVersion.acPlantCapacity },
    { label: 'Hours of Operation for AC System', value: submittedVersion.acOperatingHours },
    { label: 'Design Conditions (Temp/RH)', value: submittedVersion.designTemp },
    { label: 'AC Supplied By', value: submittedVersion.acSuppliedBy },
    { label: 'Year of AC Installation', value: submittedVersion.acInstallationYear },
    { label: 'Cooling Media of Condensers (Air/Water)', value: submittedVersion.coolingMediaCondensers },
    { label: "Number of AHU's & Capacity", value: submittedVersion.ahuCount },
    { label: "Number of FCU's", value: submittedVersion.fcuCount },
    { label: 'Condenser Pumps (Capacity & Quantity)', value: submittedVersion.condenserPumpsCapacity },
    { label: 'Chiller Pumps (Capacity & Quantity)', value: submittedVersion.chillerPumpsCapacity },
    { label: 'Cooling Towers - Make, Type & Capacity', value: submittedVersion.coolingTowersDetails },
    { label: 'Pipelines Length', value: submittedVersion.pipelines },
  ],
}
,
  {
  title: 'Fire Safety System',
  fields: [
    { label: 'Details of Sprinkler System', value: submittedVersion.sprinklerSystem },
    { label: 'Availability of Hose Reel Numbers on Each Floor', value: submittedVersion.hoseReelCount },
    { label: 'Details of Smoke/Heat Detection System', value: submittedVersion.smokeDetection },
    { label: 'Availability of Public Address System', value: submittedVersion.publicAddress },
    { label: 'Availability of Pressurized Staircases', value: submittedVersion.pressurizedStaircases },
    { label: 'Details of Fire System Pumps', value: submittedVersion.fireSystemPumps },
    { label: 'Diesel Pump (HP)', value: submittedVersion.dieselPump },
    { label: 'Sprinkler Pump (HP)', value: submittedVersion.sprinklerPump },
    { label: 'Hydrant Pump (HP)', value: submittedVersion.hydrantPump },
    { label: 'Jockey Pump (HP)', value: submittedVersion.jockryPump },
    { label: 'Portable Extinguishers - Quantity & Make', value: submittedVersion.portableExtinguishers },
    { label: 'Fire Alarm Panel Details', value: submittedVersion.fireAlarmPanel },
    { label: 'Capacity of Tanks for Fire System', value: submittedVersion.fireTankCapacity },
  ],
},
{
  title: 'Building Systems & Controls',
  fields: [
    { label: 'Façade Cleaning System (Type & Supplier)', value: submittedVersion.facadeCleaningType },
    { label: 'Building Access Control System (Supplier)', value: submittedVersion.buildingAccessControl },
    { label: 'Building Automation System (BMS) - Make & Type', value: submittedVersion.bmsMake },
  ],
},


  {
  title: 'Water Availability & Management',
  fields: [
    { label: 'Source of Water (Borewell/Corporation)', value: submittedVersion.waterSource },
    { label: 'Number of Pumps with Details', value: submittedVersion.waterPumps },
    { label: 'Domestic Water Pump Details', value: submittedVersion.domesticPumpDetails },
    { label: 'Flushing Water Pump Details', value: submittedVersion.flushingPumpDetails },
    { label: 'Capacity of Domestic Water Storage Tanks', value: submittedVersion.drinkingWaterCapacity },
    { label: 'Capacity of Flushing Water Storage Tanks', value: submittedVersion.flushingWaterCapacity },
    { label: 'Source of Drinking Water (Treated or Not)', value: submittedVersion.drinkingWaterTreated },
  ],
},
 {
  title: 'Water Treatment Details',
  fields: [
    { label: 'Water Softener - Make & Capacity', value: submittedVersion.waterSoftenerCapacity },
    { label: 'R/O Plant - Make & Capacity', value: submittedVersion.roPlantCapacity },
    { label: 'STP - Make, Type & Capacity', value: submittedVersion.stpMakeType },
  ],
},
{
  title: 'Waste Disposal',
  fields: [
    { label: 'Type of Waste', value: submittedVersion.wasteType },
    { label: 'To be Disposed of Up To', value: submittedVersion.wasteDisposal },
  ],
},
{
  title: 'Horticulture',
  fields: [
    { label: 'Landscaping Area', value: submittedVersion.landscapingAreaValue },
    { label: 'Indoor Plants (Type & Quantity)', value: submittedVersion.indoorPlantsDetails },
  ],
},
{
  title: 'Security System',
  fields: [
    { label: 'CCTV (Number of Cameras)', value: submittedVersion.cctvCameras },
    { label: 'Manned Security Desk', value: submittedVersion.mannedSecurityDesk },
    { label: 'Touch Door Alarm', value: submittedVersion.touchDoorAlarm },
  ],
},
{
  title: 'Pantry Facilities',
  fields: [
    { label: 'Wet Pantry Provided (Y/N)', value: submittedVersion.wetPantryProvided },
    { label: 'Wet Pantry Allowed in Space (Y/N)', value: submittedVersion.wetPantryAllowed },
    { label: 'Water Supply Location', value: submittedVersion.waterSupplyLocation },
    { label: 'Water Drainage Locations', value: submittedVersion.waterDrainageLocations },
    { label: 'Cafeteria Details with Occupancy & Timings', value: submittedVersion.cafeteriaDetails },
  ],
}






 
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title} className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                <p className="text-foreground font-medium">{field.value || '—'}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {submittedVersion.remarks && (
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Remarks</h3>
          <p className="text-foreground whitespace-pre-wrap">{submittedVersion.remarks}</p>
        </Card>
      )}
    </div>
  );
}
