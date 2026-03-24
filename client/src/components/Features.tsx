import { Home, Zap, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Home,
    title: "Реальные хозяева",
    description: "Только проверенные владельцы квартир. Без посредников и обмана."
  },
  {
    icon: Zap,
    title: "Быстрая обратная связь",
    description: "Мы подберём варианты жилья в течение 10 минут после заявки."
  },
  {
    icon: MessageCircle,
    title: "Простая коммуникация",
    description: "Общайтесь с хозяином напрямую в выбранный вами способ связи."
  }
];

export default function Features() {
  return (
    <section className="max-w-[900px] mx-auto my-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-[24px] font-semibold text-[#004d80] mb-6">Почему выбирают БФР</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={index} 
              className="bg-[#f9fcff] border border-[#e0e0e0] rounded-lg p-5 space-y-3"
              data-testid={`card-feature-${index}`}
            >
              <Icon className="w-8 h-8 text-[#0078d7]" />
              <h3 className="text-[18px] font-semibold text-[#333]">{feature.title}</h3>
              <p className="text-[15px] text-[#666] leading-relaxed">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
