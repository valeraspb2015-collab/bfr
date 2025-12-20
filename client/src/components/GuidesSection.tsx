import { useState } from "react";
import { User, Home, FileText, CheckCircle, Shield, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import guestImage from "@assets/generated_images/guest_arriving_at_apartment.png";
import hostImage from "@assets/generated_images/host_with_apartment_keys.png";
import bookingImage from "@assets/generated_images/booking_management_calendar.png";
import tipsImage from "@assets/generated_images/tips_and_ideas_lightbulb.png";

interface GuidesSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function GuidesSection({ onGuestClick, onOwnerClick }: GuidesSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const guestSteps = [
    "Заполните заявку по кнопке «Подобрать квартиру».",
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
    "Все расчеты, условия предоплаты и возврата в случае отмены оговариваются заранее и фиксируются в переписке, если нет иной договоренности."
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

  const guides = [
    {
      id: "guest-start",
      image: guestImage,
      icon: User,
      iconColor: "#0078d7",
      title: "Первые шаги гостей в БФР",
      description: "Узнайте, как быстро найти подходящую квартиру и связаться с хозяином",
    },
    {
      id: "owner-start",
      image: hostImage,
      icon: Home,
      iconColor: "#00a67d",
      title: "Первые шаги хозяина в БФР",
      description: "Как начать принимать гостей и получать заявки через сообщество",
    },
    {
      id: "booking",
      image: bookingImage,
      icon: FileText,
      iconColor: "#6b7280",
      title: "Управление бронированием",
      description: "Информация об оплате, подтверждении и условиях аренды",
    },
    {
      id: "tips",
      image: tipsImage,
      icon: Lightbulb,
      iconColor: "#d97706",
      title: "Полезные советы гостям и хозяевам",
      description: "Рекомендации для успешного сотрудничества",
    },
  ];

  const renderContent = (id: string) => {
    switch (id) {
      case "guest-start":
        return (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <ol className="space-y-3 mb-6 list-decimal list-inside">
              {guestSteps.map((step, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
            <Button
              onClick={onGuestClick}
              className="w-full bg-[#0078d7] hover:bg-[#005fa3] text-white rounded-full py-5"
              data-testid="button-guest-action-guide"
            >
              Подобрать квартиру
            </Button>
          </div>
        );
      case "owner-start":
        return (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <ul className="space-y-3 mb-6">
              {hostSteps.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="text-[#00a67d] shrink-0">•</span>
                  {step}
                </li>
              ))}
            </ul>
            <Button
              onClick={onOwnerClick}
              className="w-full bg-[#00a67d] hover:bg-[#008c68] text-white rounded-full py-5"
              data-testid="button-host-action-guide"
            >
              Стать хозяином БФР
            </Button>
          </div>
        );
      case "booking":
        return (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <ul className="space-y-3">
              {bookingInfo.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#00a67d] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "tips":
        return (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
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
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
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
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-amber-600" />
                  Общие рекомендации
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
          data-testid="text-guides-title"
        >
          Руководство для новичков
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Начните знакомство с платформой БФР
        </p>

        <div className="space-y-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const isExpanded = expandedSection === guide.id;
            
            return (
              <Card
                key={guide.id}
                className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white"
                data-testid={`card-guide-${guide.id}`}
              >
                <button
                  onClick={() => toggleSection(guide.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                  data-testid={`button-toggle-${guide.id}`}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5" style={{ color: guide.iconColor }} />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {guide.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-6">
                    {renderContent(guide.id)}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
