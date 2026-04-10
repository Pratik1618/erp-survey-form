'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFormContext, type ManpowerRow, type SurveyData } from '@/components/form-context';
import { Eye, Check, X } from 'lucide-react';
import { CheckerView } from './checker-view';
import { getApiUrl } from '@/lib/api-url';

type SurveyListItem = {
  id: string;
  submittedByName: string;
  status: 'pending' | 'approved' | 'rejected';
  surveyData: SurveyData | null;
  manpowerData: ManpowerRow[];
};

type ApiSurveyRecord = {
  surveyId?: string;
  id?: string;
  status?: string;
  clientName?: string;
  siteName?: string;
  createdAt?: string;
  submittedBy?: {
    name?: string;
  };
  surveyData?: SurveyData;
  manpowerData?: ManpowerRow[];
};

function normalizeStatus(status: string | undefined): 'pending' | 'approved' | 'rejected' {
  if (status === 'approved' || status === 'rejected') {
    return status;
  }

  return 'pending';
}

function toSurveyListItem(record: ApiSurveyRecord, index: number): SurveyListItem {
  const surveyData =
    record.surveyData ??
    ({
      clientName: record.clientName ?? '',
      siteName: record.siteName ?? '',
      surveyId: record.surveyId ?? '',
    } as SurveyData);

  return {
    id: record.surveyId || record.id || String(index + 1),
    submittedByName: record.submittedBy?.name || 'Unknown User',
    status: normalizeStatus(record.status),
    surveyData,
    manpowerData: record.manpowerData ?? [],
  };
}

function extractSurveyRecords(payload: unknown): ApiSurveyRecord[] {
  if (Array.isArray(payload)) {
    return payload as ApiSurveyRecord[];
  }

  if (payload && typeof payload === 'object') {
    const candidate = payload as {
      results?: unknown;
      data?: unknown;
      surveys?: unknown;
    };

    if (Array.isArray(candidate.results)) {
      return candidate.results as ApiSurveyRecord[];
    }

    if (candidate.results && typeof candidate.results === 'object') {
      const nestedResults = candidate.results as { surveys?: unknown; items?: unknown; data?: unknown };

      if (Array.isArray(nestedResults.surveys)) {
        return nestedResults.surveys as ApiSurveyRecord[];
      }

      if (Array.isArray(nestedResults.items)) {
        return nestedResults.items as ApiSurveyRecord[];
      }

      if (Array.isArray(nestedResults.data)) {
        return nestedResults.data as ApiSurveyRecord[];
      }
    }

    if (Array.isArray(candidate.data)) {
      return candidate.data as ApiSurveyRecord[];
    }

    if (Array.isArray(candidate.surveys)) {
      return candidate.surveys as ApiSurveyRecord[];
    }
  }

  return [];
}

async function fetchSurveys() {
  const response = await fetch(getApiUrl('/api/survey/view'), {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || 'Failed to load surveys.';
    throw new Error(message);
  }

  return extractSurveyRecords(data).map(toSurveyListItem);
}

export function CheckerTable() {
  const {
    setApprovalStatus,
    setRejectionReason,
    setSubmittedVersion,
    setSubmittedManpower,
  } = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('site-details');
  const [surveys, setSurveys] = useState<SurveyListItem[]>([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadSurveys = async () => {
      setIsLoading(true);
      setError('');

      try {
        const records = await fetchSurveys();
        if (cancelled) {
          return;
        }
        setSurveys(records);
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load surveys.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSurveys();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshSurveys = async () => {
    setError('');
    const records = await fetchSurveys();
    setSurveys(records);
  };

  const selectedSurvey = surveys.find((survey) => survey.id === selectedSurveyId) ?? null;

  const handleDialogChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) {
      setActiveTab('site-details');
    }
  };

  const handleDecisionComplete = async () => {
    setOpenDialog(false);
    await refreshSurveys();
  };

  const handleViewDetails = async (survey: SurveyListItem) => {
    setSelectedSurveyId(survey.id);
    setIsLoadingDetails(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(`/api/survey/${survey.id}`), {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data?.message || data?.error || 'Failed to load survey details.';
        throw new Error(message);
      }

      const details = data?.results;

      setSubmittedVersion(details?.surveyData ?? survey.surveyData);
      setSubmittedManpower(details?.manpowerData ?? survey.manpowerData);
      setApprovalStatus(normalizeStatus(details?.status ?? survey.status));
      setRejectionReason(details?.rejectionReason ?? '');
      setOpenDialog(true);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load survey details.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const getStatusBadge = (status: SurveyListItem['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            <Check className="mr-1 h-4 w-4" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
            <X className="mr-1 h-4 w-4" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
            Pending Review
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-lg text-gray-600">Loading submissions...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (surveys.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-lg text-gray-600">No submissions to review yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
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
            {surveys.map((survey) => (
              <tr key={survey.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{survey.submittedByName}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {survey.surveyData?.clientName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {survey.surveyData?.siteName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {survey.manpowerData
                    .map((item) => item.serviceType)
                    .filter((value, index, all) => value && all.indexOf(value) === index)
                    .join(', ') || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">{getStatusBadge(survey.status)}</td>
                <td className="px-6 py-4 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(survey)}
                    disabled={isLoadingDetails}
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                    {isLoadingDetails && selectedSurveyId === survey.id ? 'Loading...' : 'View Details'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={openDialog} onOpenChange={handleDialogChange}>
        <DialogContent className="flex h-[90vh] w-[95vw] max-w-5xl! flex-col overflow-hidden p-6">
          <div className="flex-1 overflow-y-auto pr-2">
            {selectedSurvey ? (
              <CheckerView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                surveyId={selectedSurvey.id}
                onDecisionComplete={handleDecisionComplete}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
