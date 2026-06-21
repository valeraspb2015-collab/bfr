import { Users, Banknote, Shield, HeadphonesIcon } from "lucide-react";

const facts = [
  {
    icon: Users,
    title: "Подтверждённые хозяева",
    desc: "Каждый хозяин подтверждает объект до получения доступа к заявкам",
  },
  {
    icon: Banknote,
    title: "Условия понятны до оплаты",
    desc: "Стоимость и детали фиксируются в переписке заранее",
  },
  {
    icon: Shield,
    title: "Репутация работает на всех",
    desc: "После аренды работает система отзывов — нарушители теряют доступ",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка в спорных ситуациях",
    desc: "Администраторы подключаются на основе переписки и правил сообщества",
  },
];

export default function TrustStrip() {
  return (
    <section className="py-12 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facts.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(13,115,119,0.09)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#0d7377" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "#1c1917" }}>
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
