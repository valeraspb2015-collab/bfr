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
    <section className="py-16 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 tracking-tight"
          style={{ color: "#1c1917" }}
          data-testid="text-more-info-title"
        >
          Подробнее
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {infoCards.map((card) => (
            <Card
              key={card.id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(28,25,23,0.08)",
                boxShadow: "0 2px 12px rgba(28,25,23,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 28px rgba(13,115,119,0.12), 0 2px 8px rgba(28,25,23,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(28,25,23,0.06)";
              }}
              data-testid={`card-info-${card.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden" style={{ background: "#f3ede3" }}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <h3
                  className="text-base font-semibold mb-2 transition-colors"
                  style={{ color: "#1c1917" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
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
