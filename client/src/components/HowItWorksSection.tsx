import { ClipboardList, MessageSquareMore, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Одна заявка",
    description: "Опишите жильё, даты и бюджет. Займёт 2 минуты.",
  },
  {
    number: "02",
    icon: MessageSquareMore,
    title: "Хозяева откликаются",
    description: "Реальные хозяева из сообщества присылают предложения напрямую.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "AI выбирает лучшее",
    description: "Бронник AI отбирает топ-5 и отправляет вам в удобный мессенджер.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <h2
            className="font-bold tracking-tight mb-2"
            style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800 }}
            data-testid="text-how-it-works-title"
          >
            Как это работает
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Три шага до прямого контакта с хозяином
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
            style={{ background: "rgba(13,115,119,0.12)" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col">
                  <div className="relative mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(13,115,119,0.09)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#0d7377" }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 font-bold"
                      style={{ color: "#0d7377", fontSize: "11px" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1c1917" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
