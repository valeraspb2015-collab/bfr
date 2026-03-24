import { Card } from "@/components/ui/card";
import directContactImage from "@assets/generated_images/direct_contact_messaging_illustration.png";
import savingsImage from "@assets/generated_images/savings_no_hidden_fees.png";
import aiImage from "@assets/generated_images/ai_automation_neural_network.png";
import communityImage from "@assets/generated_images/community_support_group.png";
import securityImage from "@assets/generated_images/security_shield_protection.png";
import speedImage from "@assets/generated_images/fast_payment_lightning.png";

export default function WhyBFRSection() {
  const advantages = [
    {
      id: "direct-contact",
      image: directContactImage,
      title: "Прямой контакт",
      description: "Вы не ищете — вас находят. Хозяева сами откликаются на вашу заявку.",
    },
    {
      id: "no-commission",
      image: savingsImage,
      title: "Без лишних затрат",
      description: "Никаких сервисных сборов. Вы платите напрямую хозяину.",
    },
    {
      id: "ai-automation",
      image: aiImage,
      title: "Умная автоматизация",
      description: "Бронник AI из всех откликов выбирает 5 самых подходящих под ваш запрос, пока не подберет подходящий вам вариант.",
    },
    {
      id: "community",
      image: communityImage,
      title: "Сообщество",
      description: "За платформой стоят реальные хозяева из городов России, а не агрегаторы.",
    },
    {
      id: "security",
      image: securityImage,
      title: "Безопасность",
      description: "Прямой контакт с хозяином после выбора — общайтесь без посредников.",
    },
    {
      id: "speed",
      image: speedImage,
      title: "Прямая оплата",
      description: "Всё общение в Telegram, WhatsApp или Макс — там, где вам удобно.",
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
          {advantages.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
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
              <div className="aspect-[4/3] overflow-hidden" style={{ background: "#f3ede3" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
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
          ))}
        </div>
      </div>
    </section>
  );
}
