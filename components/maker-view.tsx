'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form-context';
import { SiteDetailsForm } from '@/components/forms/site-details-form';
import { BuildingDetailsForm } from '@/components/forms/building-details-form';
import { TechnicalDetailsForm } from '@/components/forms/technical-details-form';
import { ManpowerDetailsForm } from '@/components/forms/manpower-details-form';
import { Card } from '@/components/ui/card';
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MakerViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MakerView({ activeTab, setActiveTab }: MakerViewProps) {
  const { surveyData, setSurveyData, manpowerData, setManpowerData, setSubmittedVersion, setSubmittedManpower, setApprovalStatus } = useFormContext();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setSubmittedVersion(JSON.parse(JSON.stringify(surveyData)));
    setSubmittedManpower(JSON.parse(JSON.stringify(manpowerData)));
    setApprovalStatus('pending');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {submitted && (
        <Alert className="border-accent bg-accent/10">
          <Check className="h-4 w-4 text-accent" />
          <AlertDescription className="text-foreground">
            Form submitted successfully! Switch to Checker mode to review and approve.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
          <TabsTrigger value="site-details" className="data-[state=active]:bg-primary">
            Site Details
          </TabsTrigger>
          <TabsTrigger value="building-details" className="data-[state=active]:bg-primary">
            Building Details
          </TabsTrigger>
          <TabsTrigger value="technical-details" className="data-[state=active]:bg-primary">
            Technical Details
          </TabsTrigger>
          <TabsTrigger value="manpower-details" className="data-[state=active]:bg-primary">
            Manpower
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site-details" className="space-y-6">
          <SiteDetailsForm />
        </TabsContent>

        <TabsContent value="building-details" className="space-y-6">
          <BuildingDetailsForm />
        </TabsContent>

        <TabsContent value="technical-details" className="space-y-6">
          <TechnicalDetailsForm />
        </TabsContent>

        <TabsContent value="manpower-details" className="space-y-6">
          <ManpowerDetailsForm />
        </TabsContent>
      </Tabs>

      <Card className="bg-card border-border p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Ready to Submit?</h3>
          <p className="text-sm text-muted-foreground">
            Submit the form for checker review and approval
          </p>
        </div>
        <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90">
          Submit for Review
        </Button>
      </Card>
    </div>
  );
}
