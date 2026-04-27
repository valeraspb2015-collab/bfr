import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, Send } from "lucide-react";

interface HelpHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpHero({ onGuestClick }: HelpHeroProps) {
  const trustMarkers = [
    { label: "Без сервисных сборов платформе" },
    { label: "Прямой контакт с хозяином" },
    { label: "Топ-5 — в мессенджер за минуты" },
  ];

  return (
    <section
      className="relative px-4 overflow-hidden"
      style={{
        background: "#faf7f2",
        paddingTop: "4.5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="mb-5">
              <span
                className="inline-block px-3.5 py-1 rounded-full text-xs font-medium border"
                style={{
                  color: "#0d7377",
                  borderColor: "rgba(13,115,119,0.25)",
                  background: "rgba(13,115,119,0.07)",
                }}
                data-testid="badge-slogan"
              >
                Аренда напрямую от хозяев · без сервисных сборов платформе
              </span>
            </div>

            <h1
              className="font-extrabold leading-tight tracking-tight mb-5"
              style={{
                color: "#1c1917",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
              }}
              data-testid="text-hero-title"
            >
              Одна заявка — и хозяева сами предложат варианты{" "}
              <span style={{ color: "#0d7377" }}>
                Напрямую, без лишнего поиска и переплат
              </span>
            </h1>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#6b6560", maxWidth: "430px" }}
              data-testid="text-hero-subtitle"
            >
              Опишите, что нужно. Хозяева откликнутся сами, а Бронник AI пришлёт топ-5 в ваш мессенджер.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                size="lg"
                onClick={onGuestClick}
                className="rounded-xl text-white gap-2"
                style={{
                  background: "#0d7377",
                  boxShadow: "0 4px 16px rgba(13,115,119,0.20)",
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
                style={{ borderColor: "rgba(28,25,23,0.14)", color: "#1c1917" }}
                data-testid="button-hero-how"
              >
                <a href="#how-it-works">Как это работает</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-5">
              {trustMarkers.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
                  <span className="text-sm" style={{ color: "#6b6560" }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product mockup */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="rounded-2xl p-5 w-full max-w-sm"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(28,25,23,0.08)",
                boxShadow: "0 8px 48px rgba(28,25,23,0.09)",
              }}
            >
              {/* Step 1: заявка */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(13,115,119,0.09)", color: "#0d7377" }}
                  >
                    01 Ваша заявка
                  </span>
                </div>
                <div
                  className="rounded-xl p-3.5"
                  style={{ background: "#faf7f2", border: "1px solid rgba(28,25,23,0.07)" }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: "#1c1917" }}>
                    Мария · Сочи
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                    2-комн. · 12–19 июля · 4 000–5 500 ₽/ночь
                  </p>
                </div>
              </div>

              {/* Step 2: отклики */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: "#4a7c59" }} />
                  <span className="text-xs font-semibold" style={{ color: "#4a7c59" }}>
                    02 Отклики от хозяев
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Хозяин Алексей", note: "2-комн., центр, 4 800 ₽" },
                    { name: "Хозяин Татьяна", note: "Студия с видом, 4 200 ₽" },
                    { name: "Хозяин Андрей", note: "2-комн., у моря, 5 100 ₽" },
                  ].map((r) => (
                    <div
                      key={r.name}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                      style={{
                        background: "#f3ede3",
                        border: "1px solid rgba(28,25,23,0.06)",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{ background: "rgba(13,115,119,0.12)", color: "#0d7377" }}
                      >
                        {r.name[7]}
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: "#1c1917" }}>{r.name}</p>
                        <p className="text-xs" style={{ color: "#6b6560" }}>{r.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: AI */}
              <div className="mb-4">
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(13,115,119,0.07)",
                    border: "1px solid rgba(13,115,119,0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
                    <span className="text-xs font-semibold" style={{ color: "#0d7377" }}>
                      03 Бронник AI выбирает топ-5
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                    Анализирует все отклики и отбирает наиболее подходящие под ваш запрос
                  </p>
                </div>
              </div>

              {/* Step 4: отправлено */}
              <div
                className="rounded-xl p-3 flex items-center gap-2.5"
                style={{
                  background: "rgba(74,124,89,0.08)",
                  border: "1px solid rgba(74,124,89,0.16)",
                }}
              >
                <Send className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a7c59" }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#4a7c59" }}>
                    04 Отправлено вам
                  </p>
                  <p className="text-xs" style={{ color: "#6b6560" }}>
                    Топ-5 вариантов — в Telegram, WhatsApp или Макс
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
