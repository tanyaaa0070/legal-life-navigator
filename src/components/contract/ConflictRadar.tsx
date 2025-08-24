import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Radar, AlertTriangle, FileText, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContractFile {
  id: string;
  name: string;
  type: string;
  uploadDate: Date;
}

interface Conflict {
  id: string;
  type: "direct_contradiction" | "indirect_conflict" | "compliance_issue";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  contract1: string;
  contract2: string;
  clause1: string;
  clause2: string;
  resolution: string;
}

const mockConflicts: Conflict[] = [
  {
    id: "1",
    type: "direct_contradiction",
    severity: "high",
    title: "Work-from-Home Conflict",
    description: "Your employment contract prohibits freelance work, but your rental agreement expects you to work from home as a freelancer.",
    contract1: "Employment Agreement",
    contract2: "Rental Agreement",
    clause1: "Employee shall not engage in any freelance or consulting work during employment",
    clause2: "Property is designated for residential use including home-based freelance activities",
    resolution: "Negotiate with employer for freelance exception or clarify with landlord about employment status"
  },
  {
    id: "2",
    type: "indirect_conflict",
    severity: "medium",
    title: "Equipment Usage Conflict",
    description: "Company equipment policy conflicts with home office setup requirements in rental agreement.",
    contract1: "Employment Agreement",
    contract2: "Rental Agreement", 
    clause1: "Company equipment must not leave office premises",
    clause2: "Tenant must maintain professional home office setup with company-provided equipment",
    resolution: "Request written approval from employer for home office equipment use"
  }
];

export const ConflictRadar = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ContractFile[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>(mockConflicts);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      const newFile: ContractFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        uploadDate: new Date()
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
    });

    if (files.length > 0) {
      toast({
        title: "Files Uploaded",
        description: `${files.length} contract(s) uploaded successfully.`,
      });
      
      // Start analysis
      analyzeConflicts();
    }
  };

  const analyzeConflicts = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Found ${conflicts.length} potential conflicts between your contracts.`,
      });
    }, 3000);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getConflictTypeColor = (type: string) => {
    switch (type) {
      case "direct_contradiction": return "danger";
      case "indirect_conflict": return "warning";
      case "compliance_issue": return "analysis";
      default: return "secondary";
    }
  };

  const getConflictIcon = (severity: string) => {
    switch (severity) {
      case "high": return "🚨";
      case "medium": return "⚠️";
      case "low": return "ℹ️";
      default: return "📋";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-danger" />
          Conflict Radar
        </CardTitle>
        <CardDescription>
          Upload multiple contracts to automatically detect conflicts, contradictions, and compliance issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Upload Contracts for Analysis</h3>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
            >
              <Upload className="w-4 h-4 mr-2" />
              Add Contracts
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt"
            multiple
            className="hidden"
          />

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Uploaded Files ({uploadedFiles.length})
              </div>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-legal" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Uploaded {file.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Status */}
          {isAnalyzing && (
            <Card className="bg-legal/10 border-legal/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-legal"></div>
                  <div>
                    <div className="font-medium text-foreground">Analyzing Contracts...</div>
                    <div className="text-sm text-muted-foreground">
                      Scanning for conflicts, contradictions, and compliance issues
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Conflict Results */}
        {conflicts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Detected Conflicts</h3>
              <div className="flex gap-2">
                <Badge variant="destructive" className="text-xs">
                  {conflicts.filter(c => c.severity === "high").length} High
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {conflicts.filter(c => c.severity === "medium").length} Medium
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {conflicts.filter(c => c.severity === "low").length} Low
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {conflicts.map((conflict) => (
                <Card key={conflict.id} 
                      className={`${conflict.severity === "high" ? "border-danger/30 bg-danger/5" : 
                                 conflict.severity === "medium" ? "border-warning/30 bg-warning/5" : 
                                 "border-success/30 bg-success/5"}`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getConflictIcon(conflict.severity)}</span>
                            <h4 className="font-semibold text-foreground">{conflict.title}</h4>
                            <Badge variant={getSeverityColor(conflict.severity) as any} className="text-xs">
                              {conflict.severity} severity
                            </Badge>
                            <Badge variant={getConflictTypeColor(conflict.type) as any} className="text-xs">
                              {conflict.type.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{conflict.description}</p>
                        </div>
                      </div>

                      {/* Conflicting Clauses */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-foreground">{conflict.contract1}:</div>
                          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                            <p className="text-sm text-foreground italic">"{conflict.clause1}"</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium text-foreground">{conflict.contract2}:</div>
                          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                            <p className="text-sm text-foreground italic">"{conflict.clause2}"</p>
                          </div>
                        </div>
                      </div>

                      {/* Resolution Suggestion */}
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <div className="text-sm font-medium text-success mb-2">💡 Recommended Resolution:</div>
                        <p className="text-sm text-foreground">{conflict.resolution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {uploadedFiles.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Radar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Contracts to Analyze</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload multiple contracts to detect conflicts and contradictions between them.
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Contracts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};