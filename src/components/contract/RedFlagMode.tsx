import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, AlertCircle, Filter, Download } from "lucide-react";

interface ContractClause {
  id: string;
  title: string;
  content: string;
  riskLevel: "safe" | "moderate" | "dangerous";
  category: string;
  explanation: string;
  recommendation: string;
}

const mockClauses: ContractClause[] = [
  {
    id: "1",
    title: "Rent Due Date",
    content: "Monthly rent payment due on the 1st of each month",
    riskLevel: "safe",
    category: "Payment Terms",
    explanation: "Standard payment schedule with clear deadline",
    recommendation: "No action needed - this is a standard clause"
  },
  {
    id: "2", 
    title: "Late Payment Fee",
    content: "Late fee of ₹500 per day for payments received after due date",
    riskLevel: "moderate",
    category: "Penalties",
    explanation: "High daily penalty rate that can accumulate quickly",
    recommendation: "Negotiate a grace period or reduced daily rate"
  },
  {
    id: "3",
    title: "Security Deposit Policy",
    content: "Security deposit is non-refundable under any circumstances",
    riskLevel: "dangerous",
    category: "Financial Terms",
    explanation: "Completely non-refundable deposits may violate tenant rights",
    recommendation: "This clause may be legally unenforceable - seek legal advice"
  },
  {
    id: "4",
    title: "Property Maintenance",
    content: "Landlord responsible for major repairs and maintenance",
    riskLevel: "safe",
    category: "Responsibilities",
    explanation: "Clear allocation of maintenance responsibilities",
    recommendation: "Good clause that protects tenant interests"
  },
  {
    id: "5",
    title: "Termination Clause",
    content: "Landlord may terminate lease with 24 hours notice for any reason",
    riskLevel: "dangerous",
    category: "Termination",
    explanation: "Extremely short notice period with no cause requirement",
    recommendation: "Demand at least 30-day notice and valid termination reasons"
  }
];

export const RedFlagMode = () => {
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [filteredClauses, setFilteredClauses] = useState(mockClauses);

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "safe": return <CheckCircle className="w-4 h-4" />;
      case "moderate": return <AlertCircle className="w-4 h-4" />;
      case "dangerous": return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "success";
      case "moderate": return "warning";
      case "dangerous": return "danger";
      default: return "secondary";
    }
  };

  const getRiskEmoji = (level: string) => {
    switch (level) {
      case "safe": return "🟢";
      case "moderate": return "🟡";
      case "dangerous": return "🔴";
      default: return "⚪";
    }
  };

  const filterByRisk = (risk: string) => {
    setSelectedRisk(risk);
    if (risk === "all") {
      setFilteredClauses(mockClauses);
    } else {
      setFilteredClauses(mockClauses.filter(clause => clause.riskLevel === risk));
    }
  };

  const riskCounts = {
    safe: mockClauses.filter(c => c.riskLevel === "safe").length,
    moderate: mockClauses.filter(c => c.riskLevel === "moderate").length,
    dangerous: mockClauses.filter(c => c.riskLevel === "dangerous").length
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" />
          Red Flag Mode - Risk Heatmap
        </CardTitle>
        <CardDescription>
          Visual heatmap of contract clauses marked by risk level with detailed explanations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => filterByRisk("all")}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{mockClauses.length}</div>
              <div className="text-sm text-muted-foreground">Total Clauses</div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-success/20"
                onClick={() => filterByRisk("safe")}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                🟢 {riskCounts.safe}
              </div>
              <div className="text-sm text-muted-foreground">Safe Clauses</div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-warning/20"
                onClick={() => filterByRisk("moderate")}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning flex items-center justify-center gap-1">
                🟡 {riskCounts.moderate}
              </div>
              <div className="text-sm text-muted-foreground">Moderate Risk</div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-danger/20"
                onClick={() => filterByRisk("dangerous")}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger flex items-center justify-center gap-1">
                🔴 {riskCounts.dangerous}
              </div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by risk:</span>
            <div className="flex gap-2">
              {["all", "safe", "moderate", "dangerous"].map((risk) => (
                <Button
                  key={risk}
                  variant={selectedRisk === risk ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterByRisk(risk)}
                  className="capitalize"
                >
                  {risk === "all" ? "All" : risk}
                </Button>
              ))}
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Risk Report
          </Button>
        </div>

        {/* Clause Risk Analysis */}
        <div className="space-y-4">
          {filteredClauses.map((clause) => (
            <Card key={clause.id} 
                  className={`transition-all hover:shadow-md ${
                    clause.riskLevel === "dangerous" ? "border-danger/30 bg-danger/5" :
                    clause.riskLevel === "moderate" ? "border-warning/30 bg-warning/5" :
                    "border-success/30 bg-success/5"
                  }`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getRiskEmoji(clause.riskLevel)}</span>
                        <h3 className="font-semibold text-foreground">{clause.title}</h3>
                        <Badge variant={getRiskColor(clause.riskLevel) as any} className="text-xs">
                          {getRiskIcon(clause.riskLevel)}
                          {clause.riskLevel}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {clause.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Clause Content */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Clause Text:</div>
                      <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg italic">
                        "{clause.content}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Risk Explanation:</div>
                        <p className="text-sm text-foreground">{clause.explanation}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Recommendation:</div>
                        <p className="text-sm text-foreground">{clause.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClauses.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No clauses found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filter settings to see more results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};