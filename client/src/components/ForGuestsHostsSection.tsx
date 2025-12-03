import { User, Home, FileText, CheckCircle, Shield, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ForGuestsHostsSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function ForGuestsHostsSection({ onGuestClick, onOwnerClick }: ForGuestsHostsSectionProps) {
  const guestSteps = [
    "Напишите в чат поддержки Telegram, WhatsApp или Макс, либо заполните форму «Подобрать квартиру» на сайте. ИИ агент и админы подберут варианты от хозяев сообщества под ваш запрос.",
    "Получите 5 предложений подходящих квартир с описанием и условиями.",
    "Выберите варианты и сообщите администратору в канале связи.",
    "Получите прямые контакты хозяев.",
    "Перейдите к прямому диалогу с хозяином в мессенджере, задайте вопросы, уточните детали бронирования, заселения и оплаты. Если всё устроило, забронируйте и сообщите админу для постановки на контроль. Если не удалось договориться, попросите прислать следующие 5 вариантов."
  ];

  const hostSteps = [
    "Для верификации объекта подготовьте ссылку на квартиру на одном из онлайн-сервисов аренды и способ подтверждения права на её управление (например, менеджер каналов или площадка, где можно связать квартиру и контакт).",
    "Нажмите «Стать хозяином БФР» или «Подать заявку хозяина» на сайте.",
    "Укажите контакты в мессенджерах, чтобы заявки от гостей приходили к вам напрямую.",
    "Подключите шаблоны ответов и автосообщений, чтобы не быть постоянно онлайн. (В разработке)",
    "Получите запросы на бронирование в рабочих чатах мессенджеров сообщества.",
    "Согласуйте условия, зафиксируйте бронь и встречайте гостей, сохраняя переписку для подтверждения в случае конфликтной ситуации."
  ];

  const bookingInfo = [
    "Бронь подтверждается в переписке: вы фиксируете дату, цену, состав гостей и дополнительные условия.",
    "При необходимости можно оформить простой договор и обменяться документами через мессенджер, что по умолчанию принимается сторонами в качестве подтверждения бронирования.",
    "Деньги переводятся гостем напрямую хозяину — без задержек на сторонней платформе.",
    "Условия предоплаты и возврата оговариваются заранее и фиксируются в переписке."
  ];

  const guestTips = [
    "Всегда уточняйте реальные фото, электронный адрес и условия заселения до оплаты.",
    "Не стесняйтесь задавать вопросы: про Wi-Fi, парковку, детей, животных и депозиты."
  ];

  const hostTips = [
    "Делайте честные фото и подробное описание, чтобы избежать недопонимания при заезде.",
    "Зафиксируйте основные условия (курение, вечеринка, залог) до подтверждения брони."
  ];

  const safetyTips = [
    "Проверяйте анкету, отзывы и рекомендации внутри сообщества.",
    "Не отправляйте деньги третьим лицам; все переводы делаются только по согласованным реквизитам хозяина или гостя."
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

            <ol className="space-y-3 mb-8 list-decimal list-inside">
              {guestSteps.map((step, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed" data-testid={`step-guest-${index}`}>
                  {step}
                </li>
              ))}
            </ol>

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

            <ul className="space-y-3 mb-8">
              {hostSteps.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm text-gray-600 leading-relaxed" data-testid={`step-host-${index}`}>
                  <span className="text-[#00a67d] shrink-0">•</span>
                  {step}
                </li>
              ))}
            </ul>

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
            <h3 className="text-xl font-bold text-gray-900">Полезные советы гостям и хозяевам</h3>
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
                Общие рекомендации по безопасности
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
