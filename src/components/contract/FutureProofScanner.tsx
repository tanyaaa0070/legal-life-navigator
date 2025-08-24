import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Calendar, AlertTriangle, TrendingUp, Shield, Gavel } from "lucide-react";

interface LegalUpdate {
  id: string;
  title: string;
  description: string;
  effectiveDate: string;
  impact: "high" | "medium" | "low";
  category: "tenant_rights" | "rent_control" | "security_deposits" | "termination" | "maintenance";
  currentClause: string;
  recommendedAction: string;
  complianceStatus: "compliant" | "needs_update" | "at_risk";
}

const mockLegalUpdates: LegalUpdate[] = [
  {
    id: "1",
    title: "Security Deposit Limit Reduction",
    description: "New rental law limits security deposits to maximum 2 months rent for residential properties",
    effectiveDate: "January 2026",
    impact: "high",
    category: "security_deposits",
    currentClause: "Security deposit of 6 months rent required upon lease signing",
    recommendedAction: "Renegotiate security deposit to comply with new 2-month limit. Request refund of excess amount.",
    complianceStatus: "at_risk"
  },
  {
    id: "2",
    title: "Maintenance Cost Sharing Requirements",
    description: "Landlords now required to cover at least 60% of major maintenance costs for properties over 5 years old",
    effectiveDate: "March 2026",
    impact: "medium",
    category: "maintenance",
    currentClause: "Tenant responsible for all maintenance and repair costs",
    recommendedAction: "Request lease amendment to reflect new cost-sharing requirements for major repairs.",
    complianceStatus: "needs_update"
  },
  {
    id: "3",
    title: "Termination Notice Period Standardization",
    description: "Minimum 30-day notice period required for lease terminations by either party",
    effectiveDate: "June 2026",
    impact: "low",
    category: "termination",
    currentClause: "Either party may terminate with 60 days written notice",
    recommendedAction: "Current clause already complies with new minimum requirements. No action needed.",
    complianceStatus: "compliant"
  },
  {
    id: "4",
    title: "Pet Policy Standardization",
    description: "Blanket pet bans prohibited; landlords must allow pets with reasonable restrictions and deposits",
    effectiveDate: "September 2026",
    impact: "medium",
    category: "tenant_rights",
    currentClause: "No pets allowed on premises under any circumstances",
    recommendedAction: "Request pet policy amendment allowing pets with additional deposit and insurance requirements.",
    complianceStatus: "needs_update"
  }
];

const complianceStats = {
  total: mockLegalUpdates.length,
  compliant: mockLegalUpdates.filter(u => u.complianceStatus === "compliant").length,
  needsUpdate: mockLegalUpdates.filter(u => u.complianceStatus === "needs_update").length,
  atRisk: mockLegalUpdates.filter(u => u.complianceStatus === "at_risk").length
};

export const FutureProofScanner = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredUpdates, setFilteredUpdates] = useState(mockLegalUpdates);
  const [isScanning, setIsScanning] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredUpdates(mockLegalUpdates);
    } else {
      setFilteredUpdates(mockLegalUpdates.filter(update => update.category === category));
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "success";
      case "needs_update": return "warning";
      case "at_risk": return "danger";
      default: return "secondary";
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case "compliant": return "✅";
      case "needs_update": return "⚠️";
      case "at_risk": return "🚨";
      default: return "📋";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tenant_rights": return <Shield className="w-4 h-4" />;
      case "rent_control": return <TrendingUp className="w-4 h-4" />;
      case "security_deposits": return "💰";
      case "termination": return <Calendar className="w-4 h-4" />;
      case "maintenance": return "🔧";
      default: return <Gavel className="w-4 h-4" />;
    }
  };

  const categories = Array.from(new Set(mockLegalUpdates.map(u => u.category)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-legal" />
          Future-Proof Scanner
        </CardTitle>
        <CardDescription>
          Stay ahead of upcoming law changes that might affect your contract
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scan Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Legal Compliance Scan</h3>
            <p className="text-sm text-muted-foreground">Last scanned: Today, 2:30 PM</p>
          </div>
          <Button onClick={runScan} disabled={isScanning}>
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Run New Scan
              </>
            )}
          </Button>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{complianceStats.total}</div>
              <div className="text-sm text-muted-foreground">Legal Updates</div>
            </CardContent>
          </Card>
          
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                ✅ {complianceStats.compliant}
              </div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </CardContent>
          </Card>
          
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning flex items-center justify-center gap-1">
                ⚠️ {complianceStats.needsUpdate}
              </div>
              <div className="text-sm text-muted-foreground">Needs Update</div>
            </CardContent>
          </Card>
          
          <Card className="bg-danger/10 border-danger/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger flex items-center justify-center gap-1">
                🚨 {complianceStats.atRisk}
              </div>
              <div className="text-sm text-muted-foreground">At Risk</div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Progress */}
        <Card className="bg-legal/5 border-legal/20">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Overall Compliance Score</h4>
                <Badge variant="secondary" className="text-xs">
                  {Math.round((complianceStats.compliant / complianceStats.total) * 100)}%
                </Badge>
              </div>
              <Progress 
                value={(complianceStats.compliant / complianceStats.total) * 100} 
                className="h-3"
              />
              <div className="text-sm text-muted-foreground">
                {complianceStats.compliant} out of {complianceStats.total} upcoming changes are already compliant
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => filterByCategory("all")}
          >
            All Updates
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => filterByCategory(category)}
              className="capitalize"
            >
              {getCategoryIcon(category)}
              {category.replace("_", " ")}
            </Button>
          ))}
        </div>

        {/* Legal Updates List */}
        <div className="space-y-4">
          {filteredUpdates.map((update) => (
            <Card key={update.id} 
                  className={`transition-all ${
                    update.complianceStatus === "at_risk" ? "border-danger/30 bg-danger/5" :
                    update.complianceStatus === "needs_update" ? "border-warning/30 bg-warning/5" :
                    "border-success/30 bg-success/5"
                  }`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getComplianceIcon(update.complianceStatus)}</span>
                        <h4 className="font-semibold text-foreground">{update.title}</h4>
                        <Badge variant={getImpactColor(update.impact) as any} className="text-xs">
                          {update.impact} impact
                        </Badge>
                        <Badge variant={getComplianceColor(update.complianceStatus) as any} className="text-xs">
                          {update.complianceStatus.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(update.category)}
                          {update.category.replace("_", " ")}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Effective: {update.effectiveDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground">{update.description}</p>

                  {/* Current vs Future */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Current Clause:</div>
                      <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                        <p className="text-sm text-foreground italic">"{update.currentClause}"</p>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Recommended Action:</div>
                      <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                        <p className="text-sm text-foreground">{update.recommendedAction}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {update.complianceStatus !== "compliant" && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        Get Legal Template
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Reminder
                      </Button>
                      <Button size="sm">
                        Contact Lawyer
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Panel */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about new legal changes that might affect your contracts
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Set Alerts
                </Button>
                <Button size="sm">
                  Subscribe to Updates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};