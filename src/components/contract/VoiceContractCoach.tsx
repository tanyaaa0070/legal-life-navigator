import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, MessageSquare, Play, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VoiceInteraction {
  id: string;
  userText: string;
  aiResponse: string;
  timestamp: Date;
  confidence: number;
  relatedClause?: string;
}

const mockInteractions: VoiceInteraction[] = [
  {
    id: "1",
    userText: "Can I keep a pet?",
    aiResponse: "Based on Clause 7 of your rental agreement, pets are currently not allowed. However, I suggest requesting a waiver from your landlord with additional security deposit and pet insurance coverage.",
    timestamp: new Date(),
    confidence: 92,
    relatedClause: "Property Rules - Clause 7"
  }
];

export const VoiceContractCoach = () => {
  const [interactions, setInteractions] = useState<VoiceInteraction[]>(mockInteractions);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Mock voice recognition states
  const recognition = useRef<any>(null);

  const startListening = () => {
    setIsListening(true);
    setCurrentTranscript("");
    
    // Simulate voice recognition
    setTimeout(() => {
      const mockQuestions = [
        "What happens if I break the lease early?",
        "Can I sublet my apartment?",
        "What are my maintenance responsibilities?",
        "How much notice do I need to give to move out?",
        "Are there any restrictions on guests?"
      ];
      
      const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setCurrentTranscript(randomQuestion);
      
      setTimeout(() => {
        setIsListening(false);
        processVoiceInput(randomQuestion);
      }, 1000);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    if (currentTranscript) {
      processVoiceInput(currentTranscript);
    }
  };

  const processVoiceInput = (text: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = generateCoachResponse(text);
      const newInteraction: VoiceInteraction = {
        id: Date.now().toString(),
        userText: text,
        aiResponse: response.answer,
        timestamp: new Date(),
        confidence: response.confidence,
        relatedClause: response.clause
      };

      setInteractions(prev => [newInteraction, ...prev]);
      setCurrentTranscript("");
      setIsProcessing(false);

      // Auto-speak response if voice enabled
      if (voiceEnabled) {
        speakResponse(response.answer);
      }
    }, 1500);
  };

  const generateCoachResponse = (question: string) => {
    const responses = {
      "break": {
        answer: "Breaking your lease early will result in a penalty of 3 months rent according to Clause 8.2. I recommend negotiating with your landlord or finding a suitable replacement tenant to reduce this penalty.",
        confidence: 95,
        clause: "Termination - Clause 8.2"
      },
      "sublet": {
        answer: "Your lease requires written landlord approval for subletting as per Clause 11.3. You'll need to submit tenant details and may be required to pay additional fees.",
        confidence: 88,
        clause: "Subletting - Clause 11.3"
      },
      "maintenance": {
        answer: "You're responsible for minor repairs under ₹2,000 per Clause 6.1. Major structural issues are landlord's responsibility. Always document maintenance requests in writing.",
        confidence: 90,
        clause: "Maintenance - Clause 6.1"
      },
      "notice": {
        answer: "You must provide 60 days written notice before moving out according to Clause 8.1. Notice period starts from the first day of the month following your notice submission.",
        confidence: 94,
        clause: "Notice Period - Clause 8.1"
      },
      "guests": {
        answer: "Guests can stay up to 7 consecutive days per Clause 5.2. Longer stays require landlord approval and may be considered unauthorized occupancy.",
        confidence: 87,
        clause: "Occupancy Rules - Clause 5.2"
      }
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("break") || lowerQuestion.includes("early")) return responses.break;
    if (lowerQuestion.includes("sublet")) return responses.sublet;
    if (lowerQuestion.includes("maintenance")) return responses.maintenance;
    if (lowerQuestion.includes("notice") || lowerQuestion.includes("move")) return responses.notice;
    if (lowerQuestion.includes("guest")) return responses.guests;

    return {
      answer: "I understand your question about the contract terms. Could you be more specific so I can provide detailed guidance based on your lease agreement?",
      confidence: 75,
      clause: "General Terms"
    };
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 75) return "warning"; 
    return "danger";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-coach" />
          Voice Contract Coach
        </CardTitle>
        <CardDescription>
          Talk naturally with your AI coach - ask questions about your contract using voice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Controls */}
        <Card className="bg-coach/5 border-coach/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Microphone Button */}
              <div className="relative">
                <Button
                  size="lg"
                  className={`w-20 h-20 rounded-full ${
                    isListening 
                      ? "bg-danger hover:bg-danger/90 animate-pulse" 
                      : "bg-coach hover:bg-coach/90"
                  }`}
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : isProcessing ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
                
                {isListening && (
                  <div className="absolute -inset-2 rounded-full border-4 border-danger animate-ping"></div>
                )}
              </div>

              {/* Status Text */}
              <div className="text-center">
                {isListening ? (
                  <div>
                    <div className="font-semibold text-foreground">🎤 Listening...</div>
                    <div className="text-sm text-muted-foreground">Ask me anything about your contract</div>
                  </div>
                ) : isProcessing ? (
                  <div>
                    <div className="font-semibold text-foreground">🧠 Processing...</div>
                    <div className="text-sm text-muted-foreground">Analyzing your question</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-foreground">Ready to Help</div>
                    <div className="text-sm text-muted-foreground">Tap the microphone to start talking</div>
                  </div>
                )}
              </div>

              {/* Current Transcript */}
              {currentTranscript && (
                <div className="p-3 bg-white/20 rounded-lg border border-coach/30 max-w-md">
                  <div className="text-sm text-muted-foreground mb-1">You said:</div>
                  <div className="font-medium text-foreground">"{currentTranscript}"</div>
                </div>
              )}

              {/* Voice Settings */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="voice-response"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="voice-response" className="text-sm text-foreground">
                    Voice Responses
                  </label>
                </div>
                
                {isSpeaking && (
                  <Button variant="outline" size="sm" onClick={stopSpeaking}>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Speaking
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Voice Commands */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Try These Voice Commands:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Can I keep a pet?",
              "What if I break the lease?",
              "How much notice do I need?",
              "Can I have roommates?",
              "What about maintenance?",
              "Are guests allowed?"
            ].map((command, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start h-auto p-3"
                onClick={() => processVoiceInput(command)}
              >
                <div>
                  <div className="font-medium">"{command}"</div>
                  <div className="text-xs text-muted-foreground">Click to ask</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation History */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Conversation History</h3>
          
          {interactions.length === 0 ? (
            <Card className="bg-muted/30">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium text-foreground mb-2">No conversations yet</h4>
                <p className="text-sm text-muted-foreground">
                  Start talking to your voice coach by clicking the microphone above.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {interactions.map((interaction) => (
                <Card key={interaction.id} className="border-l-4 border-l-coach">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* User Question */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-legal text-white flex items-center justify-center text-xs font-bold">
                          You
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">You asked:</div>
                          <div className="font-medium text-foreground">"{interaction.userText}"</div>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-coach text-white flex items-center justify-center text-xs font-bold">
                          AI
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">Coach response:</div>
                            <Badge variant={getConfidenceColor(interaction.confidence) as any} className="text-xs">
                              {interaction.confidence}% confident
                            </Badge>
                            {voiceEnabled && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => speakResponse(interaction.aiResponse)}
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="text-sm text-foreground bg-coach/10 p-3 rounded-lg">
                            {interaction.aiResponse}
                          </div>
                          
                          {interaction.relatedClause && (
                            <Badge variant="outline" className="text-xs">
                              {interaction.relatedClause}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {interaction.timestamp.toLocaleString()}
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