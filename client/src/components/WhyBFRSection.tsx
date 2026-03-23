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
      title: "Надежный контакт",
      description: "Резервная связь в случае проблем.",
    },
    {
      id: "no-commission",
      image: savingsImage,
      title: "Без лишних затрат",
      description: "Нет скрытых сборов — базовая экономия уже заложена в модель.",
    },
    {
      id: "ai-automation",
      image: aiImage,
      title: "Умная автоматизация",
      description: "Нейросети ускоряют процесс поиска и аренды квартир.",
    },
    {
      id: "community",
      image: communityImage,
      title: "Сообщество",
      description: "Неформальное сообщество, ориентированное на рынок аренды жилья, основанное на группах в мессенджерах и социальных сетях.",
    },
    {
      id: "security",
      image: securityImage,
      title: "Безопасность",
      description: "Доверие формируется через открытые источники, личные контакты и рекомендации участников.",
    },
    {
      id: "speed",
      image: speedImage,
      title: "Прямая оплата",
      description: "Деньги поступают напрямую хозяину без сервисов-посредников.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a24]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight"
            data-testid="text-why-bfr-title"
          >
            Почему БФР?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border border-white/[0.07] bg-[#13131a] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.12)]"
              data-testid={`card-advantage-${item.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#0a0a0f]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
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
