import { Users, Banknote, Shield, HeadphonesIcon } from "lucide-react";

const trustPoints = [
  {
    icon: Users,
    title: "Реальные хозяева",
    description: "Не обезличенные агрегаторы — живые люди из сообщества с историей и отзывами.",
  },
  {
    icon: Banknote,
    title: "Прозрачная механика",
    description: "Никаких скрытых комиссий. Вы платите напрямую хозяину на согласованных условиях.",
  },
  {
    icon: Shield,
    title: "Правила и безопасность",
    description: "Чёрный список ненадёжных участников, репутация, история переписки и поддержка в спорах.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка",
    description: "Служба поддержки доступна через Telegram, WhatsApp и Макс — всегда на связи.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ color: "#1c1917" }}
              data-testid="text-trust-title"
            >
              Почему вам можно доверять нам
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#6b6560" }}>
              В аренде главное — доверие. БФР строится на прямых отношениях между людьми,
              прозрачных правилах и системе репутации внутри сообщества.
            </p>

            <div className="space-y-5">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "rgba(200,98,42,0.10)",
                      }}
                    >
                      <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" style={{ color: "#c8622a" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-0.5" style={{ color: "#1c1917" }}>
                        {point.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.08)",
              boxShadow: "0 4px 24px rgba(28,25,23,0.06)",
            }}
          >
            <h3 className="text-lg font-bold mb-5" style={{ color: "#1c1917" }}>
              Как БФР защищает участников
            </h3>
            <div className="space-y-4">
              {[
                "Верификация объектов — хозяева подтверждают жильё ссылкой на крупный сервис аренды",
                "Система отзывов и репутации внутри сообщества после каждой аренды",
                "Чёрный список — ненадёжные участники не получают доступ к заявкам",
                "Администраторы помогают разобраться в спорных ситуациях",
                "Все условия фиксируются в переписке до оплаты",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: "#4a7c59" }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-5 flex flex-col gap-2"
              style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: "#a39e98" }}>
                Связаться с поддержкой:
              </p>
              {[
                { label: "Telegram", href: "https://t.me/bfrreplit_bot" },
                { label: "WhatsApp", href: "https://wa.me/79899865887" },
                { label: "Макс", href: "https://max.ru/call/+79213798941" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors"
                  style={{ color: "#c8622a" }}
                  data-testid={`link-trust-${link.label.toLowerCase()}`}
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
