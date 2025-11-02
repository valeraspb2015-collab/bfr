import { useLocation } from "wouter";
import AdminPanel from "@/components/AdminPanel";

export default function Admin() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  return <AdminPanel onBack={handleBack} />;
}
