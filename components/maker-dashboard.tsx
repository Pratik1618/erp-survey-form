'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle2, Clock, Eye, FileText, RefreshCw, XCircle } from 'lucide-react';
import { MakerStepper } from '@/components/maker-stepper';
import { useFormContext, type ManpowerRow, type SurveyData } from '@/components/form-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SiteDetailsReview } from '@/components/reviews/site-details-review';
import { BuildingDetailsReview } from '@/components/reviews/building-details-review';
import { TechnicalDetailsReview } from '@/components/reviews/technical-details-review';
import { ManpowerDetailsReview } from '@/components/reviews/manpower-details-review';
import { getApiUrl } from '@/lib/api-url';

type StatusBadgeVariant = 'default' | 'secondary' | 'destructive';

type SurveyListItem = {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  surveyData: SurveyData | null;
  manpowerData: ManpowerRow[];
  createdAt?: string;
  rejectionReason?: string;
};

type ApiSurveyRecord = {
  surveyId?: string;
  id?: string;
  status?: string;
  createdAt?: string;
  rejectionReason?: string;
  clientName?: string;
  siteName?: string;
  surveyData?: SurveyData;
  manpowerData?: ManpowerRow[];
};

function normalizeStatus(status: string | undefined): 'pending' | 'approved' | 'rejected' {
  if (status === 'approved' || status === 'rejected') {
    return status;
  }

  return 'pending';
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
    status: normalizeStatus(record.status),
    surveyData,
    manpowerData: record.manpowerData ?? [],
    createdAt: record.createdAt,
    rejectionReason: record.rejectionReason,
  };
}

function formatDateTime(value?: string) {
  if (!value) {
    return 'Unknown time';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
}

function getStatusVariant(status: SurveyListItem['status']): StatusBadgeVariant {
  if (status === 'approved') {
    return 'default';
  }

  if (status === 'rejected') {
    return 'destructive';
  }

  return 'secondary';
}

function getStatusIcon(status: SurveyListItem['status']) {
  if (status === 'approved') {
    return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  }

  if (status === 'rejected') {
    return <XCircle className="h-4 w-4 text-red-600" />;
  }

  return <Clock className="h-4 w-4 text-blue-600" />;
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

interface MakerDashboardProps {
  onHeaderActionsChange?: (actions: React.ReactNode | null) => void;
}

export function MakerDashboard({ onHeaderActionsChange }: MakerDashboardProps) {
  const { setSubmittedVersion, setSubmittedManpower, setApprovalStatus, setRejectionReason } = useFormContext();
  const [activeSection, setActiveSection] = useState('new-submission');
  const [detailTab, setDetailTab] = useState('site-details');
  const [surveys, setSurveys] = useState<SurveyListItem[]>([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [seenNotifications, setSeenNotifications] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('maker-seen-notifications');
    if (saved) {
      try {
        setSeenNotifications(JSON.parse(saved) as string[]);
      } catch {
        window.localStorage.removeItem('maker-seen-notifications');
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('maker-seen-notifications', JSON.stringify(seenNotifications));
  }, [seenNotifications]);

  const loadSurveys = async (showSpinner: boolean) => {
    if (showSpinner) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError('');

    try {
      const records = await fetchSurveys();
      setSurveys(records);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load surveys.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadSurveys(true);
  }, []);

  const notifications = useMemo(
    () =>
      surveys.map((survey) => ({
        id: `${survey.id}:${survey.status}`,
        surveyId: survey.id,
        status: survey.status,
        title:
          survey.status === 'approved'
            ? 'Submission approved'
            : survey.status === 'rejected'
              ? 'Submission rejected'
              : 'Submission pending review',
        description:
          survey.status === 'approved'
            ? 'Checker approved your survey.'
            : survey.status === 'rejected'
              ? survey.rejectionReason || 'Checker rejected your survey. Review and resubmit.'
              : 'Your survey is waiting for checker review.',
        createdAt: survey.createdAt,
      })),
    [surveys]
  );

  const unreadNotifications = notifications.filter((item) => !seenNotifications.includes(item.id));
  const selectedSurvey = surveys.find((survey) => survey.id === selectedSurveyId) ?? null;

  const handleOpenNotifications = (open: boolean) => {
    setNotificationOpen(open);
    if (open) {
      setSeenNotifications((previous) => {
        const merged = new Set(previous);
        notifications.forEach((item) => merged.add(item.id));
        return Array.from(merged);
      });
    }
  };

  const headerActions = useMemo(
    () => (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={() => void loadSurveys(false)}
          disabled={isLoading || isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Sheet open={notificationOpen} onOpenChange={handleOpenNotifications}>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" className="relative">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              {unreadNotifications.length > 0 ? (
                <span className="absolute -top-2 -right-2 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {unreadNotifications.length}
                </span>
              ) : null}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Notification Tray</SheetTitle>
              <SheetDescription>
                Status updates for the surveys you submitted.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-7rem)] px-4 pb-4">
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <Card className="border-border bg-card p-4 text-sm text-muted-foreground">
                    No submission notifications yet.
                  </Card>
                ) : (
                  notifications.map((item) => (
                    <Card key={item.id} className="border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(item.status)}
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Survey ID: {item.surveyId} • {formatDateTime(item.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </>
    ),
    [isLoading, isRefreshing, notificationOpen, unreadNotifications.length, notifications]
  );

  useEffect(() => {
    onHeaderActionsChange?.(headerActions);
    return () => {
      onHeaderActionsChange?.(null);
    };
  }, [headerActions, onHeaderActionsChange]);

  const handleViewDetails = async (survey: SurveyListItem) => {
    setSelectedSurveyId(survey.id);
    setDetailTab('site-details');
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
      setRejectionReason(details?.rejectionReason ?? survey.rejectionReason ?? '');
      setDetailOpen(true);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load survey details.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div className="space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border border-slate-200 bg-slate-100 p-1">
          <TabsTrigger
            value="new-submission"
            className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Submission
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Clock className="mr-2 h-4 w-4" />
            Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new-submission" className="space-y-6">
          <MakerStepper />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Total Submitted</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{surveys.length}</p>
            </Card>
            <Card className="border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="mt-2 text-3xl font-semibold text-blue-600">
                {surveys.filter((item) => item.status === 'pending').length}
              </p>
            </Card>
            <Card className="border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Needs Attention</p>
              <p className="mt-2 text-3xl font-semibold text-red-600">
                {surveys.filter((item) => item.status === 'rejected').length}
              </p>
            </Card>
          </div>

          <Card className="overflow-hidden border border-border bg-card">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading your submissions...</div>
            ) : surveys.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No submissions found yet. Use the form tab to create your first survey.
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Survey ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Client</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Site</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Submitted</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm text-foreground">{survey.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {survey.surveyData?.clientName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {survey.surveyData?.siteName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDateTime(survey.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Badge variant={getStatusVariant(survey.status)}>
                          {survey.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => void handleViewDetails(survey)}
                          disabled={isLoadingDetails}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {isLoadingDetails && selectedSurveyId === survey.id ? 'Loading...' : 'View'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) {
            setDetailTab('site-details');
          }
        }}
      >
         <DialogContent className="flex h-[90vh] w-[95vw] max-w-5xl! flex-col overflow-hidden p-6">
          <DialogHeader>
            <DialogTitle>Submitted Survey Details</DialogTitle>
            <DialogDescription>
              Review exactly what was submitted and its current checker status.
            </DialogDescription>
          </DialogHeader>

          {selectedSurvey ? (
            <div className="flex-1 overflow-hidden">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant={getStatusVariant(selectedSurvey.status)}>
                  {selectedSurvey.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Survey ID: {selectedSurvey.id}
                </span>
                <span className="text-sm text-muted-foreground">
                  Submitted: {formatDateTime(selectedSurvey.createdAt)}
                </span>
              </div>

              {selectedSurvey.status === 'rejected' && selectedSurvey.rejectionReason ? (
                <Alert className="mb-4 border-destructive bg-destructive/10">
                  <AlertDescription>{selectedSurvey.rejectionReason}</AlertDescription>
                </Alert>
              ) : null}

              <div className="h-[calc(100%-4rem)] overflow-y-auto pr-2">
                <Tabs value={detailTab} onValueChange={setDetailTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 rounded-xl border border-slate-200 bg-slate-100 p-1">
                    <TabsTrigger
                      value="site-details"
                      className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      Site Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="building-details"
                      className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      Building Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="technical-details"
                      className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      Technical Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="manpower-details"
                      className="rounded-lg text-slate-600 transition-colors hover:text-slate-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
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
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
