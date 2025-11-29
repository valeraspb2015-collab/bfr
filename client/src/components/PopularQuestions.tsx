import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Какие преимущества для гостей?",
    answer: "Персональный подбор квартиры без долгого поиска и звонков по объявлениям. Запрос обрабатывается оператором или ассистентом, гости получают актуальные предложения, которые максимально соответствуют их пожеланиям."
  },
  {
    question: "Какие преимущества для хозяев?",
    answer: "Дополнительный канал заявок и поддержка сообщества хозяев."
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Платформа не взимает комиссию на этапе подбора. Оплата сервисного сбора или процентов происходит только после получения дохода от заселения и денежного обращения происходит хозяином. Вознаграждение происходит только за результат — реальный шаг."
  },
  {
    question: "Что делать, если хозяин отменил бронь?",
    answer: "Мы рекомендуем подтверждать только актуальные предложения, чтобы минимизировать риски. В случае отмены гостю оперативно направляются новые подходящие варианты. Все финансовые вопросы решаются непосредственно между гостем и хозяином."
  },
  {
    question: "Что делать, если гость отменил бронь?",
    answer: "До оплаты никакие штрафы не взимаются. Если была предоплата, условия возврата к достижению соглашения между хозяином и гостем. Платформа передаёт информацию, но не регулирует расчёты."
  },
  {
    question: "Есть ли страховка?",
    answer: "Страховые услуги пока не предоставляются платформой. Гости и хозяева могут использовать сторонние услуги страхования и гарантий самостоятельно."
  },
  {
    question: "Кто решает спорные вопросы?",
    answer: "Все спорные моменты решаются непосредственно между гостем и хозяином. Платформа сохраняет историю коммуникаций и этапы транзакций, помогая информированию, но не отказываясь от спора. При необходимости стороны могут использовать действующее законодательство."
  },
  {
    question: "Какова позиция платформы БФР?",
    answer: "БФР — технологический помощник, объединяющий гостей и хозяев, периодически проводящий уборку и размещение жилья. Платформа не является стороной транзакции, ответственность и договорённость остаются за гостями и хозяевами. Мы заинтересованы в успешном бронировании и прозрачных отношениях между всеми участниками."
  }
];

export default function PopularQuestions() {
  return (
    <section id="faq" className="py-12 px-4 bg-[#f7f9fc]">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
          data-testid="text-faq-title"
        >
          Популярные вопросы
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Ответы на часто задаваемые вопросы о работе платформы
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-gray-100 last:border-b-0"
                data-testid={`card-faq-${index}`}
              >
                <AccordionTrigger 
                  className="px-6 py-5 text-left text-base font-medium text-gray-900 hover:text-[#0078d7] hover:no-underline hover:bg-gray-50 transition-colors [&[data-state=open]>svg]:rotate-90"
                  data-testid={`button-faq-${index}`}
                >
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0" />
                </AccordionTrigger>
                <AccordionContent 
                  className="px-6 pb-5 text-gray-600 leading-relaxed"
                  data-testid={`text-faq-answer-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
