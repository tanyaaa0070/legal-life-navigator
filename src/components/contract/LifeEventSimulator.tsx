import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Play, AlertCircle, DollarSign, Clock, MapPin } from "lucide-react";

interface LifeEvent {
  id: string;
  name: string;
  description: string;
  category: "relocation" | "family" | "career" | "health" | "financial";
  icon: string;
}

interface SimulationResult {
  event: LifeEvent;
  contractImpact: string;
  financialImpact: {
    amount: string;
    description: string;
    type: "cost" | "saving" | "neutral";
  };
  legalConsequences: string[];
  recommendations: string[];
  timeline: string;
  riskLevel: "low" | "medium" | "high";
}

const lifeEvents: LifeEvent[] = [
  {
    id: "relocate-abroad",
    name: "Relocate Abroad",
    description: "Moving to another country for work or personal reasons",
    category: "relocation",
    icon: "✈️"
  },
  {
    id: "job-loss",
    name: "Job Loss",
    description: "Unexpected unemployment or termination",
    category: "career",
    icon: "💼"
  },
  {
    id: "marriage",
    name: "Getting Married",
    description: "Adding spouse to household and potentially to lease",
    category: "family",
    icon: "💒"
  },
  {
    id: "medical-emergency",
    name: "Medical Emergency",
    description: "Serious health issue requiring extended treatment",
    category: "health",
    icon: "🏥"
  },
  {
    id: "business-start",
    name: "Starting a Business",
    description: "Launching a business from home or changing work arrangement",
    category: "career",
    icon: "🚀"
  },
  {
    id: "pet-adoption",
    name: "Adopting a Pet",
    description: "Bringing a pet into the household",
    category: "family",
    icon: "🐕"
  }
];

const mockSimulations: { [key: string]: SimulationResult } = {
  "relocate-abroad": {
    event: lifeEvents[0],
    contractImpact: "Your rental contract requires 3 months advance notice for early termination. You'll need to pay 3 months additional rent as penalty if leaving before lease completion.",
    financialImpact: {
      amount: "₹75,000",
      description: "3 months penalty rent plus forfeited security deposit",
      type: "cost"
    },
    legalConsequences: [
      "Must provide 90 days written notice",
      "Penalty payment required within 15 days of notice",
      "Security deposit may be forfeited",
      "Landlord may pursue legal action if penalty not paid"
    ],
    recommendations: [
      "Start negotiation with landlord 6 months before planned move",
      "Propose finding replacement tenant to reduce penalty",
      "Document all communications regarding early termination",
      "Consider subletting if permitted by contract"
    ],
    timeline: "3-6 months advance planning required",
    riskLevel: "high"
  },
  "job-loss": {
    event: lifeEvents[1],
    contractImpact: "Without steady income, you may struggle to meet rent obligations. Your contract doesn't include unemployment provisions, making you liable for full rent throughout lease term.",
    financialImpact: {
      amount: "₹125,000",
      description: "5 months remaining rent liability",
      type: "cost"
    },
    legalConsequences: [
      "Rent remains due regardless of employment status",
      "Late fees apply after 5-day grace period",
      "Eviction proceedings possible after 15 days default",
      "Credit impact from missed payments"
    ],
    recommendations: [
      "Immediately communicate with landlord about situation",
      "Explore temporary rent reduction or payment plan",
      "Review government assistance programs",
      "Consider subletting or roommate arrangements"
    ],
    timeline: "Immediate action required within 30 days",
    riskLevel: "high"
  }
};

export const LifeEventSimulator = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    if (!selectedEvent) return;

    setIsSimulating(true);
    
    setTimeout(() => {
      const result = mockSimulations[selectedEvent];
      setSimulationResult(result);
      setIsSimulating(false);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "relocation": return <MapPin className="w-4 h-4" />;
      case "family": return "👨‍👩‍👧‍👦";
      case "career": return "💼";
      case "health": return "🏥";
      case "financial": return <DollarSign className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "relocation": return "legal";
      case "family": return "success"; 
      case "career": return "analysis";
      case "health": return "warning";
      case "financial": return "coach";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "danger";
      default: return "secondary";
    }
  };

  const getFinancialImpactColor = (type: string) => {
    switch (type) {
      case "cost": return "danger";
      case "saving": return "success";
      default: return "warning";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-coach" />
          Life Event Simulator
        </CardTitle>
        <CardDescription>
          Run future scenarios to understand how life changes might impact your contract
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select a Life Event to Simulate
            </label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a scenario..." />
              </SelectTrigger>
              <SelectContent>
                {lifeEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{event.icon}</span>
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-xs text-muted-foreground">{event.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={runSimulation} 
            disabled={!selectedEvent || isSimulating}
            className="w-full"
          >
            {isSimulating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Running Simulation...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Life Event Simulation
              </>
            )}
          </Button>
        </div>

        {/* Event Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Array.from(new Set(lifeEvents.map(e => e.category))).map((category) => {
            const categoryEvents = lifeEvents.filter(e => e.category === category);
            return (
              <Card key={category} className="p-3 text-center">
                <div className="text-lg mb-1">{getCategoryIcon(category)}</div>
                <div className="text-xs font-medium text-foreground capitalize">{category}</div>
                <div className="text-xs text-muted-foreground">{categoryEvents.length} scenarios</div>
              </Card>
            );
          })}
        </div>

        {/* Simulation Results */}
        {simulationResult && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">Simulation Results</h3>
              <Badge variant={getRiskColor(simulationResult.riskLevel) as any}>
                {simulationResult.riskLevel} risk
              </Badge>
            </div>

            {/* Event Summary */}
            <Card className="border-coach/20 bg-coach/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{simulationResult.event.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{simulationResult.event.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{simulationResult.event.description}</p>
                    <Badge variant={getCategoryColor(simulationResult.event.category) as any} className="text-xs">
                      {simulationResult.event.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Impact */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  Contract Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{simulationResult.contractImpact}</p>
              </CardContent>
            </Card>

            {/* Financial Impact */}
            <Card className="border-l-4 border-l-coach">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-coach" />
                  Financial Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                  <span className={`font-semibold text-lg ${
                    simulationResult.financialImpact.type === "cost" ? "text-danger" : "text-success"
                  }`}>
                    {simulationResult.financialImpact.type === "cost" ? "-" : "+"}{simulationResult.financialImpact.amount}
                  </span>
                </div>
                <p className="text-sm text-foreground">{simulationResult.financialImpact.description}</p>
              </CardContent>
            </Card>

            {/* Legal Consequences */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-danger" />
                  Legal Consequences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {simulationResult.legalConsequences.map((consequence, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-danger mt-1">•</span>
                      <span className="text-foreground">{consequence}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-success/30 bg-success/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-success" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {simulationResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-success mt-1">✓</span>
                      <span className="text-foreground">{recommendation}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-success/20">
                  <div className="text-sm">
                    <span className="font-medium text-success">Timeline:</span>
                    <span className="ml-2 text-foreground">{simulationResult.timeline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline">
                Save Simulation Report
              </Button>
              <Button variant="outline">
                Set Reminder
              </Button>
              <Button>
                Get Legal Consultation
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!simulationResult && !isSimulating && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No Simulation Run Yet</h3>
            <p className="text-sm text-muted-foreground">
              Select a life event scenario above and run a simulation to see how it might impact your contract.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};