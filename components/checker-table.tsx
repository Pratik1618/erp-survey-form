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
import { CheckerView } from './checker-view';

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
  const [activeTab, setActiveTab] = useState('site-details');

  if (!submittedVersion) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600 text-lg">No submissions to review yet.</p>
      </Card>
    );
  }
   const handleDialogChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) {
      setActiveTab('site-details');
    }
  };

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
    <Dialog open={openDialog} onOpenChange={handleDialogChange}>
        <DialogContent
    className="
    !max-w-5xl 
    w-[90vw] 
    h-[85vh] 
    p-6 
    overflow-hidden 
    flex 
    flex-col
    "
  >
            <div className="flex-1 overflow-y-auto pr-2">
      <CheckerView activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
