import { useLocation } from "wouter";
import OwnerDashboard from "@/components/OwnerDashboard";

export default function Owner() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  return <OwnerDashboard onBack={handleBack} />;
}
