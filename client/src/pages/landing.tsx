import { useLocation } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpHero from "@/components/HelpHero";
import ComparisonSection from "@/components/ComparisonSection";
import LiveRequestsTicker from "@/components/LiveRequestsTicker";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyBFRSection from "@/components/WhyBFRSection";
import TrustSection from "@/components/TrustSection";
import AudiencesSection from "@/components/AudiencesSection";
import GuidesSection from "@/components/GuidesSection";
import InstallSection from "@/components/InstallSection";
import PopularQuestions from "@/components/PopularQuestions";
import CooperationSection from "@/components/CooperationSection";
import CtaSection from "@/components/CtaSection";
import HelpFooter from "@/components/HelpFooter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => setLocation("/request");
  const handleOwnerApplication = () => setLocation("/for-owners");

  return (
    <div className="min-h-screen relative" style={{ background: "#faf7f2" }}>
      <HelpHeader onRequestClick={handleGetStarted} />
      <HelpHero
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
      <ComparisonSection />
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
      <InstallSection />
      <PopularQuestions />
      <CooperationSection />
      <CtaSection onApplyClick={handleGetStarted} />
      <HelpFooter
        onGuestClick={handleGetStarted}
        onOwnerClick={handleOwnerApplication}
      />
    </div>
  );
}
