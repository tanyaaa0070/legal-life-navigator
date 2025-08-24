import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building, Scale, Eye } from "lucide-react";

interface ClauseAnalysis {
  id: string;
  clause: string;
  yourPerspective: string;
  theirPerspective: string;
  legalPerspective: string;
  impact: "positive" | "negative" | "neutral";
  urgency: "high" | "medium" | "low";
}

const mockClauses: ClauseAnalysis[] = [
  {
    id: "1",
    clause: "Monthly rent shall increase by 15% every 6 months",
    yourPerspective: "This clause significantly increases my housing costs over time, making the lease expensive in the long run.",
    theirPerspective: "Landlord wants to protect against inflation and ensure rental income keeps pace with market rates.",
    legalPerspective: "Legally enforceable only if tenant is notified in writing 30 days before each increase takes effect.",
    impact: "negative",
    urgency: "high"
  },
  {
    id: "2",
    clause: "No pets allowed on the premises",
    yourPerspective: "This restricts my lifestyle choices and ability to have companion animals.",
    theirPerspective: "Property owner wants to avoid potential damage, noise complaints, and additional cleaning costs.",
    legalPerspective: "Standard clause that is generally enforceable, but may have exceptions for service animals under disability laws.",
    impact: "negative",
    urgency: "medium"
  },
  {
    id: "3",
    clause: "Security deposit refundable upon move-out inspection",
    yourPerspective: "This protects my financial interests if I maintain the property in good condition.",
    theirPerspective: "Provides financial security against potential property damage or unpaid rent.",
    legalPerspective: "Must comply with local laws regarding maximum deposit amounts and timeline for refund after move-out.",
    impact: "positive",
    urgency: "low"
  }
];

export const DualView = () => {
  const [selectedClause, setSelectedClause] = useState<ClauseAnalysis>(mockClauses[0]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "success";
      case "negative": return "danger";
      default: return "secondary";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "danger";
      case "medium": return "warning";
      default: return "success";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-analysis" />
          Dual-View Analysis
        </CardTitle>
        <CardDescription>
          See each clause from 3 perspectives: Yours, Theirs, and Legal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Clause Selection */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Select a Clause to Analyze</h3>
          <div className="space-y-2">
            {mockClauses.map((clause) => (
              <div
                key={clause.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedClause.id === clause.id
                    ? "border-analysis bg-accent"
                    : "border-border hover:border-analysis/50"
                }`}
                onClick={() => setSelectedClause(clause)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-foreground flex-1">{clause.clause}</p>
                  <div className="flex gap-2 shrink-0">
                    <Badge variant={getImpactColor(clause.impact) as any} className="text-xs">
                      {clause.impact}
                    </Badge>
                    <Badge variant={getUrgencyColor(clause.urgency) as any} className="text-xs">
                      {clause.urgency}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three-Perspective Analysis */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Multi-Perspective Analysis</h3>
          
          <Tabs defaultValue="your" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="your" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Your View
              </TabsTrigger>
              <TabsTrigger value="their" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Their View
              </TabsTrigger>
              <TabsTrigger value="legal" className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Legal View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="your">
              <Card className="border-legal/20 bg-legal/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-legal" />
                    Your Perspective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{selectedClause.yourPerspective}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant={getImpactColor(selectedClause.impact) as any}>
                      Impact: {selectedClause.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="their">
              <Card className="border-analysis/20 bg-analysis/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building className="w-4 h-4 text-analysis" />
                    Their Perspective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{selectedClause.theirPerspective}</p>
                  <div className="mt-3">
                    <Badge variant="outline" className="border-analysis text-analysis">
                      Business Interest
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scale className="w-4 h-4 text-primary" />
                    Legal Perspective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{selectedClause.legalPerspective}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className="border-primary text-primary">
                      Legal Requirement
                    </Badge>
                    <Badge variant={getUrgencyColor(selectedClause.urgency) as any}>
                      {selectedClause.urgency} priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Summary Card */}
        <Card className="bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-legal mb-1">Your Concern</div>
                <div className="text-muted-foreground">
                  {selectedClause.impact === "negative" ? "Cost increase" : "Beneficial terms"}
                </div>
              </div>
              <div>
                <div className="font-medium text-analysis mb-1">Their Motivation</div>
                <div className="text-muted-foreground">Risk mitigation</div>
              </div>
              <div>
                <div className="font-medium text-primary mb-1">Legal Status</div>
                <div className="text-muted-foreground">
                  {selectedClause.urgency === "high" ? "Requires attention" : "Standard clause"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};