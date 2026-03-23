import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const faqData = [
  {
    question: "Что такое БФР?",
    answer: "Это он-лайн представительство Сообщества владельцев квартир, через которое заявки на аренду напрямую попадают хозяевам жилья. Вы пользуетесь привычными мессенджерами для общения, а рутинную работу берут на себя ИИ-ассистенты и админы платформы."
  },
  {
    question: "Что даёт БФР гостям?",
    answer: "• Экономию в стоимости аренды за счёт прямых контактов с хозяевами без посредников\n• Безопасность за счёт контактов с проверенными хозяевами\n• Дополнительные услуги (экскурсии, билеты, питание и др.) со скидкой от партнёров БФР\n• Помощь и сопровождение\n• Новые знакомства и впечатления"
  },
  {
    question: "Что даёт БФР хозяевам?",
    answer: "• Дополнительный канал заявок\n• Профессиональные контакты и обмен опытом\n• Помощь со стороны коллег и Сообщества\n• Новые знакомства и общение"
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Для гостей размещение заявки в профильных группах мессенджеров бесплатно. Хозяева участвуют в Сообществе в соответствии с правилами."
  },
  {
    question: "Какие гарантии и защита в БФР?",
    answer: "БФР — это сообщество, а не платформа-гарант, поэтому ответственность лежит на её участниках: гостях и хозяевах. Условия вы обсуждаете сами. Но это не означает, что вы остались без защиты. В БФР есть чёрный список ненадёжных участников, система репутации и отзывов, поддержка администраторов в спорах."
  },
  {
    question: "Что делать, если гость отменил бронь?",
    answer: "До оплаты никакие штрафы не взимаются. Если была предоплата, условия возврата определяются соглашением между хозяином и гостем. Платформа передаёт информацию, но не регулирует расчёты."
  },
  {
    question: "Есть ли страховка?",
    answer: "Страховые услуги пока не предоставляются платформой. Гости и хозяева могут использовать сторонние услуги страхования и гарантий самостоятельно."
  },
  {
    question: "Кто решает спорные вопросы?",
    answer: "Все спорные моменты решаются непосредственно между гостем и хозяином. Платформа сохраняет историю коммуникаций, помогая информированию. При необходимости стороны могут использовать действующее законодательство."
  }
];

export default function PopularQuestions() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 px-4 bg-[#1a1a24]">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-slate-50 mb-12 tracking-tight"
          data-testid="text-faq-title"
        >
          Популярные вопросы
        </h2>

        <div className="space-y-0">
          {faqData.map((faq, index) => (
            <button
              key={index}
              onClick={() => setSelectedFaq(index)}
              className="w-full flex items-center justify-between py-4 px-0 border-b border-white/[0.07] hover:bg-white/[0.02] transition-colors text-left group"
              data-testid={`link-article-${index}`}
            >
              <span className="text-base text-slate-300 group-hover:text-indigo-300 transition-colors pr-4">
                {faq.question}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 shrink-0 transition-colors" />
            </button>
          ))}
        </div>

        <Dialog open={selectedFaq !== null} onOpenChange={() => setSelectedFaq(null)}>
          <DialogContent className="max-w-lg rounded-xl bg-[#13131a] border border-white/[0.08]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-100 pr-8">
                {selectedFaq !== null && faqData[selectedFaq].question}
              </DialogTitle>
            </DialogHeader>
            <div className="text-slate-400 leading-relaxed mt-2 whitespace-pre-line">
              {selectedFaq !== null && faqData[selectedFaq].answer}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
