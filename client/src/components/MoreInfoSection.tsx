import { Card } from "@/components/ui/card";
import rulesImage from "@assets/generated_images/community_rules_guidelines.png";
import safetyImage from "@assets/generated_images/safety_and_security_shield.png";

export default function MoreInfoSection() {
  const infoCards = [
    {
      id: "rules",
      image: rulesImage,
      title: "Наши правила сообщества",
      description: "Как мы создаём безопасную и уважительную атмосферу для гостей и хозяев",
    },
    {
      id: "safety",
      image: safetyImage,
      title: "Советы по безопасности",
      description: "Рекомендации для безопасного бронирования и размещения гостей",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-slate-50 mb-12 tracking-tight"
          data-testid="text-more-info-title"
        >
          Подробнее
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {infoCards.map((card) => (
            <Card
              key={card.id}
              className="group overflow-hidden border border-white/[0.07] bg-[#13131a] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.12)] cursor-pointer"
              data-testid={`card-info-${card.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#0a0a0f]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
