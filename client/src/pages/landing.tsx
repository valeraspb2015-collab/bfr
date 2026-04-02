import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpHero from "@/components/HelpHero";
import LiveRequestsTicker from "@/components/LiveRequestsTicker";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyBFRSection from "@/components/WhyBFRSection";
import TrustSection from "@/components/TrustSection";
import AudiencesSection from "@/components/AudiencesSection";
import GuidesSection from "@/components/GuidesSection";
import PopularQuestions from "@/components/PopularQuestions";
import CooperationSection from "@/components/CooperationSection";
import HelpFooter from "@/components/HelpFooter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => setLocation("/request");
  const handleOwnerApplication = () => setLocation("/owner-application");

  return (
    <div className="min-h-screen relative" style={{ background: "#faf7f2" }}>
      <HelpHeader onRequestClick={handleGetStarted} />
      <HelpHero
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
      <LiveRequestsTicker />
      <HowItWorksSection />
      <WhyBFRSection />
      <TrustSection />
      <AudiencesSection
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
      <GuidesSection
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
      <PopularQuestions />
      <CooperationSection />
      <HelpFooter
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
    </div>
  );
}
