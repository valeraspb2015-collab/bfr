import { useLocation } from "wouter";
import OwnerApplicationForm from "@/components/OwnerApplicationForm";
import type { OwnerApplicationFormData } from "@/components/OwnerApplicationForm";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function OwnerApplication() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const submitApplicationMutation = useMutation({
    mutationFn: async (data: OwnerApplicationFormData) => {
      const response = await apiRequest("POST", "/api/owner-applications", data);
      return await response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Спасибо!",
        description: response.message || "Скоро с вами свяжемся.",
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

  const handleSubmit = (data: OwnerApplicationFormData) => {
    submitApplicationMutation.mutate(data);
  };

  return <OwnerApplicationForm onBack={handleBack} onSubmit={handleSubmit} />;
}
