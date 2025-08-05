import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Edit, RotateCcw, Volume2, Headphones } from "lucide-react";

interface PersonaData {
  name: string;
  mood: string;
  voiceTone: string;
  preferences: {
    listeningTime: string;
    pacePreference: string;
    narratorStyle: string;
  };
}

interface PersonaScreenProps {
  persona: PersonaData;
  onEdit: () => void;
  onSurpriseMe: () => void;
  onViewFeed: () => void;
}

const getPersonaIcon = (mood: string) => {
  const icons = {
    reflective: "🌙",
    adventurous: "🚗",
    peaceful: "🧘",
    intense: "⚡",
    curious: "🔍"
  };
  return icons[mood as keyof typeof icons] || "🎵";
};

const getPersonaDescription = (persona: PersonaData) => {
  const descriptions = {
    "Late-Night Explorer": "You find solace in the quiet hours, diving deep into stories that unfold like whispered secrets. Perfect for contemplative narratives and atmospheric tales.",
    "Road Trip Companion": "Your adventures need the perfect soundtrack of stories. You crave fast-paced narratives that match your dynamic lifestyle.",
    "Zen Master": "Balance and mindfulness guide your listening journey. You appreciate nuanced storytelling and voices that center your soul.",
    "Thrill Seeker": "You live for the adrenaline rush of suspense and mystery. Dark, gripping tales fuel your imagination.",
    "Mindful Wanderer": "Every step of your journey deserves the perfect story companion. You seek variety and emotional depth."
  };
  return descriptions[persona.name as keyof typeof descriptions] || "Your unique audiobook journey awaits discovery.";
};

export default function PersonaScreen({ persona, onEdit, onSurpriseMe, onViewFeed }: PersonaScreenProps) {
  const [isGlowing, setIsGlowing] = useState(false);

  const handleSurpriseMe = () => {
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
      onSurpriseMe();
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Volume2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">SoundPersona</h1>
          </div>
          <h2 className="text-lg text-muted-foreground">Your Discovery Companion</h2>
        </div>

        {/* Persona Card */}
        <Card className="p-6 bg-gradient-to-br from-card via-muted/10 to-primary/5 border-primary/20 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            {/* Persona Identity */}
            <div className="text-center space-y-4">
              <div className="text-6xl animate-pulse-glow">
                {getPersonaIcon(persona.mood)}
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {persona.name}
                </h3>
                <Badge variant="secondary" className="mt-2">
                  {persona.mood} • {persona.voiceTone}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {getPersonaDescription(persona)}
            </p>

            {/* Preferences */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Your Preferences</h4>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listening Time:</span>
                  <span className="capitalize">{persona.preferences.listeningTime.replace(/([A-Z])/g, ' $1')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pace Preference:</span>
                  <span className="capitalize">{persona.preferences.pacePreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Narrator Style:</span>
                  <span className="capitalize">{persona.preferences.narratorStyle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50" />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleSurpriseMe}
            className={`w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 ${
              isGlowing ? "animate-pulse-glow" : ""
            }`}
            disabled={isGlowing}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isGlowing ? "Crafting your surprise..." : "Surprise Me!"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onEdit}
              className="border-primary/30 hover:border-primary/60 hover:bg-primary/10"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => {/* TODO: Implement evolve */}}
              className="border-secondary/30 hover:border-secondary/60 hover:bg-secondary/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Evolve
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={onViewFeed}
            className="w-full"
          >
            <Headphones className="mr-2 h-5 w-5" />
            Explore Audiobooks
          </Button>
        </div>
      </div>
    </div>
  );
}