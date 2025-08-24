import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Shield, Clock, Users, Eye, Zap, MessageSquare, Calendar, Radar, Bot, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: Clock,
      title: "Life Map Timeline",
      description: "Your contract becomes a visual story of your life with key events, penalties, and bonuses mapped across time.",
      color: "timeline",
      status: "live"
    },
    {
      icon: Eye,
      title: "Dual-View Analysis",
      description: "See each clause from 3 perspectives: yours, theirs, and what the law actually says.",
      color: "legal",
      status: "live"
    },
    {
      icon: Shield,
      title: "Red Flag Mode",
      description: "Instant heatmap of contract risks with color-coded safety levels for every clause.",
      color: "danger",
      status: "live"
    },
    {
      icon: FileText,
      title: "What-If Sandbox",
      description: "Edit contracts in plain English and get AI-powered legal rewrites instantly.",
      color: "analysis",
      status: "live"
    },
    {
      icon: MessageSquare,
      title: "Negotiation Arena",
      description: "Practice contract negotiations with AI role-playing as the other party.",
      color: "negotiation",
      status: "live"
    },
    {
      icon: Radar,
      title: "Conflict Radar",
      description: "Upload multiple contracts and discover hidden conflicts between them.",
      color: "warning",
      status: "live"
    },
    {
      icon: Bot,
      title: "Legal Digital Twin",
      description: "Your personal AI lawyer that knows your contracts inside out and answers what-if questions.",
      color: "coach",
      status: "live"
    },
    {
      icon: Users,
      title: "Social Mirror",
      description: "Compare your contract terms with others in your city, industry, or situation.",
      color: "legal",
      status: "live"
    },
    {
      icon: Calendar,
      title: "Life Event Simulator",
      description: "Test how major life changes affect your contracts before they happen.",
      color: "analysis",
      status: "live"
    },
    {
      icon: MessageSquare,
      title: "Voice Contract Coach",
      description: "Talk naturally to understand your contracts - no legal jargon needed.",
      color: "coach",
      status: "live"
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Scanner",
      description: "Get alerts about upcoming law changes that could affect your contracts.",
      color: "negotiation",
      status: "live"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Legal Life Lens</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#timeline" className="text-muted-foreground hover:text-foreground transition-colors">Timeline</a>
              <a href="#analysis" className="text-muted-foreground hover:text-foreground transition-colors">Risk Analysis</a>
              <Link to="/contract-analysis">
                <Button variant="outline" size="sm">Try Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          <Zap className="w-3 h-3 mr-1" />
          AI-Powered Legal Analysis
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Transform Complex
          <br />
          <span className="text-analysis">Legal Contracts</span>
          <br />
          Into Visual Stories
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Legal Life Lens turns overwhelming legal documents into interactive timelines, 
          risk assessments, and multi-perspective analysis. See your contracts from every angle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/contract-analysis">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium">
              Start Your Legal Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-border/50">
            Watch Demo
          </Button>
        </div>

        {/* Feature Preview Icons */}
        <div className="flex justify-center items-center space-x-12 opacity-60">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-danger" />
            <span className="text-sm">Risk Assessment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-legal" />
            <span className="text-sm">Multi-Perspective View</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-timeline-node" />
            <span className="text-sm">Timeline Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-coach" />
            <span className="text-sm">AI Negotiation Coach</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every tool you need to understand, analyze, and optimize your legal contracts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-${feature.color}/10 flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 text-${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-secondary rounded-3xl p-12 shadow-medium">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Contracts?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands who've already simplified their legal life with our AI-powered platform
          </p>
          <Link to="/contract-analysis">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Legal Life Lens</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Legal Life Lens. Transform your legal future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;