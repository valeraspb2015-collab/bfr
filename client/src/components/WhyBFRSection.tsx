import { MessageCircle, Wallet, Sparkles, Users, Shield, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WhyBFRSection() {
  const advantages = [
    {
      id: "direct-contact",
      icon: MessageCircle,
      title: "Прямой контакт",
      description: "Вы не ищете — вас находят. Хозяева сами откликаются на вашу заявку.",
    },
    {
      id: "no-commission",
      icon: Wallet,
      title: "Без лишних затрат",
      description: "Никаких сервисных сборов. Вы платите напрямую хозяину.",
    },
    {
      id: "ai-automation",
      icon: Sparkles,
      title: "Умная автоматизация",
      description: "Бронник AI из всех откликов выбирает 5 самых подходящих под ваш запрос, пока не подберет подходящий вам вариант.",
    },
    {
      id: "community",
      icon: Users,
      title: "Сообщество",
      description: "За платформой стоят реальные хозяева из городов России, а не агрегаторы.",
    },
    {
      id: "security",
      icon: Shield,
      title: "Безопасность",
      description: "Прямой контакт с хозяином после выбора — общайтесь без посредников.",
    },
    {
      id: "speed",
      icon: Smartphone,
      title: "Всегда на связи",
      description: "Вне зависимости от блокировок, вы всегда будете на связи.",
    },
  ];

  return (
    <section className="py-20 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#1c1917" }}
            data-testid="text-why-bfr-title"
          >
            Почему БФР?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.08)",
                  boxShadow: "0 2px 12px rgba(28,25,23,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 28px rgba(200,98,42,0.12), 0 2px 8px rgba(28,25,23,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 12px rgba(28,25,23,0.06)";
                }}
                data-testid={`card-advantage-${item.id}`}
              >
                <div className="p-6">
                  <div
                    className="mb-4 flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(200,98,42,0.12)",
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#c8622a" }} />
                  </div>
                  <h3
                    className="text-base font-semibold mb-2 transition-colors"
                    style={{ color: "#1c1917" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
