import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Volume2 } from "lucide-react";

interface OnboardingProps {
  onComplete: (persona: PersonaData) => void;
}

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

const questions = [
  {
    id: "listeningTime",
    question: "When do you usually listen to audiobooks?",
    options: [
      { value: "commute", label: "During my commute", emoji: "🚗" },
      { value: "bedtime", label: "Before bed", emoji: "🌙" },
      { value: "exercise", label: "While exercising", emoji: "💪" },
      { value: "relaxing", label: "While relaxing at home", emoji: "🏠" }
    ]
  },
  {
    id: "pacePreference",
    question: "Do you prefer fast-paced thrillers or slow reflective reads?",
    options: [
      { value: "fast", label: "Fast-paced & exciting", emoji: "⚡" },
      { value: "moderate", label: "Balanced mix", emoji: "⚖️" },
      { value: "slow", label: "Slow & reflective", emoji: "🧘" },
      { value: "varies", label: "Depends on my mood", emoji: "🎭" }
    ]
  },
  {
    id: "narratorStyle",
    question: "What kind of narrator voice do you enjoy?",
    options: [
      { value: "calm", label: "Calm & soothing", emoji: "🌊" },
      { value: "energetic", label: "Energetic & expressive", emoji: "🎪" },
      { value: "mysterious", label: "Deep & mysterious", emoji: "🎭" },
      { value: "warm", label: "Warm & friendly", emoji: "☀️" }
    ]
  }
];

const generatePersona = (answers: Record<string, string>): PersonaData => {
  const personas = [
    {
      name: "Late-Night Explorer",
      mood: "reflective",
      voiceTone: "calm",
      conditions: { listeningTime: "bedtime", pacePreference: "slow" }
    },
    {
      name: "Road Trip Companion",
      mood: "adventurous",
      voiceTone: "energetic",
      conditions: { listeningTime: "commute", pacePreference: "fast" }
    },
    {
      name: "Zen Master",
      mood: "peaceful",
      voiceTone: "calm",
      conditions: { listeningTime: "relaxing", narratorStyle: "calm" }
    },
    {
      name: "Thrill Seeker",
      mood: "intense",
      voiceTone: "mysterious",
      conditions: { pacePreference: "fast", narratorStyle: "mysterious" }
    },
    {
      name: "Mindful Wanderer",
      mood: "curious",
      voiceTone: "warm",
      conditions: { listeningTime: "exercise", pacePreference: "moderate" }
    }
  ];

  // Find best match based on answers
  let bestMatch = personas[0];
  let maxMatches = 0;

  personas.forEach(persona => {
    let matches = 0;
    Object.entries(persona.conditions).forEach(([key, value]) => {
      if (answers[key] === value) matches++;
    });
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = persona;
    }
  });

  return {
    ...bestMatch,
    preferences: {
      listeningTime: answers.listeningTime,
      pacePreference: answers.pacePreference,
      narratorStyle: answers.narratorStyle
    }
  };
};

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(true);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTyping(false);
      }, 500);
    } else {
      // Generate persona and complete onboarding
      const persona = generatePersona(newAnswers);
      setTimeout(() => onComplete(persona), 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-card">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Volume2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SoundPersona
            </h1>
          </div>
          <p className="text-muted-foreground">
            Let's create your perfect audiobook discovery companion
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                index <= currentQuestion ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20">
          <div className="space-y-6">
            <h2 
              className={`text-xl font-semibold transition-opacity duration-500 ${
                isTyping ? "opacity-50" : "opacity-100"
              }`}
            >
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start p-4 h-auto border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                  onClick={() => handleAnswer(option.value)}
                >
                  <span className="text-2xl mr-3 transition-transform group-hover:scale-110">
                    {option.emoji}
                  </span>
                  <span className="text-left">{option.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Persona hint */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            AI is crafting your unique audiobook persona...
          </p>
        </div>
      </div>
    </div>
  );
}