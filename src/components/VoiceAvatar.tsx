import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { MessageCircle, Mic, MicOff, Volume2, VolumeX, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const VoiceAvatar = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "Voice Coach Connected",
        description: "Your AI legal coach is ready to help!",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Voice Coach Disconnected",
        description: "Session ended. Click to start again!",
      });
    },
    onError: (error) => {
      toast({
        title: "Connection Error",
        description: "Unable to connect to voice coach. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isExpanded) return;
    
    const rect = avatarRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = ((e.clientX - dragOffset.x) / window.innerWidth) * 100;
    const newY = ((e.clientY - dragOffset.y) / window.innerHeight) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(85, newX)),
      y: Math.max(0, Math.min(85, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const startVoiceChat = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start conversation with a legal coach agent
      await conversation.startSession({
        signedUrl: 'https://example.com/placeholder' // Placeholder since component is not used
      });
    } catch (error) {
      toast({
        title: "Microphone Access Needed",
        description: "Please allow microphone access to use the voice coach.",
        variant: "destructive",
      });
    }
  };

  const endVoiceChat = async () => {
    await conversation.endSession();
  };

  const toggleMute = async () => {
    const newVolume = isMuted ? 1 : 0;
    await conversation.setVolume({ volume: newVolume });
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={avatarRef}
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      {/* Avatar Circle */}
      <div
        className={`relative transition-all duration-300 ${
          isExpanded ? 'scale-110' : 'scale-100'
        }`}
        onClick={() => !isDragging && setIsExpanded(!isExpanded)}
      >
        {/* Floating Avatar */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-coach/20 rounded-full blur-xl animate-pulse" />
          
          {/* Avatar Body */}
          <div className="relative w-16 h-16 bg-gradient-primary rounded-full border-4 border-coach/30 shadow-medium flex items-center justify-center overflow-hidden">
            {/* Avatar Face */}
            <div className="relative w-12 h-12">
              {/* Face Base */}
              <div className="w-12 h-12 bg-gradient-to-br from-coach/80 to-coach rounded-full relative">
                {/* Eyes */}
                <div className="absolute top-3 left-2 w-2 h-2 bg-card rounded-full">
                  <div className="w-1 h-1 bg-foreground rounded-full ml-0.5 mt-0.5" />
                </div>
                <div className="absolute top-3 right-2 w-2 h-2 bg-card rounded-full">
                  <div className="w-1 h-1 bg-foreground rounded-full ml-0.5 mt-0.5" />
                </div>
                
                {/* Mouth */}
                <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-card rounded-full transition-all duration-200 ${
                  conversation.isSpeaking ? 'animate-pulse scale-110' : ''
                }`} />
                
                {/* Voice Indicator */}
                {conversation.status === 'connected' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card animate-pulse" />
                )}
              </div>
            </div>
          </div>
          
          {/* Floating Chat Indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full border-2 border-card shadow-soft flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Expanded Controls Panel */}
      {isExpanded && (
        <Card className="absolute top-20 left-1/2 transform -translate-x-1/2 p-4 bg-card/95 backdrop-blur-sm border-coach/20 shadow-medium min-w-[200px]">
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="font-semibold text-foreground">Legal Voice Coach</h3>
              <p className="text-xs text-muted-foreground">AI-powered legal assistant</p>
            </div>
            
            <div className="flex justify-center space-x-2">
              {conversation.status === 'disconnected' ? (
                <Button
                  onClick={startVoiceChat}
                  size="sm"
                  className="bg-coach hover:bg-coach/90 text-coach-foreground"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={toggleMute}
                    size="sm"
                    variant="outline"
                    className="border-coach/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={endVoiceChat}
                    size="sm"
                    variant="outline"
                    className="border-danger/20 text-danger hover:bg-danger/10"
                  >
                    <MicOff className="w-4 h-4 mr-2" />
                    End
                  </Button>
                </div>
              )}
            </div>
            
            {/* Drag Handle */}
            <div 
              className="flex justify-center pt-2 border-t border-border/50 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
            >
              <Move className="w-4 h-4 text-muted-foreground" />
            </div>
            
            {/* Status Indicator */}
            <div className="text-center">
              <span className={`text-xs px-2 py-1 rounded-full ${
                conversation.status === 'connected' 
                  ? 'bg-success/20 text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {conversation.status === 'connected' ? 'Connected' : 'Ready to connect'}
              </span>
              
              {conversation.isSpeaking && (
                <div className="mt-2 flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-coach rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-coach rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-3 bg-coach rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceAvatar;