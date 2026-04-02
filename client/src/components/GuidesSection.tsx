import { User, Home, ArrowRight } from "lucide-react";

interface GuidesSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

const cards = [
  {
    icon: User,
    color: "#c8622a",
    bg: "rgba(200,98,42,0.09)",
    title: "Первые шаги гостя",
    description: "Как оставить заявку и получить предложения от хозяев за несколько минут",
    action: "guest",
    cta: "Оставить заявку",
  },
  {
    icon: Home,
    color: "#4a7c59",
    bg: "rgba(74,124,89,0.09)",
    title: "Первые шаги хозяина",
    description: "Как начать получать заявки от гостей напрямую в мессенджер",
    action: "owner",
    cta: "Стать хозяином",
  },
];

export default function GuidesSection({ onGuestClick, onOwnerClick }: GuidesSectionProps) {
  return (
    <section className="py-14 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl font-bold mb-6 tracking-tight"
          style={{ color: "#1c1917" }}
          data-testid="text-guides-title"
        >
          Полезно знать
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            const handleClick = card.action === "guest" ? onGuestClick : onOwnerClick;
            return (
              <button
                key={card.title}
                onClick={handleClick}
                className="text-left rounded-2xl p-5 flex items-start gap-4 group transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.07)",
                  boxShadow: "0 2px 10px rgba(28,25,23,0.05)",
                }}
                data-testid={`card-guide-${card.action}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: card.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "#1c1917" }}>
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#6b6560" }}>
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: card.color }}>
                    {card.cta} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
