import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, TrendingDown, MapPin, Briefcase, Home } from "lucide-react";

interface ComparisonData {
  category: string;
  yourValue: string | number;
  averageValue: string | number;
  percentile: number;
  trend: "better" | "worse" | "average";
  insight: string;
}

interface MarketData {
  location: string;
  contractType: string;
  sampleSize: number;
  comparisons: ComparisonData[];
}

const mockMarketData: MarketData = {
  location: "Bangalore, India",
  contractType: "Rental Agreement",
  sampleSize: 1247,
  comparisons: [
    {
      category: "Monthly Rent",
      yourValue: "₹25,000",
      averageValue: "₹28,500",
      percentile: 25,
      trend: "better",
      insight: "Your rent is 12% below market average for similar properties"
    },
    {
      category: "Security Deposit",
      yourValue: "6 months",
      averageValue: "3.2 months",
      percentile: 85,
      trend: "worse",
      insight: "Your security deposit is significantly higher than 70% of tenants"
    },
    {
      category: "Notice Period",
      yourValue: "60 days",
      averageValue: "45 days",
      percentile: 65,
      trend: "worse",
      insight: "Your notice period is longer than standard market terms"
    },
    {
      category: "Maintenance Responsibility",
      yourValue: "Tenant pays",
      averageValue: "Split 60/40",
      percentile: 75,
      trend: "worse",
      insight: "Most tenants share maintenance costs with landlords"
    },
    {
      category: "Pet Policy",
      yourValue: "Not allowed",
      averageValue: "Allowed with deposit",
      percentile: 80,
      trend: "worse",
      insight: "80% of similar properties allow pets with additional deposit"
    }
  ]
};

const marketInsights = {
  strengths: [
    "Competitive rental rate - saving ₹3,500/month vs market",
    "Fixed rent for 12 months - protection against increases",
    "Inclusive utilities - simplified billing structure"
  ],
  weaknesses: [
    "High security deposit - ₹75,000 above market standard",
    "Restrictive pet policy - limits lifestyle flexibility",
    "Full maintenance burden - unusual for this property type"
  ],
  opportunities: [
    "Negotiate security deposit reduction during renewal",
    "Request pet policy amendment with additional deposit",
    "Propose maintenance cost sharing arrangement"
  ]
};

export const SocialMirror = () => {
  const [selectedLocation, setSelectedLocation] = useState("bangalore");
  const [selectedContractType, setSelectedContractType] = useState("rental");

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "better": return <TrendingUp className="w-4 h-4 text-success" />;
      case "worse": return <TrendingDown className="w-4 h-4 text-danger" />;
      default: return <div className="w-4 h-4 bg-warning rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "better": return "success";
      case "worse": return "danger";
      default: return "warning";
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile <= 25) return "success";
    if (percentile <= 75) return "warning";
    return "danger";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-analysis" />
          Social Mirror Mode
        </CardTitle>
        <CardDescription>
          Compare your contract terms with others in your area and get market insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Market Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Bangalore, India
                  </div>
                </SelectItem>
                <SelectItem value="mumbai">Mumbai, India</SelectItem>
                <SelectItem value="delhi">Delhi, India</SelectItem>
                <SelectItem value="pune">Pune, India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Contract Type</label>
            <Select value={selectedContractType} onValueChange={setSelectedContractType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rental">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Rental Agreement
                  </div>
                </SelectItem>
                <SelectItem value="employment">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Employment Contract
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Market Overview */}
        <Card className="bg-analysis/5 border-analysis/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Market Overview</h3>
              <Badge variant="outline" className="text-xs">
                {mockMarketData.sampleSize.toLocaleString()} contracts analyzed
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-foreground">Location</div>
                <div className="text-muted-foreground">{mockMarketData.location}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Contract Type</div>
                <div className="text-muted-foreground">{mockMarketData.contractType}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Data Freshness</div>
                <div className="text-muted-foreground">Updated daily</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparisons */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Detailed Term Comparisons</h3>
          
          {mockMarketData.comparisons.map((comparison, index) => (
            <Card key={index} className="border-l-4 border-l-analysis">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{comparison.category}</h4>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(comparison.trend)}
                      <Badge variant={getTrendColor(comparison.trend) as any} className="text-xs">
                        {comparison.trend}
                      </Badge>
                    </div>
                  </div>

                  {/* Values Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Your Value:</div>
                      <div className="font-semibold text-foreground">{comparison.yourValue}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Market Average:</div>
                      <div className="font-semibold text-foreground">{comparison.averageValue}</div>
                    </div>
                  </div>

                  {/* Percentile */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Your position vs market:</span>
                      <span className="font-medium text-foreground">
                        {comparison.percentile}th percentile
                      </span>
                    </div>
                    <Progress 
                      value={comparison.percentile} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      {comparison.trend === "better" ? "Better than" : "Worse than"} {100 - comparison.percentile}% of similar contracts
                    </div>
                  </div>

                  {/* Insight */}
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Market Insight:</div>
                    <p className="text-sm text-foreground">{comparison.insight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-success/30 bg-success/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-success flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {marketInsights.strengths.map((strength, index) => (
                <div key={index} className="text-sm text-foreground">
                  • {strength}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-danger/30 bg-danger/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-danger flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {marketInsights.weaknesses.map((weakness, index) => (
                <div key={index} className="text-sm text-foreground">
                  • {weakness}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-analysis/30 bg-analysis/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-analysis flex items-center gap-2">
                <Users className="w-4 h-4" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {marketInsights.opportunities.map((opportunity, index) => (
                <div key={index} className="text-sm text-foreground">
                  • {opportunity}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline">
            Download Market Report
          </Button>
          <Button variant="outline">
            Set Market Alerts
          </Button>
          <Button>
            Get Negotiation Tips
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};