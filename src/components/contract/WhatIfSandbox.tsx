import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Edit, ArrowRight, Copy, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Modification {
  id: string;
  original: string;
  userRequest: string;
  aiRewritten: string;
  legalRating: "valid" | "questionable" | "invalid";
  explanation: string;
}

const mockModifications: Modification[] = [
  {
    id: "1",
    original: "Monthly rent payment due on the 1st of each month with no grace period",
    userRequest: "I want 7 days grace period for rent",
    aiRewritten: "Monthly rent payment due on the 1st of each month. Tenant shall have a 7-day grace period after the due date without penalty.",
    legalRating: "valid",
    explanation: "Grace periods are commonly accepted in rental agreements and provide reasonable accommodation for tenants."
  }
];

export const WhatIfSandbox = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedClause, setSelectedClause] = useState("");
  const [modifications, setModifications] = useState<Modification[]>(mockModifications);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleClauses = [
    "Monthly rent payment due on the 1st of each month with no grace period",
    "Security deposit is non-refundable under any circumstances",
    "Landlord may enter property with 24 hours notice",
    "Lease automatically renews for 12 months unless terminated with 60 days notice",
    "No pets allowed on the premises at any time"
  ];

  const processModification = async () => {
    if (!userInput.trim() || !selectedClause) {
      toast({
        title: "Missing Information",
        description: "Please select a clause and describe your desired changes.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newModification: Modification = {
        id: Date.now().toString(),
        original: selectedClause,
        userRequest: userInput,
        aiRewritten: generateAIRewrite(selectedClause, userInput),
        legalRating: "valid",
        explanation: "This modification appears legally sound and follows standard contract practices."
      };

      setModifications([newModification, ...modifications]);
      setUserInput("");
      setIsProcessing(false);
      
      toast({
        title: "Clause Rewritten",
        description: "Your modification has been processed and rewritten in legal language.",
      });
    }, 2000);
  };

  const generateAIRewrite = (original: string, request: string): string => {
    // Simple AI simulation - in real app this would call an actual AI service
    if (request.toLowerCase().includes("grace period")) {
      return original.replace("with no grace period", "") + " Tenant shall have a 7-day grace period after the due date without penalty.";
    }
    if (request.toLowerCase().includes("pet")) {
      return "Pets are allowed on the premises subject to landlord approval and additional pet deposit of ₹10,000.";
    }
    return `${original} [Modified based on request: ${request}]`;
  };

  const getLegalRatingColor = (rating: string) => {
    switch (rating) {
      case "valid": return "success";
      case "questionable": return "warning";
      case "invalid": return "danger";
      default: return "secondary";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The rewritten clause has been copied to your clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-warning" />
          What-If Sandbox
        </CardTitle>
        <CardDescription>
          Edit contract clauses in plain English and get AI-powered legal rewrites instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              1. Select a clause to modify:
            </label>
            <div className="space-y-2">
              {sampleClauses.map((clause, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedClause === clause
                      ? "border-warning bg-warning/10"
                      : "border-border hover:border-warning/50"
                  }`}
                  onClick={() => setSelectedClause(clause)}
                >
                  <p className="text-sm text-foreground">{clause}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              2. Describe your desired changes in plain English:
            </label>
            <Textarea
              placeholder="Example: I want 7 days grace period for rent, or I want to allow pets with deposit..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={processModification}
            disabled={isProcessing || !userInput.trim() || !selectedClause}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Rewrite Clause with AI
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Your Modifications</h3>
            {modifications.length > 0 && (
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            )}
          </div>

          {modifications.length === 0 ? (
            <Card className="bg-muted/30">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No modifications yet</h3>
                <p className="text-sm text-muted-foreground">
                  Select a clause and describe your changes to get started with AI rewriting.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {modifications.map((mod) => (
                <Card key={mod.id} className="border-warning/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Modification #{mod.id}
                            </Badge>
                            <Badge variant={getLegalRatingColor(mod.legalRating) as any} className="text-xs">
                              {mod.legalRating}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Request:</strong> "{mod.userRequest}"
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(mod.aiRewritten)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Before/After Comparison */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">Original Clause:</div>
                          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                            <p className="text-sm text-foreground">{mod.original}</p>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" />
                            AI Rewritten Clause:
                          </div>
                          <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                            <p className="text-sm text-foreground">{mod.aiRewritten}</p>
                          </div>
                        </div>
                      </div>

                      {/* Legal Analysis */}
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground mb-1">Legal Analysis:</div>
                        <p className="text-sm text-muted-foreground">{mod.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};