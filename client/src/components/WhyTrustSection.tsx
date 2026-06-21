import {
  MessageCircle,
  Wallet,
  Sparkles,
  Users,
  Banknote,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

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

const trustPoints = [
  {
    icon: Users,
    title: "Подтверждённые хозяева",
    description:
      "Каждый хозяин подтверждает объект через профиль на крупном сервисе аренды. Это помогает отсеивать случайные аккаунты и сохранять доверие внутри БФР.",
  },
  {
    icon: Banknote,
    title: "Условия понятны до оплаты",
    description:
      "Стоимость, правила заселения и важные детали фиксируются в переписке заранее. Гость и хозяин заранее понимают, о чём договорились.",
  },
  {
    icon: Shield,
    title: "Репутация работает на всех",
    description:
      "После аренды участники оставляют отзывы. Репутация видна внутри сообщества, а нарушители теряют доступ к заявкам.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка в спорных ситуациях",
    description:
      "Если возникает спор, администраторы подключаются и помогают разобраться в ситуации на основе переписки и правил сообщества.",
  },
];

const contactLinks = [
  { label: "Чат хозяев", href: "/community" },
  { label: "Telegram", href: "https://t.me/bfrreplit_bot" },
  { label: "WhatsApp", href: "https://wa.me/79899865887" },
  { label: "Макс", href: "https://max.ru/call/+79213798941" },
];

export default function WhyTrustSection() {
  return (
    <section id="cooperation" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-5xl mx-auto">
        {/* Почему БФР */}
        <div className="mb-10">
          <h2
            className="font-bold tracking-tight mb-2"
            style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800 }}
            data-testid="text-why-bfr-title"
          >
            Почему БФР?
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Прямой контакт, без комиссий, AI-подбор
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{ background: "#ffffff", border: "1px solid rgba(28,25,23,0.07)" }}
                data-testid={`card-advantage-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(13,115,119,0.09)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#0d7377" }} />
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

        {/* Почему нам доверяют */}
        <div className="mb-8">
          <h2
            className="font-bold tracking-tight mb-3"
            style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800 }}
            data-testid="text-trust-title"
          >
            Почему нам доверяют
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#6b6560", maxWidth: "520px" }}>
            В аренде главное — доверие. BFR помогает гостям и хозяевам чувствовать себя спокойнее за счёт понятных правил, репутации и прямой связи.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
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

        {/* Поддержка и связь */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: "#6b6560", maxWidth: "560px" }}>
            Вы можете связаться с нами во внешних мессенджерах или использовать чат хозяев внутри BFR как дополнительный рабочий канал сообщества.
          </p>
          <div className="flex flex-wrap gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm font-medium"
                style={{ color: "#0d7377" }}
                data-testid={`link-trust-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
