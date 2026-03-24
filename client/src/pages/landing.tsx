import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpHero from "@/components/HelpHero";
import LiveRequestsTicker from "@/components/LiveRequestsTicker";
import WhyBFRSection from "@/components/WhyBFRSection";
import GuidesSection from "@/components/GuidesSection";
import PopularQuestions from "@/components/PopularQuestions";
import MoreInfoSection from "@/components/MoreInfoSection";
import CooperationSection from "@/components/CooperationSection";
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
    <div className="min-h-screen relative" style={{ background: "#faf7f2" }}>
      <HelpHeader />
      <HelpHero 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <LiveRequestsTicker />
      <WhyBFRSection />
      <GuidesSection 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
      <PopularQuestions />
      <MoreInfoSection />
      <CooperationSection />
      <HelpFooter 
        onGuestClick={handleGetStarted} 
        onOwnerClick={handleOwnerApplication} 
      />
    </div>
  );
}
