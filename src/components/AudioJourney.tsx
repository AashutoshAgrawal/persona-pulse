import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Heart, Clock, ArrowLeft } from "lucide-react";

interface AudioJourneyProps {
  persona: {
    name: string;
    mood: string;
  };
  onBack: () => void;
}

const mockJourneyData = {
  moodShifts: [
    { date: "Nov 2024", mood: "Reflective", books: 8, color: "bg-blue-500" },
    { date: "Oct 2024", mood: "Adventurous", books: 12, color: "bg-orange-500" },
    { date: "Sep 2024", mood: "Peaceful", books: 6, color: "bg-green-500" },
    { date: "Aug 2024", mood: "Curious", books: 10, color: "bg-purple-500" },
    { date: "Jul 2024", mood: "Intense", books: 15, color: "bg-red-500" }
  ],
  favoriteGenres: [
    { genre: "Science Fiction", percentage: 35, count: 18 },
    { genre: "Mystery & Thriller", percentage: 28, count: 14 },
    { genre: "Literary Fiction", percentage: 22, count: 11 },
    { genre: "Philosophy", percentage: 15, count: 8 }
  ],
  recurringThemes: [
    "Existential exploration and purpose",
    "Human connection and relationships",
    "Technological impact on society"
  ],
  stats: {
    totalHours: 142,
    booksCompleted: 51,
    averageRating: 4.6,
    consecutiveDays: 89
  }
};

export default function AudioJourney({ persona, onBack }: AudioJourneyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Your Audio Journey</h1>
              <p className="text-sm text-muted-foreground">{persona.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Listening Insights
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-primary">{mockJourneyData.stats.totalHours}h</div>
              <div className="text-xs text-muted-foreground">Total Listened</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-secondary">{mockJourneyData.stats.booksCompleted}</div>
              <div className="text-xs text-muted-foreground">Books Completed</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-accent">{mockJourneyData.stats.averageRating}</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-primary">{mockJourneyData.stats.consecutiveDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </Card>

        {/* Mood Evolution */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            Mood Evolution
          </h3>
          <div className="space-y-3">
            {mockJourneyData.moodShifts.map((shift, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground w-16">{shift.date}</div>
                <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                  <div 
                    className={`h-full ${shift.color} transition-all duration-1000 animate-fade-in`}
                    style={{ width: `${(shift.books / 15) * 100}%`, animationDelay: `${index * 100}ms` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                    <span className="text-white">{shift.mood}</span>
                    <span className="ml-auto text-white/80">{shift.books} books</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Favorite Genres */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Genre Preferences</h3>
          <div className="space-y-4">
            {mockJourneyData.favoriteGenres.map((genre, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{genre.genre}</span>
                  <span className="text-muted-foreground">{genre.count} books</span>
                </div>
                <div className="bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 animate-fade-in"
                    style={{ width: `${genre.percentage}%`, animationDelay: `${index * 200}ms` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{genre.percentage}% of your library</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recurring Themes */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Your Recurring Themes</h3>
          <div className="space-y-3">
            {mockJourneyData.recurringThemes.map((theme, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{theme}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Persona Evolution Suggestion */}
        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
          <h3 className="font-semibold mb-3">🎯 Persona Evolution Insight</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your journey, you're evolving from a <Badge variant="secondary">Late-Night Explorer</Badge> 
            into a <Badge variant="outline" className="border-primary/50">Philosophical Wanderer</Badge>. 
            Your growing interest in existential themes suggests you're ready for deeper, more contemplative content.
          </p>
          <Button size="sm" variant="outline" className="w-full border-primary/30 hover:border-primary/60">
            <Clock className="mr-2 h-4 w-4" />
            Update My Persona
          </Button>
        </Card>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}