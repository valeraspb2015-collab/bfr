import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import LandingHero from "@/components/LandingHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyTrustSection from "@/components/WhyTrustSection";
import PopularQuestions from "@/components/PopularQuestions";
import CtaSection from "@/components/CtaSection";
import HelpFooter from "@/components/HelpFooter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => setLocation("/request");
  const handleOwnerApplication = () => setLocation("/community?tab=register");

  return (
    <div className="min-h-screen relative" style={{ background: "#faf7f2" }}>
      <HelpHeader onRequestClick={handleGetStarted} />
      <LandingHero
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
      <HowItWorksSection />
      <WhyTrustSection />
      <PopularQuestions />
      <CtaSection onApplyClick={handleGetStarted} />
      <HelpFooter
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
    </div>
  );
}
