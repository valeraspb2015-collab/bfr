import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpHero from "@/components/HelpHero";
import WhyBFRSection from "@/components/WhyBFRSection";
import GuidesSection from "@/components/GuidesSection";
import PopularQuestions from "@/components/PopularQuestions";
import MoreInfoSection from "@/components/MoreInfoSection";
import HomeReserveWidget from "@/components/HomeReserveWidget";
import HomeReserveSearch from "@/components/HomeReserveSearch";
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
    <div className="min-h-screen bg-white relative">
      <HelpHeader />
      <HelpHero 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <WhyBFRSection />
      <GuidesSection 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <PopularQuestions />
      <MoreInfoSection />
      <HomeReserveWidget />
      <HomeReserveSearch />
      <ContactSection />
      <HelpFooter 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
    </div>
  );
}
