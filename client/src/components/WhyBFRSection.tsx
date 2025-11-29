import { Percent, MessageCircle, Tag, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WhyBFRSection() {
  const advantages = [
    {
      id: "no-commission",
      icon: Percent,
      title: "Без комиссии",
      description: "Вы не платите сервисный сбор платформе. Вся сумма идёт напрямую хозяину жилья.",
      color: "#00a67d",
    },
    {
      id: "direct-contact",
      icon: MessageCircle,
      title: "Прямой контакт",
      description: "Общение с хозяином через WhatsApp и Telegram до любых оплат. Задайте все вопросы заранее.",
      color: "#0078d7",
    },
    {
      id: "fair-prices",
      icon: Tag,
      title: "Честные цены",
      description: "Никаких скрытых сборов за уборку и сервис. Цена, которую видите — цена, которую платите.",
      color: "#9b59b6",
    },
    {
      id: "ai-assistant",
      icon: Bot,
      title: "ИИ-помощник",
      description: "Автоматический подбор квартир под ваши требования и быстрые ответы на вопросы.",
      color: "#f39c12",
    },
  ];

  return (
    <section className="py-12 px-4 bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
          data-testid="text-why-bfr-title"
        >
          Почему БФР?
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Альтернатива комиссионным площадкам с современными технологиями
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white text-center"
                data-testid={`card-advantage-${item.id}`}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
