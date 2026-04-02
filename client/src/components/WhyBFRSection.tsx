import { MessageCircle, Wallet, Sparkles, Users } from "lucide-react";

const advantages = [
  {
    icon: MessageCircle,
    title: "Прямой контакт с хозяином",
    description: "Вы общаетесь напрямую — без посредников, агентов и скрытых цепочек.",
  },
  {
    icon: Wallet,
    title: "Без сервисных сборов",
    description: "Никаких комиссий платформе. Вы платите ровно столько, сколько договорились с хозяином.",
  },
  {
    icon: Sparkles,
    title: "AI отбирает лучшие отклики",
    description: "Бронник AI анализирует все предложения и выбирает топ-5, подходящих под ваш запрос.",
  },
  {
    icon: Users,
    title: "Сообщество реальных хозяев",
    description: "За платформой стоят живые хозяева из городов России — не агрегаторы и не перекупщики.",
  },
];

export default function WhyBFRSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: "#1c1917" }}
            data-testid="text-why-bfr-title"
          >
            Почему БФР?
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Прямой контакт, без комиссий, с AI-подбором
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.07)",
                  boxShadow: "0 2px 12px rgba(28,25,23,0.05)",
                }}
                data-testid={`card-advantage-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,98,42,0.10)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#c8622a" }} />
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "#1c1917" }}>
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
