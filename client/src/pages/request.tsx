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
    onSuccess: (data) => {
      toast({
        title: "Заявка отправлена!",
        description: "Открываем WhatsApp для связи с нами...",
      });
      
      // Открываем WhatsApp с заполненным сообщением
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
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
