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
    "Заполните заявку по кнопке «Отправить заявку хозяевам».",
    "Получите 5 предложений подходящих квартир с описанием и условиями.",
    "Выберите варианты и сообщите администратору в канале связи.",
    "Получите прямые контакты хозяев.",
    "Перейдите к прямому диалогу с хозяином в мессенджере, задайте вопросы, уточните детали бронирования, заселения и оплаты."
  ];

  const hostSteps = [
    "Для верификации объекта подготовьте ссылку на квартиру на одном из онлайн-сервисов аренды.",
    "Нажмите «Стать хозяином БФР» или «Подать заявку хозяина» на сайте.",
    "Укажите контакты в мессенджерах, чтобы заявки от гостей приходили к вам напрямую.",
    "Подключите шаблоны ответов и автосообщений. (В разработке)",
    "Получите запросы на бронирование в рабочих чатах мессенджеров сообщества.",
    "Согласуйте условия, зафиксируйте бронь и встречайте гостей."
  ];

  const bookingInfo = [
    "Бронь подтверждается в переписке: вы фиксируете дату, цену, состав гостей и дополнительные условия.",
    "При необходимости можно оформить простой договор и обменяться документами через мессенджер.",
    "Все расчеты, условия предоплаты и возврата оговариваются заранее и фиксируются в переписке."
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
    "Не отправляйте деньги третьим лицам; все переводы делаются только по согласованным реквизитам."
  ];

  const guides = [
    {
      id: "guest-start",
      image: guestImage,
      icon: User,
      iconColor: "#c8622a",
      title: "Первые шаги гостей в БФР",
      description: "Узнайте, как быстро найти подходящую квартиру и связаться с хозяином",
    },
    {
      id: "owner-start",
      image: hostImage,
      icon: Home,
      iconColor: "#4a7c59",
      title: "Первые шаги хозяина в БФР",
      description: "Как начать принимать гостей и получать заявки через сообщество",
    },
    {
      id: "booking",
      image: bookingImage,
      icon: FileText,
      iconColor: "#6b6560",
      title: "Управление бронированием",
      description: "Информация об оплате, подтверждении и условиях аренды",
    },
    {
      id: "tips",
      image: tipsImage,
      icon: Lightbulb,
      iconColor: "#e07540",
      title: "Полезные советы гостям и хозяевам",
      description: "Рекомендации для успешного сотрудничества",
    },
  ];

  const renderContent = (id: string) => {
    switch (id) {
      case "guest-start":
        return (
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
            <ol className="space-y-3 mb-6 list-decimal list-inside">
              {guestSteps.map((step, index) => (
                <li key={index} className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{step}</li>
              ))}
            </ol>
            <Button
              onClick={onGuestClick}
              className="w-full text-white rounded-xl py-5"
              style={{ background: "#c8622a", boxShadow: "0 4px 16px rgba(200,98,42,0.2)" }}
              data-testid="button-guest-action-guide"
            >
              Отправить заявку хозяевам
            </Button>
          </div>
        );
      case "owner-start":
        return (
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
            <ul className="space-y-3 mb-6">
              {hostSteps.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#6b6560" }}>
                  <span style={{ color: "#4a7c59" }} className="shrink-0">•</span>
                  {step}
                </li>
              ))}
            </ul>
            <Button
              onClick={onOwnerClick}
              className="w-full text-white rounded-xl py-5"
              style={{ background: "#4a7c59", boxShadow: "0 4px 16px rgba(74,124,89,0.2)" }}
              data-testid="button-host-action-guide"
            >
              Стать хозяином БФР
            </Button>
          </div>
        );
      case "booking":
        return (
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
            <ul className="space-y-3">
              {bookingInfo.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm" style={{ color: "#6b6560" }}>
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#4a7c59" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "tips":
        return (
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Для гостей", icon: User, color: "#c8622a", tips: guestTips },
                { label: "Для хозяев", icon: Home, color: "#4a7c59", tips: hostTips },
                { label: "Общие рекомендации", icon: Shield, color: "#e07540", tips: safetyTips },
              ].map(({ label, icon: Icon, color, tips }) => (
                <div key={label}>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm" style={{ color: "#1c1917" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                    {label}
                  </h4>
                  <ul className="space-y-2">
                    {tips.map((tip, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: "#6b6560" }}>
                        <span style={{ color }}>•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2 text-center tracking-tight"
          style={{ color: "#1c1917" }}
          data-testid="text-guides-title"
        >
          Руководство для новичков
        </h2>
        <p className="text-center mb-12" style={{ color: "#6b6560" }}>
          Начните знакомство с платформой БФР
        </p>

        <div className="space-y-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const isExpanded = expandedSection === guide.id;
            return (
              <Card
                key={guide.id}
                className="overflow-hidden transition-colors"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.08)",
                  boxShadow: "0 2px 8px rgba(28,25,23,0.04)",
                }}
                data-testid={`card-guide-${guide.id}`}
              >
                <button
                  onClick={() => toggleSection(guide.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                  data-testid={`button-toggle-${guide.id}`}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ background: "#f3ede3" }}>
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5" style={{ color: guide.iconColor }} />
                      <h3 className="text-base font-semibold" style={{ color: "#1c1917" }}>{guide.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: "#6b6560" }}>{guide.description}</p>
                  </div>
                  <div className="shrink-0">
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5" style={{ color: "#6b6560" }} />
                      : <ChevronDown className="w-5 h-5" style={{ color: "#6b6560" }} />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-6">{renderContent(guide.id)}</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
