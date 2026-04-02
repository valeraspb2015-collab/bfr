import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Что такое БФР?",
    answer:
      "БФР — это сообщество хозяев квартир, где гость оставляет одну заявку, а хозяева сами предлагают варианты. Бронник AI отбирает лучшие предложения и возвращает вам топ-5. Никаких посредников и сервисных сборов.",
  },
  {
    question: "Сколько стоят услуги?",
    answer:
      "Для гостей размещение заявки бесплатно. Вы платите напрямую хозяину на согласованных условиях — без комиссий платформе.",
  },
  {
    question: "Как работает подбор вариантов?",
    answer:
      "После получения вашей заявки хозяева из сообщества присылают предложения. Бронник AI анализирует все отклики и выбирает 5 наиболее подходящих под ваш запрос. Вы получаете их в выбранный способ связи — Telegram, WhatsApp или Макс.",
  },
  {
    question: "Какие есть меры безопасности?",
    answer:
      "В БФР есть система верификации объектов, репутация и отзывы, чёрный список ненадёжных участников. Все условия фиксируются в переписке до оплаты. Администраторы помогают в спорных ситуациях.",
  },
  {
    question: "Что получает хозяин?",
    answer:
      "Хозяин получает заявки от гостей прямо в мессенджер, сам выбирает кому отвечать, общается без посредников и не платит комиссий платформе. Также хозяин становится частью профессионального сообщества.",
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
            Всё, что нужно знать перед началом
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
                <div className="px-6 pb-5">
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
