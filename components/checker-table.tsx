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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Built-up Area</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.builtUpArea} sq ft</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Floors</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.floors}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Total Employees</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.totalEmployees}</p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Technical Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Generator Capacity</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.generatorCapacity}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">AC Type</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.acType}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Fire System</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.sprinklerSystem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Water Source</p>
                  <p className="text-sm text-gray-900 mt-1">{submittedVersion.waterSource}</p>
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
