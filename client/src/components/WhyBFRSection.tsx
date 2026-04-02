import { MessageCircle, Wallet, Sparkles, Users } from "lucide-react";

const advantages = [
  {
    icon: MessageCircle,
    title: "Прямой контакт с хозяином",
    description: "Без посредников, агентов и скрытых цепочек.",
  },
  {
    icon: Wallet,
    title: "Без сервисных сборов",
    description: "Платите ровно столько, сколько договорились с хозяином.",
  },
  {
    icon: Sparkles,
    title: "AI отбирает лучшие отклики",
    description: "Бронник AI анализирует предложения и выбирает топ-5 под ваш запрос.",
  },
  {
    icon: Users,
    title: "Сообщество реальных хозяев",
    description: "Живые хозяева из городов России — не агрегаторы и не перекупщики.",
  },
];

export default function WhyBFRSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2
            className="font-bold tracking-tight mb-2"
            style={{
              color: "#1c1917",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
            }}
            data-testid="text-why-bfr-title"
          >
            Почему БФР?
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Прямой контакт, без комиссий, AI-подбор
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.07)",
                }}
                data-testid={`card-advantage-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,98,42,0.09)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#c8622a" }} />
                </div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: "#1c1917" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
