import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Clock, Shield, AlertTriangle, Users, Zap, MessageSquare, Calendar, Radar, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { LifeMapTimeline } from "@/components/contract/LifeMapTimeline";
import { DualView } from "@/components/contract/DualView";
import { RedFlagMode } from "@/components/contract/RedFlagMode";
import { WhatIfSandbox } from "@/components/contract/WhatIfSandbox";
import { NegotiationArena } from "@/components/contract/NegotiationArena";
import { ConflictRadar } from "@/components/contract/ConflictRadar";
import { LegalDigitalTwin } from "@/components/contract/LegalDigitalTwin";
import { SocialMirror } from "@/components/contract/SocialMirror";
import { LifeEventSimulator } from "@/components/contract/LifeEventSimulator";
import { VoiceContractCoach } from "@/components/contract/VoiceContractCoach";
import { FutureProofScanner } from "@/components/contract/FutureProofScanner";

const ContractAnalysis = () => {
  const [activeTab, setActiveTab] = useState("timeline");

  const features = [
    { id: "timeline", label: "Life Map Timeline", icon: Clock, color: "legal" },
    { id: "dual-view", label: "Dual View", icon: Shield, color: "analysis" },
    { id: "red-flag", label: "Red Flag Mode", icon: AlertTriangle, color: "danger" },
    { id: "sandbox", label: "What-If Sandbox", icon: Zap, color: "warning" },
    { id: "negotiation", label: "Negotiation Arena", icon: MessageSquare, color: "negotiation" },
    { id: "conflict", label: "Conflict Radar", icon: Radar, color: "danger" },
    { id: "twin", label: "Legal Digital Twin", icon: Users, color: "legal" },
    { id: "mirror", label: "Social Mirror", icon: Users, color: "analysis" },
    { id: "simulator", label: "Life Event Simulator", icon: Calendar, color: "coach" },
    { id: "coach", label: "Voice Coach", icon: MessageSquare, color: "coach" },
    { id: "scanner", label: "Future-Proof Scanner", icon: Search, color: "legal" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Legal Life Lens</span>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <FileText className="w-4 h-4 mr-2" />
              Analysis Suite
            </Badge>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Contract Analysis Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your contract and explore it through multiple AI-powered perspectives and analysis tools.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Feature Navigation */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Analysis Tool</CardTitle>
              <CardDescription>Select from our comprehensive suite of contract analysis features</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-3 h-auto p-3 bg-muted/30">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="flex flex-col items-center gap-2 p-4 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-lg transition-all"
                  >
                    <feature.icon className="w-5 h-5" />
                    <span className="text-xs text-center leading-tight">{feature.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardContent>
          </Card>

          {/* Feature Content */}
          <TabsContent value="timeline" className="space-y-6">
            <LifeMapTimeline />
          </TabsContent>

          <TabsContent value="dual-view" className="space-y-6">
            <DualView />
          </TabsContent>

          <TabsContent value="red-flag" className="space-y-6">
            <RedFlagMode />
          </TabsContent>

          <TabsContent value="sandbox" className="space-y-6">
            <WhatIfSandbox />
          </TabsContent>

          <TabsContent value="negotiation" className="space-y-6">
            <NegotiationArena />
          </TabsContent>

          <TabsContent value="conflict" className="space-y-6">
            <ConflictRadar />
          </TabsContent>

          <TabsContent value="twin" className="space-y-6">
            <LegalDigitalTwin />
          </TabsContent>

          <TabsContent value="mirror" className="space-y-6">
            <SocialMirror />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <LifeEventSimulator />
          </TabsContent>

          <TabsContent value="coach" className="space-y-6">
            <VoiceContractCoach />
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <FutureProofScanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractAnalysis;