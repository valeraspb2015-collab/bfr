import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Что такое БФР?",
    answer:
      "БФР — это сервис прямой посуточной аренды. Вы оставляете одну заявку с описанием жилья, дат и бюджета. Хозяева сами откликаются с предложениями, а Бронник AI отбирает лучшие варианты и отправляет топ-5 в ваш мессенджер.",
  },
  {
    question: "Сколько стоит использовать БФР?",
    answer:
      "Сервис для гостей полностью бесплатный. Хозяева не платят комиссию платформе за заявки — вы общаетесь и договариваетесь с гостем напрямую, а оплата проходит между вами.",
  },
  {
    question: "Чем БФР отличается от Авито или Суточно?",
    answer:
      "На агрегаторах вы ищете жильё вручную среди множества объявлений. В БФР вы описываете, что нужно, и хозяева сами присылают вам подходящие варианты. Это экономит время и убирает лишние шаги.",
  },
  {
    question: "Как работает подбор вариантов?",
    answer:
      "Гость оставляет заявку. Хозяева откликаются со своими предложениями. Бронник AI анализирует все отклики, сравнивает их с запросом и выбирает топ-5 наиболее подходящих вариантов. Результат приходит в мессенджер.",
  },
  {
    question: "Как БФР защищает гостей?",
    answer:
      "Все хозяева подтверждают свой объект через профиль на крупном сервисе аренды. Отзывы собираются после каждой аренды. Нарушители попадают в чёрный список и теряют доступ к заявкам. Администраторы подключаются в спорных ситуациях.",
  },
  {
    question: "Как БФР защищает хозяев?",
    answer:
      "Хозяин сам решает, кому отвечать и на каких условиях. Все договорённости фиксируются в переписке до оплаты. Есть система отзывов, чёрный список и поддержка администраторов в спорных ситуациях. Внутри сайта есть чат хозяев как резервный канал связи.",
  },
  {
    question: "Можно ли договориться о повторной аренде напрямую?",
    answer:
      "Да. После первой аренды вы можете сохранить контакт хозяина или гостя и договариваться напрямую. БФР не забирает ваши отношения — мы помогаем начать прямой контакт.",
  },
  {
    question: "Что такое чат хозяев?",
    answer:
      "Чат хозяев — это внутренний канал связи внутри сайта BFR. Он нужен для общения между хозяевами, обмена опытом и как резервный способ связи, если внешние мессенджеры работают нестабильно. Доступен из шапки сайта.",
  },
];

export default function PopularQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: "#1c1917" }}
            data-testid="text-faq-title"
          >
            Частые вопросы
          </h2>
          <p className="text-base" style={{ color: "#6b6560" }}>
            Ответы на главные вопросы гостей и хозяев
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(28,25,23,0.08)",
            background: "#ffffff",
          }}
        >
          {faqData.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom:
                  i < faqData.length - 1 ? "1px solid rgba(28,25,23,0.07)" : "none",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                data-testid={`button-faq-${i}`}
              >
                <span
                  className="text-sm font-medium pr-4 leading-snug transition-colors"
                  style={{ color: openIndex === i ? "#0d7377" : "#1c1917" }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className="w-4 h-4 shrink-0 transition-transform duration-200"
                  style={{
                    color: "#6b6560",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
