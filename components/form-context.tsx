'use client';

import React, { createContext, useContext, useState } from 'react';

export interface ManpowerRow {
  id: string;
  serviceType: string;
  manpowerName: string;
  shift1Count: string;
  shift1StartTime: string;
  shift1EndTime: string;
  shift2Count: string;
  shift2StartTime: string;
  shift2EndTime: string;
  shift3Count: string;
  shift3StartTime: string;
  shift3EndTime: string;
  generalShiftCount: string;
  totalManpower: string;
  changes?: string[];
}

export interface SurveyData {
  clientName: string;
  siteName: string;
  surveyId: string;
  address: string;
  surveyDate: string;
  builtUpArea: string;
  totalCarpetArea: string;
  floors: string;
  workStations: string;
  totalEmployees: string;
  officeHours: string;
  staircases: string;
  staircaseFlooring: string;
  commonArea: string;
  commonAreaFlooring: string;
  occupiedAreaFlooring: string;
  gentToiletsCount: string;
  ladyToiletsCount: string;
  toiletries: string;
  basementsCount: string;
  basementsUsedFor: string;
  basementsFlooring: string;
  groundLevelParking: string;
  basementParking: string;
  outsideParking: string;
  visitorParking: string;
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
  clientName: 'Mr. Satish',
  siteName: 'Piramal Tower',
  surveyId: '',
  address: 'Mathuradas Mill Compound, Peninsula Spenta, 1, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013',
  surveyDate: '2024-07-19',
  builtUpArea: '270,000',
  totalCarpetArea: '189,000',
  floors: '10',
  workStations: '2,250',
  totalEmployees: '2,550',
  officeHours: '9:00 AM - 6:00 PM',
  staircases: '2',
  staircaseFlooring: 'Polished Concrete',
  commonArea: '100,000',
  commonAreaFlooring: 'Marble',
  occupiedAreaFlooring: 'Carpet Tiles',
  gentToiletsCount: '1',
  ladyToiletsCount: '1',
  toiletries: 'No',
  basementsCount: '1',
  basementsUsedFor: 'Parking & Services',
  basementsFlooring: 'Concrete',
  groundLevelParking: '350',
  basementParking: '200',
  outsideParking: '0',
  visitorParking: '50',
  totalFacadeGlass: 'Yes',
  totalOtherGlass: 'Yes',
  electricalRoomLocation: 'Ground Floor',
  sebLoad: 'HT - 11KV & LT 1000V',
  generatorCapacity: '670 KVA',
  generatorBrand: 'Powerica',
  dgOperatingHours: '15 hours',
  fuelUsed: 'Diesel',
  fuelStorageCapacity: '990 liters',
  amfOperations: 'Yes',
  synchronizationPanel: 'Yes',
  upsCapacity: 'Microtek 120 KVA 3-phase',
  transformerCapacity: 'Alfa 1000 KVA dry type',
  averageKwhCost: '₹15 per unit',
  liftsCount: '4 Passenger + 1 Service',
  liftCapacity: '12-10 persons',
  liftWeight: '300-500 kg',
  acType: 'Chiller-based AC System',
  acPlantCapacity: '350 TR',
  acOperatingHours: '18 hours',
  designTemp: '12°C / RH 40-60%',
  acSuppliedBy: 'Voltas',
  acInstallationYear: '2024',
  sprinklerSystem: 'Wet-type sprinkler system',
  hoseReelCount: '2 per floor',
  smokeDetection: 'Addressable detectors + heat detection in pantry',
  publicAddress: 'Yes',
  pressurizedStaircases: 'Yes',
  fireSystemPumps: '25 HP Diesel, 15 HP Sprinkler, 15 HP Hydrant, 7 HP Jockey pump',
  portableExtinguishers: '12 CO2 type extinguishers',
  fireAlarmPanel: 'Figro make addressable type',
  fireTankCapacity: '150,000 liters',
  facadeCleaningSystem: 'Manual with ropes',
  buildingAccessControl: 'Siemens',
  buildingAutomation: 'Siemens BMS',
  waterSource: 'Corporation water supply',
  waterPumps: 'Domestic 10 HP & Flushing Pump 12 HP',
  waterStorageTanks: '75,000 L Domestic + 80,000 L Flushing',
  drinkingWaterTreated: 'Yes',
  waterSoftenerCapacity: '1000 LPH',
  roPlantCapacity: '980 LPH',
  stpCapacity: '350 KLD',
  wasteType: 'Dry & Wet Waste',
  wasteDisposal: 'Composite machine',
  landscapingArea: '666 sq ft',
  indoorPlants: 'Palm trees - 20 nos',
  cctvCameras: '45 cameras',
  mannedSecurityDesk: '2 desks',
  touchDoorAlarm: '5 alarms',
  remarks: '',
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [surveyData, setSurveyData] = useState<SurveyData>(defaultSurveyData);
  const [manpowerData, setManpowerData] = useState<ManpowerRow[]>([
    {
      id: '1',
      serviceType: 'Housekeeping',
      manpowerName: 'Housekeeper',
      shift1Count: '7',
      shift1StartTime: '7:00 AM',
      shift1EndTime: '4:00 PM',
      shift2Count: '3',
      shift2StartTime: '1:00 PM',
      shift2EndTime: '10:00 PM',
      shift3Count: '2',
      shift3StartTime: '10:00 PM',
      shift3EndTime: '7:00 AM',
      generalShiftCount: '',
      totalManpower: '12',
    },
    {
      id: '2',
      serviceType: 'Housekeeping',
      manpowerName: 'Supervisor',
      shift1Count: '1',
      shift1StartTime: '7:00 AM',
      shift1EndTime: '4:00 PM',
      shift2Count: '',
      shift2StartTime: '',
      shift2EndTime: '',
      shift3Count: '',
      shift3StartTime: '',
      shift3EndTime: '',
      generalShiftCount: '',
      totalManpower: '1',
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
