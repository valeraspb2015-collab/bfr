import { Card } from "@/components/ui/card";
import guestImage from "@assets/generated_images/guest_arriving_at_apartment.png";
import hostImage from "@assets/generated_images/host_with_apartment_keys.png";
import bookingImage from "@assets/generated_images/booking_management_calendar.png";
import tipsImage from "@assets/generated_images/tips_and_ideas_lightbulb.png";

interface GuidesSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function GuidesSection({ onGuestClick, onOwnerClick }: GuidesSectionProps) {
  const guides = [
    {
      id: "guest-start",
      image: guestImage,
      title: "Первые шаги гостя в БФР",
      description: "Узнайте, как быстро найти подходящую квартиру и связаться с хозяином",
      onClick: onGuestClick,
    },
    {
      id: "owner-start",
      image: hostImage,
      title: "Первые шаги хозяина в БФР",
      description: "Как начать принимать гостей и получать заявки через сообщество",
      onClick: onOwnerClick,
    },
    {
      id: "booking",
      image: bookingImage,
      title: "Управление бронированием",
      description: "Информация об оплате, подтверждении и условиях аренды",
      onClick: undefined,
    },
    {
      id: "tips",
      image: tipsImage,
      title: "Полезные советы",
      description: "Рекомендации для успешного сотрудничества гостей и хозяев",
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
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className={`group overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white ${guide.onClick ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default'}`}
              onClick={guide.onClick}
              data-testid={`card-guide-${guide.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0078d7] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
