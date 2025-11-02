import { useLocation } from "wouter";
import RequestForm from "@/components/RequestForm";
import type { RequestFormData } from "@/components/RequestForm";
import { useToast } from "@/hooks/use-toast";

export default function Request() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleBack = () => {
    setLocation("/");
  };

  const handleSubmit = (data: RequestFormData) => {
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 10 минут.",
    });
    console.log('Request submitted:', data);
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };

  return <RequestForm onBack={handleBack} onSubmit={handleSubmit} />;
}
