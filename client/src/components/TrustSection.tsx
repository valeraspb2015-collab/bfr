import { Users, Banknote, Shield, HeadphonesIcon } from "lucide-react";

const trustPoints = [
  {
    icon: Users,
    title: "Реальные хозяева",
    description: "Живые люди с историей и отзывами — не обезличенные агрегаторы.",
  },
  {
    icon: Banknote,
    title: "Без скрытых сборов",
    description: "Платите только хозяину. Комиссий платформе нет.",
  },
  {
    icon: Shield,
    title: "Правила и репутация",
    description: "Черный список, верификация объектов, поддержка в спорах.",
  },
  {
    icon: HeadphonesIcon,
    title: "Всегда на связи",
    description: "Поддержка через Telegram, WhatsApp и Макс — вне зависимости от блокировок.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="font-bold tracking-tight mb-3"
              style={{
                color: "#1c1917",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
              }}
              data-testid="text-trust-title"
            >
              Почему нам доверяют
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#6b6560", maxWidth: "380px" }}>
              В аренде главное — доверие. БФР строится на прямом контакте, прозрачных правилах и репутации.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title}>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: "rgba(200,98,42,0.09)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#c8622a" }} />
                    </div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: "#1c1917" }}>
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.07)",
              boxShadow: "0 4px 24px rgba(28,25,23,0.06)",
            }}
          >
            <h3 className="text-base font-bold mb-5" style={{ color: "#1c1917" }}>
              Как БФР защищает участников
            </h3>
            <div className="space-y-3.5">
              {[
                "Хозяева верифицируют объект ссылкой на крупный сервис аренды",
                "Система отзывов после каждой аренды",
                "Чёрный список — ненадёжные участники не получают доступ к заявкам",
                "Администраторы участвуют в разборе спорных ситуаций",
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
              className="mt-6 pt-5"
              style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}
            >
              <p className="text-xs mb-3" style={{ color: "#a39e98" }}>Поддержка:</p>
              <div className="flex gap-4">
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
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#c8622a" }}
                    data-testid={`link-trust-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
