import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, User, Clock, Star } from "lucide-react";

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

interface DiscoveryFeedProps {
  persona: {
    name: string;
    mood: string;
    voiceTone: string;
  };
  onPlayTeaser: (book: AudioBook) => void;
  onBack: () => void;
}

const mockAudiobooks: AudioBook[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    genre: "Fiction",
    mood: "reflective",
    duration: "8h 32m",
    rating: 4.7,
    aiDescription: "A contemplative journey through infinite possibilities, perfect for your late-night listening sessions. Haig's philosophical narrative explores regret and hope with a gentle, introspective tone.",
    narratorVoice: "calm"
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop",
    genre: "Sci-Fi",
    mood: "adventurous",
    duration: "16h 10m",
    rating: 4.9,
    aiDescription: "An exhilarating space adventure that matches your love for fast-paced storytelling. Weir's humor and scientific wonder create the perfect narrative companion for your dynamic lifestyle.",
    narratorVoice: "energetic"
  },
  {
    id: "3",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    genre: "Literary Fiction",
    mood: "peaceful",
    duration: "10h 17m",
    rating: 4.5,
    aiDescription: "Ishiguro's masterful prose unfolds like a meditation on consciousness and love. This gentle narrative aligns with your preference for reflective, soul-stirring stories.",
    narratorVoice: "warm"
  },
  {
    id: "4",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    genre: "Mystery",
    mood: "curious",
    duration: "9h 45m",
    rating: 4.6,
    aiDescription: "A delightfully clever mystery that satisfies your curious nature. Osman's wit and charm create an engaging puzzle that's perfect for your mindful listening moments.",
    narratorVoice: "friendly"
  },
  {
    id: "5",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
    genre: "Historical Fiction",
    mood: "dramatic",
    duration: "12h 10m",
    rating: 4.8,
    aiDescription: "A captivating tale of glamour and secrets that unfolds with theatrical flair. Reid's storytelling prowess creates an immersive experience perfect for your dramatic sensibilities.",
    narratorVoice: "expressive"
  }
];

export default function DiscoveryFeed({ persona, onPlayTeaser, onBack }: DiscoveryFeedProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayTeaser = (book: AudioBook) => {
    if (playingId === book.id) {
      setPlayingId(null);
    } else {
      setPlayingId(book.id);
      onPlayTeaser(book);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Curated for You</h1>
              <p className="text-sm text-muted-foreground">{persona.name}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary hover:text-primary/80"
            >
              <User className="h-4 w-4 mr-1" />
              Persona
            </Button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-6">
        {mockAudiobooks.map((book, index) => (
          <Card 
            key={book.id} 
            className="overflow-hidden bg-gradient-to-br from-card to-muted/20 border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex p-4 space-x-4">
              {/* Cover */}
              <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {book.genre}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-primary/30">
                    {book.mood}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {book.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {book.rating}
                  </div>
                </div>

                {/* AI Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.aiDescription}
                </p>

                {/* Play Button */}
                <Button
                  size="sm"
                  onClick={() => handlePlayTeaser(book)}
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50"
                >
                  {playingId === book.id ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play Intro
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Audio Waveform Indicator */}
            {playingId === book.id && (
              <div className="px-4 pb-4">
                <div className="flex items-center gap-1 h-8 justify-center">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-wave"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs text-primary font-medium">
                    Playing in {book.narratorVoice} voice...
                  </p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20" />
    </div>
  );
}