import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Banknote, CheckCircle2 } from "lucide-react";

interface HelpHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpHero({ onGuestClick }: HelpHeroProps) {
  const trustMarkers = [
    { label: "Без комиссий" },
    { label: "Прямой контакт" },
    { label: "Топ-5 вариантов от AI" },
  ];

  const mockCards = [
    { name: "Анна", city: "Сочи", rooms: "2-комн.", dates: "12–19 июля", budget: "4000–5500₽/ночь" },
    { name: "Дмитрий", city: "Казань", rooms: "Студия", dates: "3–8 августа", budget: "до 3500₽/ночь" },
    { name: "Мария", city: "СПб", rooms: "1-комн.", dates: "20–27 июня", budget: "3000–4500₽/ночь" },
  ];

  return (
    <section
      className="relative px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 90% 10%, rgba(200,98,42,0.10) 0%, transparent 65%), " +
          "radial-gradient(ellipse 50% 45% at 5% 90%, rgba(74,124,89,0.09) 0%, transparent 60%), " +
          "#faf7f2",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-5">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  color: "#c8622a",
                  borderColor: "rgba(200,98,42,0.3)",
                  background: "rgba(200,98,42,0.07)",
                }}
                data-testid="badge-slogan"
              >
                Сообщество хозяев квартир России
              </span>
            </div>

            <h1
              className="font-extrabold leading-tight tracking-tight mb-5"
              style={{
                color: "#1c1917",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 800,
              }}
              data-testid="text-hero-title"
            >
              Опишите, что нужно —{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #c8622a 0%, #e07540 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                хозяева сами предложат варианты
              </span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "#6b6560", maxWidth: "480px" }}
              data-testid="text-hero-subtitle"
            >
              Одна заявка — прямые отклики от хозяев, без комиссий и переплат.
              Бронник AI отберёт лучшие предложения и вернёт вам топ-варианты в выбранный вами способ связи.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                size="lg"
                onClick={onGuestClick}
                className="rounded-xl text-white gap-2"
                style={{
                  background: "#c8622a",
                  boxShadow: "0 4px 20px rgba(200,98,42,0.22)",
                }}
                data-testid="button-hero-action"
              >
                Оставить заявку
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-xl"
                style={{ borderColor: "rgba(28,25,23,0.15)", color: "#1c1917" }}
                data-testid="button-hero-how"
              >
                <a href="#how-it-works">Как это работает</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {trustMarkers.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
                  <span className="text-sm" style={{ color: "#6b6560" }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:flex lg:justify-end">
            <div
              className="rounded-2xl p-5 max-w-sm w-full mx-auto lg:mx-0"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(28,25,23,0.08)",
                boxShadow: "0 8px 40px rgba(28,25,23,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#4a7c59" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "#1c1917" }}>
                    Сейчас ищут жильё
                  </span>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(74,124,89,0.10)", color: "#4a7c59" }}
                >
                  онлайн
                </span>
              </div>

              <div className="space-y-3">
                {mockCards.map((card, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3.5"
                    style={{
                      background: "#faf7f2",
                      border: "1px solid rgba(28,25,23,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold" style={{ color: "#1c1917" }}>
                        {card.name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(200,98,42,0.09)",
                          color: "#c8622a",
                          fontSize: "11px",
                        }}
                      >
                        новая заявка
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
                        <MapPin className="w-3 h-3" /> {card.city}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
                        <Calendar className="w-3 h-3" /> {card.dates}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#c8622a" }}>
                        <Banknote className="w-3 h-3" /> {card.budget}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 pt-4 text-center text-xs"
                style={{ borderTop: "1px solid rgba(28,25,23,0.06)", color: "#a39e98" }}
              >
                Хозяева получают заявки и откликаются напрямую
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
