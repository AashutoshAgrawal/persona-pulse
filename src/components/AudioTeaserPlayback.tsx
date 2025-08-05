import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic } from "lucide-react";

interface AudioBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  mood: string;
  duration: string;
  rating: number;
  aiDescription: string;
  narratorVoice: string;
}

interface AudioTeaserPlaybackProps {
  book: AudioBook;
  onClose: () => void;
}

const voiceOptions = [
  { id: "calm", name: "Calm & Soothing", icon: "🌊", description: "Gentle, meditative tone" },
  { id: "energetic", name: "Energetic & Expressive", icon: "🎪", description: "Dynamic, engaging delivery" },
  { id: "mysterious", name: "Deep & Mysterious", icon: "🎭", description: "Dark, atmospheric narration" },
  { id: "warm", name: "Warm & Friendly", icon: "☀️", description: "Comforting, conversational style" }
];

const teaserTexts = {
  "1": "In the depths of the Midnight Library, between life and death, between the waves of regret and hope, Nora Seed discovers that every choice creates an infinite possibility...",
  "2": "Grace Augustine had always dreamed of the stars, but she never imagined waking up alone on a spacecraft with no memory of how she got there. The fate of humanity rests in her hands...",
  "3": "Klara the Artificial Friend watched the sun through the store window, learning to understand the complex emotions of the humans she was designed to love and protect...",
  "4": "Every Thursday, four unlikely friends gather in the Cooper's Chase retirement community to investigate cold cases. But today, they've stumbled upon a murder that's anything but cold...",
  "5": "Evelyn Hugo's voice was like velvet and smoke as she began to tell her story. 'The truth is,' she said, leaning forward, 'I've been lying to everyone for decades...'"
};

export default function AudioTeaserPlayback({ book, onClose }: AudioTeaserPlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVoice, setCurrentVoice] = useState(book.narratorVoice);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([75]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVoiceChange = (voiceId: string) => {
    setCurrentVoice(voiceId);
    setProgress(0);
    setIsPlaying(true);
  };

  const currentVoiceOption = voiceOptions.find(v => v.id === currentVoice);
  const teaserText = teaserTexts[book.id as keyof typeof teaserTexts] || teaserTexts["1"];

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-muted/20 border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-start space-x-4">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{book.title}</h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {book.genre}
              </Badge>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="p-6 space-y-6">
          {/* Current Voice */}
          <div className="text-center space-y-2">
            <div className="text-4xl animate-pulse-glow">
              {currentVoiceOption?.icon}
            </div>
            <div>
              <h4 className="font-medium">{currentVoiceOption?.name}</h4>
              <p className="text-xs text-muted-foreground">{currentVoiceOption?.description}</p>
            </div>
          </div>

          {/* Teaser Text */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{teaserText}"
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => setProgress(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.floor((progress / 100) * 45)}s</span>
              <span>45s</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button size="sm" variant="ghost">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button size="sm" variant="ghost">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={volume}
              max={100}
              step={1}
              className="flex-1"
              onValueChange={setVolume}
            />
          </div>

          {/* Voice Selection */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Switch Voice
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {voiceOptions.map((voice) => (
                <Button
                  key={voice.id}
                  variant={currentVoice === voice.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVoiceChange(voice.id)}
                  className="h-auto p-3 flex flex-col items-center space-y-1"
                >
                  <span className="text-lg">{voice.icon}</span>
                  <span className="text-xs text-center leading-tight">
                    {voice.name.split(' ')[0]}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close Player
          </Button>
        </div>

        {/* Waveform Animation */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-60">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </Card>
    </div>
  );
}