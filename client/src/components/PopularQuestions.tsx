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
    answer: "БФР — это технологический помощник, обеспечивающий прямой контакт между гостями и хозяевами через Сообщество владельцев квартир как альтернатива онлайн-сервисам по бронированию квартир."
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Для гостей размещение заявки в профильных группах мессенджеров бесплатно. Хозяева участвуют в Сообществе в соответствии с правилами."
  },
  {
    question: "Какие гарантии и защита в БФР?",
    answer: "БФР — это сообщество, а не платформа-гарант, поэтому ответственность лежит на её участниках: гостях и хозяевах. Условия вы обсуждаете сами. Но это не означает, что вы остались без защиты. В БФР есть чёрный список ненадёжных участников, система репутации и отзывов, поддержка администраторов в спорах. В случае возникновения конфликта мы помогаем разобраться и найти решение в рамках правил."
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
    <section id="faq" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10"
          data-testid="text-faq-title"
        >
          Популярные вопросы
        </h2>

        <div className="space-y-0">
          {faqData.map((faq, index) => (
            <button
              key={index}
              onClick={() => setSelectedFaq(index)}
              className="w-full flex items-center justify-between py-4 px-0 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left group"
              data-testid={`link-article-${index}`}
            >
              <span className="text-base text-gray-900 group-hover:text-[#0078d7] transition-colors pr-4">
                {faq.question}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0078d7] shrink-0 transition-colors" />
            </button>
          ))}
        </div>

        <Dialog open={selectedFaq !== null} onOpenChange={() => setSelectedFaq(null)}>
          <DialogContent className="max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
                {selectedFaq !== null && faqData[selectedFaq].question}
              </DialogTitle>
            </DialogHeader>
            <div className="text-gray-600 leading-relaxed mt-2">
              {selectedFaq !== null && faqData[selectedFaq].answer}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
