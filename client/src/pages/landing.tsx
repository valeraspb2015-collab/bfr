import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
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
      <Features />
      <HowItWorks onSubmitRequest={handleGetStarted} />
      <Footer />
    </div>
  );
}
