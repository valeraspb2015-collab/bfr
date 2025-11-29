import { User, Home, MessageCircle, Brain, Headphones, Percent, Bot, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ForGuestsHostsSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function ForGuestsHostsSection({ onGuestClick, onOwnerClick }: ForGuestsHostsSectionProps) {
  const guestBenefits = [
    {
      icon: MessageCircle,
      title: "Прямой контакт с хозяином",
      description: "Без лишних посредников и скрытых сервисных сборов. Все вопросы решаете напрямую."
    },
    {
      icon: Brain,
      title: "Умные подборки от нейросети",
      description: "Быстро находим подходящие варианты под ваши даты, бюджет и запросы."
    },
    {
      icon: Headphones,
      title: "Поддержка в мессенджерах",
      description: "Все вопросы по заселению, оплате и допуслугам — в одном удобном чате."
    }
  ];

  const hostBenefits = [
    {
      icon: Percent,
      title: "Нет комиссии с каждой сделки",
      description: "Больше денег остается у вас, а цены для гостей остаются конкурентными."
    },
    {
      icon: Bot,
      title: "Нейросети для автоматизации",
      description: "Помогают обрабатывать заявки, отвечать гостям и предлагать допуслуги без 24/7 онлайна."
    },
    {
      icon: Users,
      title: "Сообщество хозяев и экспертов",
      description: "Обмен опытом, поддержка и инструменты для роста дохода от аренды."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 border border-gray-100 rounded-2xl shadow-sm bg-gradient-to-br from-blue-50/50 to-white" data-testid="card-for-guests">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0078d7]/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#0078d7]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Для гостей</h3>
                <p className="text-sm text-gray-500">Больше выбора и ниже цена</p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {guestBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4" data-testid={`benefit-guest-${index}`}>
                    <div className="w-10 h-10 rounded-lg bg-[#0078d7]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0078d7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={onGuestClick}
              className="w-full bg-[#0078d7] hover:bg-[#005fa3] text-white rounded-full py-5"
              data-testid="button-guest-action"
            >
              Подобрать квартиру
            </Button>
          </Card>

          <Card className="p-8 border border-gray-100 rounded-2xl shadow-sm bg-gradient-to-br from-green-50/50 to-white" data-testid="card-for-hosts">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#00a67d]/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-[#00a67d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Для хозяев</h3>
                <p className="text-sm text-gray-500">Больше дохода и меньше рутины</p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {hostBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4" data-testid={`benefit-host-${index}`}>
                    <div className="w-10 h-10 rounded-lg bg-[#00a67d]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#00a67d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={onOwnerClick}
              className="w-full bg-[#00a67d] hover:bg-[#008c68] text-white rounded-full py-5"
              data-testid="button-host-action"
            >
              Стать хозяином БФР
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
