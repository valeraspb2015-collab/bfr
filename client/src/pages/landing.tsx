import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/request");
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
