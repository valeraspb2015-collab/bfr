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
    question: "Чем БФР отличается от Airbnb и Booking?",
    answer: "БФР — это сообщество хозяев квартир, где гости и хозяева общаются напрямую через мессенджеры. Мы не берём 12-20% комиссии с каждой сделки, как крупные площадки. Вы договариваетесь напрямую, платите только за жильё без скрытых сервисных сборов, а нейросети автоматизируют рутину — поиск, проверку и оформление."
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Платформа не взимает комиссию на этапе подбора. Оплата сервисного сбора происходит только после получения дохода от заселения. Вознаграждение только за результат — реальное бронирование."
  },
  {
    question: "Что делать, если хозяин отменил бронь?",
    answer: "Мы рекомендуем подтверждать только актуальные предложения, чтобы минимизировать риски. В случае отмены гостю оперативно направляются новые подходящие варианты. Все финансовые вопросы решаются непосредственно между гостем и хозяином."
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
  },
  {
    question: "Какова позиция платформы БФР?",
    answer: "БФР — технологический помощник, объединяющий гостей и хозяев. Платформа не является стороной сделки, ответственность и договорённости остаются за участниками. Мы заинтересованы в успешном бронировании и прозрачных отношениях."
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
          Популярные статьи
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
