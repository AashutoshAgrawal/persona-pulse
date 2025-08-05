import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import PersonaScreen from "@/components/PersonaScreen";
import DiscoveryFeed from "@/components/DiscoveryFeed";
import AudioTeaserPlayback from "@/components/AudioTeaserPlayback";
import AudioJourney from "@/components/AudioJourney";
import { useToast } from "@/hooks/use-toast";

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

type AppScreen = "onboarding" | "persona" | "feed" | "teaser" | "journey";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("onboarding");
  const [persona, setPersona] = useState<PersonaData | null>(null);
  const [selectedBook, setSelectedBook] = useState<AudioBook | null>(null);
  const { toast } = useToast();

  const handleOnboardingComplete = (newPersona: PersonaData) => {
    setPersona(newPersona);
    setCurrentScreen("persona");
    toast({
      title: "Welcome to SoundPersona! 🎵",
      description: `Your ${newPersona.name} persona is ready to discover amazing audiobooks.`,
    });
  };

  const handleSurpriseMe = () => {
    toast({
      title: "🎲 Surprise recommendation coming up!",
      description: "Our AI is crafting a perfect audiobook match for your current mood...",
    });
    // Simulate loading time
    setTimeout(() => {
      setCurrentScreen("feed");
    }, 2000);
  };

  const handlePlayTeaser = (book: AudioBook) => {
    setSelectedBook(book);
    setCurrentScreen("teaser");
  };

  const handleCloseTeaserPlayer = () => {
    setSelectedBook(null);
    setCurrentScreen("feed");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case "persona":
        return persona ? (
          <PersonaScreen
            persona={persona}
            onEdit={() => setCurrentScreen("onboarding")}
            onSurpriseMe={handleSurpriseMe}
            onViewFeed={() => setCurrentScreen("feed")}
          />
        ) : null;
      
      case "feed":
        return persona ? (
          <DiscoveryFeed
            persona={persona}
            onPlayTeaser={handlePlayTeaser}
            onBack={() => setCurrentScreen("persona")}
          />
        ) : null;
      
      case "teaser":
        return selectedBook ? (
          <AudioTeaserPlayback
            book={selectedBook}
            onClose={handleCloseTeaserPlayer}
          />
        ) : null;
      
      case "journey":
        return persona ? (
          <AudioJourney
            persona={persona}
            onBack={() => setCurrentScreen("persona")}
          />
        ) : null;
      
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default Index;
