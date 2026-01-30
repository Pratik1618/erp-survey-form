'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from '@/components/form-context';
import { Eye, Check, X } from 'lucide-react';

export function CheckerTable() {
  const {
    submittedVersion,
    submittedManpower,
    approvalStatus,
    setApprovalStatus,
    rejectionReason,
    setRejectionReason,
    setSubmittedVersion,
    setSubmittedManpower,
  } = useFormContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [localReason, setLocalReason] = useState('');

  if (!submittedVersion) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600 text-lg">No submissions to review yet.</p>
      </Card>
    );
  }

  const handleAction = (actionType: 'approve' | 'reject') => {
    setAction(actionType);
    setLocalReason('');
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (action === 'approve') {
      setApprovalStatus('approved');
    } else if (action === 'reject') {
      setRejectionReason(localReason);
      setApprovalStatus('rejected');
    }
    setShowConfirmation(false);
    setOpenDialog(false);
  };

  const handleReopen = () => {
    setApprovalStatus('pending');
    setRejectionReason('');
  };

  const getStatusBadge = () => {
    switch (approvalStatus) {
      case 'approved':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
          <Check className="w-4 h-4 mr-1" /> Approved
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
          <X className="w-4 h-4 mr-1" /> Rejected
        </span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
          Pending Review
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Table */}
      <Card className="overflow-hidden shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Client Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Site Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Service Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-600">System Admin</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{submittedVersion.clientName}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{submittedVersion.siteName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {submittedManpower?.map((m) => m.serviceType).filter((v, i, a) => a.indexOf(v) === i).join(', ') || 'N/A'}
              </td>
              <td className="px-6 py-4 text-sm">{getStatusBadge()}</td>
              <td className="px-6 py-4 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpenDialog(true)}
                  className="flex items-center gap-2 hover:bg-blue-50 text-blue-600"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-6xl w-full max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Survey Form Details</DialogTitle>
            <DialogDescription>
              Client: {submittedVersion.clientName} | Site: {submittedVersion.siteName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Site Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Site Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Client Name</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.clientName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Site Name</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.siteName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Survey ID</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.surveyId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.address}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Survey Date</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.surveyDate}</p>
                </div>
              </div>
            </div>

            {/* Building Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Building Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Built-up Area</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.builtUpArea}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Carpet Area</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.totalCarpetArea}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Floors</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.floors}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Work Stations</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.workStations}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Total Employees</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.totalEmployees}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Office Hours From</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.officeHoursFrom}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Office Hours To</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.officeHoursTo}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Staircases</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.staircases}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Staircase Flooring</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.staircaseFlooring}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Common Area</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.commonArea}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Common Area Flooring</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.commonAreaFlooring}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Occupied Area Flooring</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.occupiedAreaFlooring}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Gent Toilets</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.gentToiletsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Lady Toilets</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.ladyToiletsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Toiletries</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.toiletries}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Basements</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.basementsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Basement Usage</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.basementsUsedFor}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Basement Flooring</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.basementsFlooring}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Ground Parking</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.groundLevelParking}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Basement Parking</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.basementParking}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Outside Parking</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.outsideParking}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Visitor Parking</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.visitorParking}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Total Facade Glass</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.totalFacadeGlass}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Other Glass Area</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.totalOtherGlass}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Electrical Room Location</p>
                    <p className="text-sm text-gray-900 mt-1">{submittedVersion.electricalRoomLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Technical Details</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Electrical System</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">SEB Load</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.sebLoad}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Installed Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.installedCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Generator Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.generatorCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Generator Brand</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.generatorBrand}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">DG Installation Year</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.dgInstallationYear}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">DG Operating Hours</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.dgOperatingHours}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fuel Used</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fuelUsed}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fuel Storage Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fuelStorageCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">AMF Operations</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.amfOperations}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Synchronization Panel</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.synchronizationPanel}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">UPS Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.upsCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Transformer Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.transformerCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Average kWh Cost</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.averageKwhCost}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Lifts & Escalators</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Lifts Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.liftsCount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Lift Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.liftCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Lift Weight</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.liftWeight}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Passenger Lifts Make</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.passengerLiftsMake}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Passenger Lifts Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.passengerLiftsCount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Capacity Per Lift</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.passengerLiftCapacityPerLift}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Weight Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.passengerLiftWeightCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Service Lifts Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.serviceLiftsCount}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">HVAC System</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">AC Type</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.acType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Plant Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.acPlantCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Operating Hours</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.acOperatingHours}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Design Temp/RH</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.designTemp}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">AC Supplied By</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.acSuppliedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Installation Year</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.acInstallationYear}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Cooling Media</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.coolingMediaCondensers}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">AHU Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.ahuCount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">FCU Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fcuCount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Condenser Pumps</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.condenserPumpsCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Chiller Pumps</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.chillerPumpsCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Cooling Towers</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.coolingTowersDetails}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Fire Safety System</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Sprinkler System</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.sprinklerSystem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Hose Reel Count</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.hoseReelCount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Smoke Detection</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.smokeDetection}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Public Address System</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.publicAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Pressurized Staircases</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.pressurizedStaircases}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fire System Pumps</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fireSystemPumps}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Portable Extinguishers</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.portableExtinguishers}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fire Alarm Panel</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fireAlarmPanel}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fire Tank Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.fireTankCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Diesel Pump</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.dieselPump}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Sprinkler Pump</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.sprinklerPump}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Hydrant Pump</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.hydrantPump}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Water Management</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Water Source</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterSource}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Water Pumps</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterPumps}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Storage Tanks</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterStorageTanks}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Drinking Water Treated</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.drinkingWaterTreated}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Water Softener Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterSoftenerCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">RO Plant Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.roPlantCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">STP Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.stpCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">STP Make/Type</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.stpMakeType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Drinking Water Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.drinkingWaterCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Flushing Water Capacity</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.flushingWaterCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Domestic Pump Details</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.domesticPumpDetails}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Flushing Pump Details</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.flushingPumpDetails}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Waste & Utilities</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Waste Type</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.wasteType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Waste Disposal</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.wasteDisposal}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Pipelines</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.pipelines}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Jockry Pump</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.jockryPump}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Building Management Systems</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Facade Cleaning System</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.facadeCleaningSystem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Facade Cleaning Type</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.facadeCleaningType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Access Control System</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.buildingAccessControl}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Building Automation</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.buildingAutomation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">BMS Make</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.bmsMake}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Security & Facilities</h4>
                  <div className="grid grid-cols-4 gap-4 ml-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">CCTV Cameras</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.cctvCameras}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Manned Security Desk</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.mannedSecurityDesk}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Touch Door Alarm</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.touchDoorAlarm}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Landscaping Area</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.landscapingAreaValue}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Indoor Plants</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.indoorPlantsDetails}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Wet Pantry Provided</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.wetPantryProvided}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Water Supply Location</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterSupplyLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Cafeteria Details</p>
                      <p className="text-sm text-gray-900 mt-1">{submittedVersion.cafeteriaDetails}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manpower Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Manpower Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Service Type</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Position</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Shift 1</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Shift 2</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Shift 3</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submittedManpower?.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900">{row.serviceType}</td>
                        <td className="px-4 py-2 text-gray-900">{row.manpowerName}</td>
                        <td className="px-4 py-2 text-center text-gray-600">{row.shift1Count || '-'}</td>
                        <td className="px-4 py-2 text-center text-gray-600">{row.shift2Count || '-'}</td>
                        <td className="px-4 py-2 text-center text-gray-600">{row.shift3Count || '-'}</td>
                        <td className="px-4 py-2 text-center font-semibold text-gray-900">{row.totalManpower}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rejection Reason (if applicable) */}
            {approvalStatus === 'rejected' && rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-900 mb-2">Rejection Reason</p>
                <p className="text-sm text-red-700">{rejectionReason}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Close
            </Button>
            {approvalStatus === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => handleAction('reject')}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction('approve')}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
              </>
            )}
            {approvalStatus !== 'pending' && (
              <Button variant="outline" onClick={handleReopen}>
                Reopen for Corrections
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve Submission' : 'Reject Submission'}
            </DialogTitle>
          </DialogHeader>

          {action === 'reject' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please provide a reason for rejection:
              </p>
              <Textarea
                placeholder="Enter rejection reason..."
                value={localReason}
                onChange={(e) => setLocalReason(e.target.value)}
                className="min-h-24"
              />
            </div>
          )}
          {action === 'approve' && (
            <p className="text-sm text-gray-600">
              Are you sure you want to approve this submission?
            </p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowConfirmation(false);
              setAction(null);
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className={action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
