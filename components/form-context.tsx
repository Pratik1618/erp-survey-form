'use client';

import React, { createContext, useContext, useState } from 'react';

export interface ManpowerRow {
  id: string;
  serviceType: string;
  manpowerName: string;
  shift1Count: number | string;
  shift1StartTime: string;
  shift1EndTime: string;
  shift2Count: number | string;
  shift2StartTime: string;
  shift2EndTime: string;
  shift3Count: number | string;
  shift3StartTime: string;
  shift3EndTime: string;
  generalShiftCount: number | string;
  totalManpower: number | string;
  changes?: string[];
}

export interface SurveyData {
  clientName: string;
  siteName: string;
  surveyId: string;
  address: string;
  pincode : number | string;
  surveyDate: string;
  builtUpArea: number | string;
  totalCarpetArea: number | string;
  floors: number | string;
  workStations: number | string;
  totalEmployees: number | string;
  officeHoursFrom: string;
  officeHoursTo: string;
  staircases: number | string;
  staircaseFlooring: string;
  commonArea: number | string;
  commonAreaFlooring: string;
  occupiedAreaFlooring: string;
  gentToiletsCount: number | string;
  ladyToiletsCount: number | string;
  toiletries: string;
  basementsCount: number | string;
  basementsUsedFor: string;
  basementsFlooring: string;
  groundLevelParking: number | string;
  basementParking: number | string;
  outsideParking: number | string;
  visitorParking: number | string;
  totalFacadeGlass: string;
  totalOtherGlass: string;
  electricalRoomLocation: string;
  sebLoad: string;
  generatorCapacity: string;
  generatorBrand: string;
  dgOperatingHours: string;
  fuelUsed: string;
  fuelStorageCapacity: string;
  amfOperations: string;
  synchronizationPanel: string;
  upsCapacity: string;
  transformerCapacity: string;
  averageKwhCost: string;
  liftsCount: string;
  liftCapacity: string;
  liftWeight: string;
  acType: string;
  acPlantCapacity: string;
  acOperatingHours: string;
  designTemp: string;
  acSuppliedBy: string;
  acInstallationYear: string;
  sprinklerSystem: string;
  hoseReelCount: string;
  smokeDetection: string;
  publicAddress: string;
  pressurizedStaircases: string;
  fireSystemPumps: string;
  portableExtinguishers: string;
  fireAlarmPanel: string;
  fireTankCapacity: string;
  facadeCleaningSystem: string;
  buildingAccessControl: string;
  buildingAutomation: string;
  waterSource: string;
  waterPumps: string;
  waterStorageTanks: string;
  drinkingWaterTreated: string;
  waterSoftenerCapacity: string;
  roPlantCapacity: string;
  stpCapacity: string;
  wasteType: string;
  wasteDisposal: string;
  landscapingArea: string;
  indoorPlants: string;
  cctvCameras: string;
  mannedSecurityDesk: string;
  touchDoorAlarm: string;
  // Additional Electrical Details
  installedCapacity: string;
  dgInstallationYear: string;
  // Lifts/Escalators Details
  passengerLiftsMake: string;
  passengerLiftsCount: string;
  passengerLiftCapacityPerLift: string;
  passengerLiftWeightCapacity: string;
  serviceLiftsMake:string;
  serviceLiftsCount: string;
  serviceLiftsCapacityPerLift: string;
  serviceLiftsWeightCapacity: string;
  // HVAC Advanced Details
  coolingMediaCondensers: string;
  ahuCount: string;
  fcuCount: string;
  condenserPumpsCapacity: string;
  chillerPumpsCapacity: string;
  coolingTowersDetails: string;
  pipelines: string;
  // Fire System Advanced Details
  dieselPump: string;
  sprinklerPump: string;
  hydrantPump: string;
  jockryPump: string;
  // Building Systems Advanced
  facadeCleaningType: string;
  bmsMake: string;
  // Water Details Advanced
  domesticPumpDetails: string;
  flushingPumpDetails: string;
  drinkingWaterCapacity: string;
  flushingWaterCapacity: string;
  stpMakeType: string;
  // Horticulture
  landscapingAreaValue: string;
  indoorPlantsDetails: string;
  // Pantry
  wetPantryProvided: string;
  wetPantryAllowed: string;
  waterSupplyLocation: string;
  waterDrainageLocations: string;
  cafeteriaDetails: string;
  remarks: string;
  changes?: string[];
}

interface FormContextType {
  surveyData: SurveyData;
  setSurveyData: (data: SurveyData) => void;
  manpowerData: ManpowerRow[];
  setManpowerData: (data: ManpowerRow[]) => void;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  setApprovalStatus: (status: 'pending' | 'approved' | 'rejected') => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  submittedVersion: SurveyData | null;
  setSubmittedVersion: (data: SurveyData | null) => void;
  submittedManpower: ManpowerRow[] | null;
  setSubmittedManpower: (data: ManpowerRow[] | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const defaultSurveyData: SurveyData = {
  clientName: '',
  siteName: '',
  surveyId: '',
  address: '',
  pincode:'',
  surveyDate: '',
  builtUpArea: '',
  totalCarpetArea: '',
  floors: '',
  workStations: '',
  totalEmployees: '',
  officeHoursFrom: '',
  officeHoursTo: '',
  staircases: '',
  staircaseFlooring: '',
  commonArea: '',
  commonAreaFlooring: '',
  occupiedAreaFlooring: '',
  gentToiletsCount: '',
  ladyToiletsCount: '',
  toiletries: '',
  basementsCount: '',
  basementsUsedFor: '',
  basementsFlooring: '',
  groundLevelParking: '',
  basementParking: '',
  outsideParking: '',
  visitorParking: '',
  totalFacadeGlass: '',
  totalOtherGlass: '',
  electricalRoomLocation: '',
  sebLoad: '',
  generatorCapacity: '',
  generatorBrand: '',
  dgOperatingHours: '',
  fuelUsed: '',
  fuelStorageCapacity: '',
  amfOperations: '',
  synchronizationPanel: '',
  upsCapacity: '',
  transformerCapacity: '',
  averageKwhCost: '',
  liftsCount: '',
  liftCapacity: '',
  liftWeight: '',
  acType: '',
  acPlantCapacity: '',
  acOperatingHours: '',
  designTemp: '',
  acSuppliedBy: '',
  acInstallationYear: '',
  sprinklerSystem: '',
  hoseReelCount: '',
  smokeDetection: '',
  publicAddress: '',
  pressurizedStaircases: '',
  fireSystemPumps: '',
  portableExtinguishers: '',
  fireAlarmPanel: '',
  fireTankCapacity: '',
  facadeCleaningSystem: '',
  buildingAccessControl: '',
  buildingAutomation: '',
  waterSource: '',
  waterPumps: '',
  waterStorageTanks: '',
  drinkingWaterTreated: '',
  waterSoftenerCapacity: '',
  roPlantCapacity: '',
  stpCapacity: '',
  wasteType: '',
  wasteDisposal: '',
  landscapingArea: '',
  indoorPlants: '',
  cctvCameras: '',
  mannedSecurityDesk: '',
  touchDoorAlarm: '',
  installedCapacity: '',
  dgInstallationYear: '',
  passengerLiftsMake: '',
  passengerLiftsCount: '',
  passengerLiftCapacityPerLift: '',
  passengerLiftWeightCapacity: '',
  serviceLiftsMake:'',
  serviceLiftsCount: '',
  serviceLiftsCapacityPerLift: '',
  serviceLiftsWeightCapacity: '',
  coolingMediaCondensers: '',
  ahuCount: '',
  fcuCount: '',
  condenserPumpsCapacity: '',
  chillerPumpsCapacity: '',
  coolingTowersDetails: '',
  pipelines: '',
  dieselPump: '',
  sprinklerPump: '',
  hydrantPump: '',
  jockryPump: '',
  facadeCleaningType: '',
  bmsMake: '',
  domesticPumpDetails: '',
  flushingPumpDetails: '',
  drinkingWaterCapacity: '',
  flushingWaterCapacity: '',
  stpMakeType: '',
  landscapingAreaValue: '',
  indoorPlantsDetails: '',
  wetPantryProvided: '',
  wetPantryAllowed: '',
  waterSupplyLocation: '',
  waterDrainageLocations: '',
  cafeteriaDetails: '',
  remarks: '',
};


export function FormProvider({ children }: { children: React.ReactNode }) {
  const [surveyData, setSurveyData] = useState<SurveyData>(defaultSurveyData);
  const [manpowerData, setManpowerData] = useState<ManpowerRow[]>([
    {
      id: '1',
      serviceType: 'Housekeeping',
      manpowerName: 'Housekeeper',
      shift1Count: '',
      shift1StartTime: '7:00 AM',
      shift1EndTime: '4:00 PM',
      shift2Count: '',
      shift2StartTime: '1:00 PM',
      shift2EndTime: '10:00 PM',
      shift3Count: '',
      shift3StartTime: '10:00 PM',
      shift3EndTime: '7:00 AM',
      generalShiftCount: '',
      totalManpower: '',
    },
  
  ]);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectionReason, setRejectionReason] = useState('');
  const [submittedVersion, setSubmittedVersion] = useState<SurveyData | null>(null);
  const [submittedManpower, setSubmittedManpower] = useState<ManpowerRow[] | null>(null);

  return (
    <FormContext.Provider
      value={{
        surveyData,
        setSurveyData,
        manpowerData,
        setManpowerData,
        approvalStatus,
        setApprovalStatus,
        rejectionReason,
        setRejectionReason,
        submittedVersion,
        setSubmittedVersion,
        submittedManpower,
        setSubmittedManpower,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}
