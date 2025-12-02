import { Card } from "@/components/ui/card";
import directContactImage from "@assets/generated_images/direct_contact_messaging_illustration.png";
import savingsImage from "@assets/generated_images/savings_no_hidden_fees.png";
import aiImage from "@assets/generated_images/ai_automation_neural_network.png";
import communityImage from "@assets/generated_images/community_support_group.png";
import securityImage from "@assets/generated_images/security_shield_protection.png";
import speedImage from "@assets/generated_images/fast_payment_lightning.png";

export default function WhyBFRSection() {
  const advantages = [
    {
      id: "direct-contact",
      image: directContactImage,
      title: "Прямой контакт",
      description: "Гость и хозяин общаются напрямую в привычных каналах без навязанных правил посредников.",
    },
    {
      id: "no-commission",
      image: savingsImage,
      title: "Без лишних затрат",
      description: "Нет скрытых сборов — базовая экономия уже заложена в модель.",
    },
    {
      id: "ai-automation",
      image: aiImage,
      title: "Умная автоматизация",
      description: "Нейросети помогают с подбором вариантов, проверкой сторон и документами, ускоряя весь процесс.",
    },
    {
      id: "community",
      image: communityImage,
      title: "Сообщество",
      description: "Живые группы хозяев и операторов, взаимопомощь и репутация вместо анонимного рынка.",
    },
    {
      id: "security",
      image: securityImage,
      title: "Безопасность",
      description: "Проверки, рейтинги и стандарты сообщества для защиты гостей и хозяев.",
    },
    {
      id: "speed",
      image: speedImage,
      title: "Быстрые выплаты",
      description: "Деньги поступают напрямую хозяину без задержек и ожидания от платформы.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            data-testid="text-why-bfr-title"
          >
            Сообщество
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            БФР представляет собой неформальное сообщество, ориентированное на рынок аренды жилья, основанное на группах в мессенджерах
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-lg transition-all hover:-translate-y-1"
              data-testid={`card-advantage-${item.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0078d7] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
