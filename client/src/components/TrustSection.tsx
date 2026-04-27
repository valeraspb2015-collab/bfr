import { Users, Banknote, Shield, HeadphonesIcon } from "lucide-react";

const trustPoints = [
  {
    icon: Users,
    title: "Подтверждённые хозяева",
    description: "Каждый хозяин подтверждает объект через профиль на крупном сервисе аренды. Это помогает отсеивать случайные аккаунты и сохранять доверие внутри БФР.",
  },
  {
    icon: Banknote,
    title: "Условия понятны до оплаты",
    description: "Стоимость, правила заселения и важные детали фиксируются в переписке заранее. Гость и хозяин заранее понимают, о чём договорились.",
  },
  {
    icon: Shield,
    title: "Репутация работает на всех",
    description: "После аренды участники оставляют отзывы. Репутация видна внутри сообщества, а нарушители теряют доступ к заявкам.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка в спорных ситуациях",
    description: "Если возникает спор, администраторы подключаются и помогают разобраться в ситуации на основе переписки и правил сообщества.",
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
              В аренде главное — доверие. BFR помогает гостям и хозяевам чувствовать себя спокойнее за счёт понятных правил, репутации и прямой связи.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title}>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: "rgba(13,115,119,0.09)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#0d7377" }} />
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
              Как BFR помогает гостям и хозяевам
            </h3>
            <div className="space-y-3.5">
              {[
                "Хозяева подтверждают объект до получения доступа к заявкам",
                "Важные условия аренды фиксируются в переписке заранее",
                "После аренды работает система отзывов и репутации",
                "Нарушители теряют доступ к заявкам и сообществу",
                "При необходимости администраторы подключаются к спорным ситуациям",
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
              <p className="text-xs mb-3" style={{ color: "#a39e98" }}>Поддержка и связь:</p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#a39e98" }}>
                Вы можете связаться с нами во внешних мессенджерах или использовать чат хозяев внутри BFR как дополнительный рабочий канал сообщества.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Чат хозяев", href: "/community" },
                  { label: "Telegram", href: "https://t.me/bfrreplit_bot" },
                  { label: "WhatsApp", href: "https://wa.me/79899865887" },
                  { label: "Макс", href: "https://max.ru/call/+79213798941" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#0d7377" }}
                    data-testid={`link-trust-${link.label.toLowerCase().replace(/\s/g, "-")}`}
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
