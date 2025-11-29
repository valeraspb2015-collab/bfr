import { BookOpen, CreditCard, UserCheck, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GuidesSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function GuidesSection({ onGuestClick, onOwnerClick }: GuidesSectionProps) {
  const guides = [
    {
      id: "guest-start",
      icon: UserCheck,
      title: "Первые шаги гостя в БФР",
      description: "Узнайте, как быстро найти подходящую квартиру и связаться с хозяином",
      color: "#0078d7",
      onClick: onGuestClick,
    },
    {
      id: "owner-start",
      icon: BookOpen,
      title: "Первые шаги хозяина в БФР",
      description: "Как начать принимать гостей и получать заявки через сообщество",
      color: "#00a67d",
      onClick: onOwnerClick,
    },
    {
      id: "booking",
      icon: CreditCard,
      title: "Управление бронированием",
      description: "Информация об оплате, подтверждении и условиях аренды",
      color: "#9b59b6",
      onClick: undefined,
    },
    {
      id: "tips",
      icon: Lightbulb,
      title: "Полезные советы",
      description: "Рекомендации для успешного сотрудничества гостей и хозяев",
      color: "#f39c12",
      onClick: undefined,
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
          data-testid="text-guides-title"
        >
          Руководства для новичков
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Начните знакомство с платформой БФР
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card
                key={guide.id}
                className={`group p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white ${guide.onClick ? 'hover:-translate-y-1' : ''}`}
                onClick={guide.onClick}
                data-testid={`card-guide-${guide.id}`}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${guide.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: guide.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0078d7] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {guide.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
