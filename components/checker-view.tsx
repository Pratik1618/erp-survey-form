'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form-context';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SiteDetailsReview } from '@/components/reviews/site-details-review';
import { BuildingDetailsReview } from '@/components/reviews/building-details-review';
import { TechnicalDetailsReview } from '@/components/reviews/technical-details-review';
import { ManpowerDetailsReview } from '@/components/reviews/manpower-details-review';

interface CheckerViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CheckerView({ activeTab, setActiveTab }: CheckerViewProps) {
  const {
    submittedVersion,
    submittedManpower,
    approvalStatus,
    setApprovalStatus,
    rejectionReason,
    setRejectionReason,
    setSurveyData,
    setManpowerData,
  } = useFormContext();

  const [showRejectionReason, setShowRejectionReason] = useState(false);

  const hasSubmission = submittedVersion !== null;

  const handleApprove = () => {
    if (submittedVersion) {
      setSurveyData(submittedVersion);
    }
    if (submittedManpower) {
      setManpowerData(submittedManpower);
    }
    setApprovalStatus('approved');
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setApprovalStatus('rejected');
  };

  const handleReopen = () => {
    setApprovalStatus('pending');
    setRejectionReason('');
    setShowRejectionReason(false);
  };

  if (!hasSubmission) {
    return (
      <Alert className="border-primary bg-primary/10">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          No submissions pending review. Switch to Maker mode to submit a form for approval.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {approvalStatus === 'approved' && (
              <>
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground">Approved</h3>
                  <p className="text-sm text-muted-foreground">
                    Form has been approved and saved
                  </p>
                </div>
              </>
            )}
            {approvalStatus === 'rejected' && (
              <>
                <XCircle className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold text-foreground">Rejected</h3>
                  <p className="text-sm text-muted-foreground">
                    Form has been returned to maker for corrections
                  </p>
                </div>
              </>
            )}
            {approvalStatus === 'pending' && (
              <>
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Pending Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Review the form details and make a decision
                  </p>
                </div>
              </>
            )}
          </div>
          <Badge
            variant={
              approvalStatus === 'approved'
                ? 'default'
                : approvalStatus === 'rejected'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
          </Badge>
        </div>
      </Card>

      {approvalStatus === 'rejected' && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-foreground">
            <strong>Rejection Reason:</strong>
            <p className="mt-2">{rejectionReason}</p>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border border-gray-200 text-gray-700">
          <TabsTrigger value="site-details" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Site Details
          </TabsTrigger>
          <TabsTrigger value="building-details" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Building Details
          </TabsTrigger>
          <TabsTrigger value="technical-details" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Technical Details
          </TabsTrigger>
          <TabsTrigger value="manpower-details" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Manpower
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site-details" className="space-y-6">
          <SiteDetailsReview />
        </TabsContent>

        <TabsContent value="building-details" className="space-y-6">
          <BuildingDetailsReview />
        </TabsContent>

        <TabsContent value="technical-details" className="space-y-6">
          <TechnicalDetailsReview />
        </TabsContent>

        <TabsContent value="manpower-details" className="space-y-6">
          <ManpowerDetailsReview />
        </TabsContent>
      </Tabs>

      {approvalStatus === 'pending' && activeTab === 'manpower-details' && (
        <>
          <Card className="bg-card border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Rejection Reason (if applicable)</h3>
            {!showRejectionReason ? (
              <Button
                variant="outline"
                onClick={() => setShowRejectionReason(true)}
                className="w-full"
              >
                Add Rejection Reason
              </Button>
            ) : (
              <Textarea
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="bg-background text-foreground border-border min-h-25"
              />
            )}
          </Card>

          <Card className="bg-card border-border p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Make a Decision</h3>
              <p className="text-sm text-muted-foreground">
                Review the form and approve or reject the submission
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleReject}
                variant="destructive"
                className="bg-destructive hover:bg-destructive/90"
              >
                Reject
              </Button>
              <Button onClick={handleApprove} >
                Approve
              </Button>
            </div>
          </Card>
        </>
      )}

      {approvalStatus === 'approved' && (
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Submission Approved</h3>
              <p className="text-sm text-muted-foreground">
                The form has been successfully approved and saved to the system
              </p>
            </div>
            <Button
              onClick={handleReopen}
              variant="outline"
              className="border-border hover:bg-card bg-transparent"
            >
              Open for Changes
            </Button>
          </div>
        </Card>
      )}

      {approvalStatus === 'rejected' && (
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Submission Rejected</h3>
              <p className="text-sm text-muted-foreground">
                The maker can now make corrections and resubmit
              </p>
            </div>
            <Button
              onClick={handleReopen}
              variant="outline"
              className="border-border hover:bg-card bg-transparent"
            >
              Open for Resubmission
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
