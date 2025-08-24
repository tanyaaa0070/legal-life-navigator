import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, Brain, Scale } from "lucide-react";

interface Conversation {
  id: string;
  question: string;
  answer: string;
  confidence: number;
  relatedClauses: string[];
  timestamp: Date;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    question: "What if I miss rent next month?",
    answer: "Based on your contract, if you miss rent payment, you'll face a penalty of ₹2,000 plus ₹500 per day until payment is made. After 15 days, the landlord may initiate legal proceedings for eviction. I recommend setting up automatic payments to avoid this situation.",
    confidence: 95,
    relatedClauses: ["Payment Terms - Clause 3.2", "Late Fees - Clause 3.4", "Termination - Clause 8.1"],
    timestamp: new Date()
  }
];

interface PersonalProfile {
  name: string;
  contractType: string;
  riskTolerance: "low" | "medium" | "high";
  priorities: string[];
  concernAreas: string[];
}

const mockProfile: PersonalProfile = {
  name: "Your Digital Twin",
  contractType: "Rental Agreement",
  riskTolerance: "medium",
  priorities: ["Cost Management", "Flexibility", "Legal Protection"],
  concernAreas: ["Early Termination", "Rent Increases", "Pet Policy"]
};

export const LegalDigitalTwin = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [profile, setProfile] = useState<PersonalProfile>(mockProfile);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setIsThinking(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const answer = generateTwinResponse(question);
      const newConversation: Conversation = {
        id: Date.now().toString(),
        question: question,
        answer: answer.response,
        confidence: answer.confidence,
        relatedClauses: answer.clauses,
        timestamp: new Date()
      };

      setConversations(prev => [newConversation, ...prev]);
      setQuestion("");
      setIsThinking(false);
    }, 2000);
  };

  const generateTwinResponse = (question: string) => {
    const responses = {
      "rent": {
        response: "Based on your rental agreement, if you're late with rent, you'll face penalties starting at ₹500 per day. Given your medium risk tolerance, I recommend setting up automated payments and maintaining a buffer fund of at least one month's rent.",
        confidence: 92,
        clauses: ["Payment Terms - Clause 3.2", "Late Fees - Clause 3.3"]
      },
      "termination": {
        response: "Early termination will cost you 2 months' rent as penalty based on Clause 8.2. However, since flexibility is one of your priorities, you might want to negotiate a reduced penalty in exchange for helping find replacement tenants.",
        confidence: 88,
        clauses: ["Termination - Clause 8.2", "Notice Period - Clause 8.1"]
      },
      "pets": {
        response: "Your current lease prohibits pets entirely. Given that pet policy is in your concern areas, I suggest approaching your landlord with a pet addendum proposal including additional deposit and pet insurance.",
        confidence: 85,
        clauses: ["Property Rules - Clause 5.4", "Modifications - Clause 12.1"]
      }
    };

    // Simple keyword matching for demo
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("rent")) return responses.rent;
    if (lowerQuestion.includes("terminate") || lowerQuestion.includes("break")) return responses.termination;
    if (lowerQuestion.includes("pet")) return responses.pets;

    return {
      response: "Based on your contract and personal profile, I need more specific details to provide accurate guidance. Could you clarify which aspect of your contract you're concerned about?",
      confidence: 70,
      clauses: ["General Terms"]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 75) return "warning";
    return "danger";
  };

  const getRiskToleranceColor = (risk: string) => {
    switch (risk) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-legal" />
          Legal Digital Twin - Personal AI Lawyer
        </CardTitle>
        <CardDescription>
          Your personalized AI assistant that understands your contract and provides tailored legal guidance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Digital Twin Profile */}
        <Card className="bg-legal/5 border-legal/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-legal text-white">
                  <Brain className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">Specialized in {profile.contractType}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-foreground mb-1">Risk Tolerance:</div>
                    <Badge variant={getRiskToleranceColor(profile.riskTolerance) as any} className="text-xs">
                      {profile.riskTolerance}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="font-medium text-foreground mb-1">Your Priorities:</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.priorities.slice(0, 2).map((priority, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {priority}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-foreground mb-1">Concern Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.concernAreas.slice(0, 2).map((concern, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ask Question Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Ask Your Digital Twin
          </h3>
          
          <div className="flex gap-2">
            <Input
              placeholder="e.g., What if I miss rent next month? Can I have pets? What about early termination?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isThinking}
            />
            <Button onClick={askQuestion} disabled={!question.trim() || isThinking}>
              {isThinking ? "Thinking..." : "Ask"}
            </Button>
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick questions:</span>
            {["What if I miss rent?", "Can I terminate early?", "Pet policy options?"].map((q) => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setQuestion(q)}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation History */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Conversation History</h3>
          
          {conversations.length === 0 ? (
            <Card className="bg-muted/30">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium text-foreground mb-2">No questions yet</h4>
                <p className="text-sm text-muted-foreground">
                  Ask your digital twin any question about your contract to get personalized legal guidance.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <Card key={conv.id} className="border-l-4 border-l-legal">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Question */}
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-foreground">Your Question:</div>
                        <p className="text-sm text-muted-foreground italic">"{conv.question}"</p>
                      </div>

                      {/* Answer */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">Digital Twin's Answer:</span>
                          <Badge variant={getConfidenceColor(conv.confidence) as any} className="text-xs">
                            <Scale className="w-3 h-3 mr-1" />
                            {conv.confidence}% confident
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground bg-legal/5 p-3 rounded-lg">{conv.answer}</p>
                      </div>

                      {/* Related Clauses */}
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">Referenced clauses:</div>
                        <div className="flex flex-wrap gap-1">
                          {conv.relatedClauses.map((clause, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {clause}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {conv.timestamp.toLocaleString()}
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