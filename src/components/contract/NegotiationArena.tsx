import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, User, Lightbulb, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  sender: "user" | "ai-landlord" | "ai-coach";
  content: string;
  timestamp: Date;
  suggestion?: string;
}

interface NegotiationScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  topic: string;
}

const scenarios: NegotiationScenario[] = [
  {
    id: "rent-increase",
    title: "Rent Increase Negotiation",
    description: "Landlord wants to increase rent by 15%. Practice negotiating a lower increase.",
    difficulty: "beginner",
    topic: "Rent Terms"
  },
  {
    id: "pet-policy",
    title: "Pet Permission Request",
    description: "Negotiate to allow pets in a no-pet property with appropriate conditions.",
    difficulty: "intermediate",
    topic: "Property Rules"
  },
  {
    id: "early-termination",
    title: "Early Lease Termination",
    description: "Negotiate reduced penalties for breaking lease early due to job relocation.",
    difficulty: "advanced",
    topic: "Contract Terms"
  }
];

export const NegotiationArena = () => {
  const [selectedScenario, setSelectedScenario] = useState<NegotiationScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "success";
      case "intermediate": return "warning";
      case "advanced": return "danger";
      default: return "secondary";
    }
  };

  const startNegotiation = (scenario: NegotiationScenario) => {
    setSelectedScenario(scenario);
    setNegotiationStarted(true);
    setMessages([]);

    // AI Landlord starts the conversation
    setTimeout(() => {
      const initialMessage: ChatMessage = {
        id: "1",
        sender: "ai-landlord",
        content: getInitialMessage(scenario.id),
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }, 1000);
  };

  const getInitialMessage = (scenarioId: string): string => {
    switch (scenarioId) {
      case "rent-increase":
        return "Hello! I've been reviewing the rental market, and I need to increase your rent by 15% starting next month. The market rates have gone up significantly.";
      case "pet-policy":
        return "I received your request about getting a pet. As you know, our lease clearly states no pets allowed. This is a firm policy.";
      case "early-termination":
        return "I understand you need to break the lease early, but according to our agreement, you'll need to pay the full penalty of 3 months' rent.";
      default:
        return "Let's discuss the terms of your lease.";
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsAIThinking(true);

    // Simulate AI responses
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput, selectedScenario?.id || "");
      const coachSuggestion = generateCoachSuggestion(userInput);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai-landlord",
        content: aiResponse,
        timestamp: new Date()
      };

      const coachMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        sender: "ai-coach",
        content: `💡 Coach Tip: ${coachSuggestion}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage, coachMessage]);
      setIsAIThinking(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, scenarioId: string): string => {
    const responses = {
      "rent-increase": [
        "I understand your concern, but the market has really changed. However, I'm willing to discuss this further.",
        "That's quite a low counter-offer. The best I can do is 12%, and that's already a significant compromise.",
        "I appreciate your negotiation, but I have expenses too. How about we meet at 10%?"
      ],
      "pet-policy": [
        "I'm concerned about potential damage and other tenants' comfort. What kind of pet are we talking about?",
        "A small dog might be manageable with additional deposit. What about ₹15,000 extra deposit?",
        "I need to think about this. Can you provide references from previous landlords about your pet?"
      ],
      "early-termination": [
        "I understand your situation, but I'll have costs finding a new tenant. The penalty helps cover that.",
        "Two months might be workable if you help with showing the property to new tenants.",
        "That's very reasonable of you to offer help with transition. I think we can work something out."
      ]
    };

    const scenarioResponses = responses[scenarioId as keyof typeof responses] || ["Let me consider your proposal."];
    return scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)];
  };

  const generateCoachSuggestion = (userInput: string): string => {
    const suggestions = [
      "Try to find common ground and show you understand their perspective too.",
      "Consider offering something of value in return, like a longer lease commitment.",
      "Ask questions to understand their underlying concerns and constraints.",
      "Present data or comparisons to support your position.",
      "Suggest a trial period or compromise solution that works for both parties."
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-negotiation" />
          Negotiation Arena
        </CardTitle>
        <CardDescription>
          Practice negotiations with AI landlords/employers and get real-time coaching tips
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!negotiationStarted ? (
          /* Scenario Selection */
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Choose a Negotiation Scenario</h3>
            <div className="grid gap-4">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => startNegotiation(scenario)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{scenario.title}</h4>
                          <Badge variant={getDifficultyColor(scenario.difficulty) as any} className="text-xs">
                            {scenario.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {scenario.topic}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Start Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Active Negotiation */
          <div className="space-y-4">
            {/* Scenario Header */}
            <div className="flex items-center justify-between p-4 bg-negotiation/10 rounded-lg">
              <div>
                <h3 className="font-semibold text-foreground">{selectedScenario?.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedScenario?.description}</p>
              </div>
              <Button variant="outline" onClick={() => setNegotiationStarted(false)}>
                End Session
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 max-h-96 overflow-y-auto p-4 border rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-legal text-white ml-auto"
                        : message.sender === "ai-coach"
                        ? "bg-coach/20 border border-coach/30"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : message.sender === "ai-coach" ? (
                        <Lightbulb className="w-4 h-4 text-coach" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "user"
                          ? "You"
                          : message.sender === "ai-coach"
                          ? "AI Coach"
                          : "Landlord"}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {isAIThinking && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your response..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isAIThinking}
              />
              <Button onClick={sendMessage} disabled={!userInput.trim() || isAIThinking}>
                Send
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};