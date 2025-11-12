import { useLocation } from "wouter";
import RequestForm from "@/components/RequestForm";
import type { RequestFormData } from "@/components/RequestForm";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Request() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const submitRequestMutation = useMutation({
    mutationFn: async (data: RequestFormData) => {
      const response = await apiRequest("POST", "/api/apartment-requests", data);
      return await response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 10 минут. Проверьте @bfrreplit_bot в Telegram.",
      });

      if (response.whatsappUrl) {
        window.open(response.whatsappUrl, '_blank');
      }
      
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось отправить заявку",
        variant: "destructive",
      });
    },
  });

  const handleBack = () => {
    setLocation("/");
  };

  const handleSubmit = (data: RequestFormData) => {
    submitRequestMutation.mutate(data);
  };

  return <RequestForm onBack={handleBack} onSubmit={handleSubmit} />;
}
