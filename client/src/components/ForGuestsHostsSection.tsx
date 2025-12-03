import { User, Home, Send, Search, MessageCircle, Phone, CheckCircle, Link2, FileText, Users, Shield, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ForGuestsHostsSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function ForGuestsHostsSection({ onGuestClick, onOwnerClick }: ForGuestsHostsSectionProps) {
  const guestSteps = [
    {
      icon: Send,
      title: "Оставьте запрос",
      description: "Напишите в Telegram, WhatsApp или заполните форму «Подобрать квартиру» на сайте."
    },
    {
      icon: Search,
      title: "Получите подборку",
      description: "ИИ-агент и админы подберут 5 вариантов квартир под ваш запрос с описанием и условиями."
    },
    {
      icon: Phone,
      title: "Получите контакты хозяев",
      description: "Выберите варианты, сообщите админу и получите прямые контакты хозяев."
    },
    {
      icon: MessageCircle,
      title: "Договоритесь напрямую",
      description: "Задайте вопросы, уточните детали бронирования, заселения и оплаты в мессенджере."
    },
    {
      icon: CheckCircle,
      title: "Забронируйте",
      description: "Если всё устроило — бронируйте и сообщите админу для постановки на контроль."
    }
  ];

  const hostSteps = [
    {
      icon: Link2,
      title: "Подготовьте верификацию",
      description: "Ссылка на квартиру на онлайн-сервисе и способ подтверждения права на управление."
    },
    {
      icon: FileText,
      title: "Подайте заявку",
      description: "Нажмите «Стать хозяином БФР» и укажите контакты в мессенджерах."
    },
    {
      icon: Users,
      title: "Получайте заявки",
      description: "Запросы на бронирование приходят в рабочих чатах мессенджеров сообщества."
    },
    {
      icon: MessageCircle,
      title: "Согласуйте условия",
      description: "Зафиксируйте бронь и встречайте гостей, сохраняя переписку для подтверждения."
    }
  ];

  const bookingInfo = [
    "Бронь подтверждается в переписке: дата, цена, состав гостей и условия.",
    "При необходимости оформите договор через мессенджер.",
    "Деньги переводятся гостем напрямую хозяину — без задержек.",
    "Условия предоплаты и возврата оговариваются заранее."
  ];

  const guestTips = [
    "Уточняйте реальные фото и условия заселения до оплаты.",
    "Задавайте вопросы про Wi-Fi, парковку, детей, животных и депозиты."
  ];

  const hostTips = [
    "Делайте честные фото и подробное описание.",
    "Зафиксируйте условия (курение, вечеринки, залог) до подтверждения брони."
  ];

  const safetyTips = [
    "Проверяйте анкету, отзывы и рекомендации внутри сообщества.",
    "Не отправляйте деньги третьим лицам — только по согласованным реквизитам."
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 border border-gray-100 rounded-2xl shadow-sm bg-gradient-to-br from-blue-50/50 to-white" data-testid="card-for-guests">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0078d7]/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#0078d7]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Первые шаги гостей в БФР</h3>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {guestSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-3" data-testid={`step-guest-${index}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#0078d7]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0078d7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
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
                <h3 className="text-xl font-bold text-gray-900">Первые шаги хозяина в БФР</h3>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {hostSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-3" data-testid={`step-host-${index}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#00a67d]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#00a67d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
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

        <Card className="p-8 border border-gray-100 rounded-2xl shadow-sm mb-8" data-testid="card-booking-management">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Управление бронированием</h3>
          </div>
          <ul className="space-y-3">
            {bookingInfo.map((item, index) => (
              <li key={index} className="flex gap-3 text-gray-600" data-testid={`booking-info-${index}`}>
                <CheckCircle className="w-5 h-5 text-[#00a67d] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-8 border border-gray-100 rounded-2xl shadow-sm" data-testid="card-tips">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Полезные советы</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0078d7]" />
                Для гостей
              </h4>
              <ul className="space-y-2">
                {guestTips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-[#0078d7]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#00a67d]" />
                Для хозяев
              </h4>
              <ul className="space-y-2">
                {hostTips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-[#00a67d]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                Безопасность
              </h4>
              <ul className="space-y-2">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-amber-600">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
