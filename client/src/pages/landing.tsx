import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import LandingHero from "@/components/LandingHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustStrip from "@/components/TrustStrip";
import PopularQuestions from "@/components/PopularQuestions";
import CtaSection from "@/components/CtaSection";
import HelpFooter from "@/components/HelpFooter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => setLocation("/request");
  const handleOwnerApplication = () => setLocation("/community?tab=register");

  return (
    <div className="min-h-screen" style={{ background: "#faf7f2" }}>
      <HelpHeader onRequestClick={handleGetStarted} />

      {/* Hero slider — 3 scenes */}
      <LandingHero
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />

      {/* Compact trust facts */}
      <TrustStrip />

      {/* How it works — 3 steps */}
      <HowItWorksSection />

      {/* FAQ */}
      <PopularQuestions />

      {/* Final CTA — also serves as #cooperation anchor for footer nav */}
      <div id="cooperation">
        <CtaSection onApplyClick={handleGetStarted} />
      </div>

      <HelpFooter
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
    </div>
  );
}
