import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/request");
  };

  const handleOwnerApplication = () => {
    setLocation("/owner-application");
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} onOwnerApplication={handleOwnerApplication} />
      <FAQ />
      <HowItWorks onSubmitRequest={handleGetStarted} />
      <Footer />
    </div>
  );
}
