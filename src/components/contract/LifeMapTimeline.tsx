import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, TrendingUp, AlertTriangle, DollarSign, FileText, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "milestone" | "risk" | "benefit" | "payment";
  impact: "positive" | "negative" | "neutral";
  amount?: string;
}

const mockTimelineData: TimelineEvent[] = [
  {
    id: "1",
    title: "Contract Start",
    description: "Lease agreement begins",
    date: "Month 1",
    type: "milestone",
    impact: "neutral"
  },
  {
    id: "2",
    title: "Rent Increase",
    description: "Monthly rent increases by 15%",
    date: "Month 6",
    type: "risk",
    impact: "negative",
    amount: "₹5,000"
  },
  {
    id: "3",
    title: "Break Lease Penalty",
    description: "Early termination penalty applies",
    date: "Month 12",
    type: "risk",
    impact: "negative",
    amount: "₹50,000"
  },
  {
    id: "4",
    title: "Loyalty Bonus",
    description: "Bonus for staying beyond 18 months",
    date: "Month 18",
    type: "benefit",
    impact: "positive",
    amount: "₹10,000"
  }
];

export const LifeMapTimeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>(mockTimelineData);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been analyzed and added to your timeline.`,
      });
      
      // Simulate AI analysis of the document
      setTimeout(() => {
        toast({
          title: "Analysis Complete",
          description: "Your contract timeline has been updated with key events and milestones.",
        });
      }, 2000);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "milestone": return <Calendar className="w-4 h-4" />;
      case "risk": return <AlertTriangle className="w-4 h-4" />;
      case "benefit": return <DollarSign className="w-4 h-4" />;
      case "payment": return <TrendingUp className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (impact: string) => {
    switch (impact) {
      case "positive": return "success";
      case "negative": return "danger";
      default: return "secondary";
    }
  };

  const getEventEmoji = (type: string, impact: string) => {
    if (type === "risk") return "🚨";
    if (type === "benefit") return "💰";
    if (impact === "negative") return "📈";
    return "📅";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-legal" />
            Life Map Timeline
          </CardTitle>
          <CardDescription>
            Visualize your contract as a scrolling timeline of your life with key events, milestones, and impacts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            
            {uploadedFile ? (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-legal mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground">{uploadedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">Document uploaded and analyzed</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Another Document
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground">Upload Your Contract</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload PDF, DOC, or TXT files to generate your life map timeline
                  </p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
          </div>

          {/* Timeline Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Your Contract Journey</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Timeline
              </Button>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-timeline-line"></div>

              {/* Timeline Events */}
              <div className="space-y-6">
                {timelineData.map((event, index) => (
                  <div key={event.id} className="relative flex items-start gap-4">
                    {/* Timeline Node */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-timeline-node text-white shrink-0">
                      <span className="text-2xl">{getEventEmoji(event.type, event.impact)}</span>
                    </div>

                    {/* Event Card */}
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              <Badge variant={getEventColor(event.impact) as any}>
                                {getEventIcon(event.type)}
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-legal font-medium">{event.date}</span>
                              {event.amount && (
                                <span className={`font-semibold ${event.impact === "positive" ? "text-success" : "text-danger"}`}>
                                  {event.impact === "positive" ? "+" : ""}{event.amount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">2</div>
                <div className="text-sm text-muted-foreground">Positive Events</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger">2</div>
                <div className="text-sm text-muted-foreground">Risk Events</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-legal">18</div>
                <div className="text-sm text-muted-foreground">Months Duration</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};