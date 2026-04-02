import { ClipboardList, MessageSquareMore, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Оставьте одну заявку",
    description:
      "Опишите, что нужно: город, даты, бюджет, пожелания. Это занимает 1–2 минуты.",
  },
  {
    number: "02",
    icon: MessageSquareMore,
    title: "Хозяева откликаются",
    description:
      "Реальные хозяева из сообщества видят вашу заявку и присылают свои варианты напрямую.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Бронник AI отбирает лучшее",
    description:
      "Нейросеть анализирует все отклики и возвращает вам топ-5 предложений в выбранный способ связи.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: "#1c1917" }}
            data-testid="text-how-it-works-title"
          >
            Как это работает
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Три шага от заявки до прямого контакта с хозяином
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
            style={{ background: "rgba(200,98,42,0.15)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="relative mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(200,98,42,0.10)",
                        border: "1px solid rgba(200,98,42,0.20)",
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#c8622a" }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "#c8622a",
                        color: "#fff",
                        fontSize: "10px",
                        lineHeight: "1.4",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#1c1917" }}
                  >
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
