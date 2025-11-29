import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpHero from "@/components/HelpHero";
import GuidesSection from "@/components/GuidesSection";
import PopularQuestions from "@/components/PopularQuestions";
import MoreInfoSection from "@/components/MoreInfoSection";
import ContactSection from "@/components/ContactSection";
import HelpFooter from "@/components/HelpFooter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/request");
  };

  const handleOwnerApplication = () => {
    setLocation("/owner-application");
  };

  return (
    <div className="min-h-screen bg-white">
      <HelpHeader />
      <HelpHero 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <GuidesSection 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <PopularQuestions />
      <MoreInfoSection />
      <ContactSection />
      <HelpFooter 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
    </div>
  );
}
