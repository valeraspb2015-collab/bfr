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
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10"
          data-testid="text-more-info-title"
        >
          Подробнее
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {infoCards.map((card) => (
            <Card
              key={card.id}
              className="group overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white hover:-translate-y-1"
              data-testid={`card-info-${card.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-[#0078d7] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
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
