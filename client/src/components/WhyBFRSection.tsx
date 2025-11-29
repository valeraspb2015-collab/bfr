import { MessageCircle, Percent, Brain, Users, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WhyBFRSection() {
  const advantages = [
    {
      id: "direct-contact",
      icon: MessageCircle,
      title: "Прямой контакт",
      description: "Гость и хозяин общаются напрямую в привычных каналах без навязанных правил посредников.",
      color: "#0078d7",
    },
    {
      id: "no-commission",
      icon: Percent,
      title: "Без лишних процентов",
      description: "Ни комиссий с каждой сделки, ни скрытых сборов — базовая экономия уже заложена в модель.",
      color: "#00a67d",
    },
    {
      id: "ai-automation",
      icon: Brain,
      title: "Умная автоматизация",
      description: "Нейросети помогают с подбором вариантов, проверкой сторон и документами, ускоряя весь процесс.",
      color: "#9b59b6",
    },
    {
      id: "community",
      icon: Users,
      title: "Сообщество",
      description: "Живые группы хозяев и операторов, взаимопомощь и репутация вместо анонимного рынка.",
      color: "#e67e22",
    },
    {
      id: "security",
      icon: Shield,
      title: "Безопасность",
      description: "Проверки, рейтинги и стандарты сообщества для защиты гостей и хозяев.",
      color: "#3498db",
    },
    {
      id: "speed",
      icon: Zap,
      title: "Быстрые выплаты",
      description: "Деньги поступают напрямую хозяину без задержек и ожидания от платформы.",
      color: "#f39c12",
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
            Почему БФР?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Вы получаете удобство онлайн-площадок без переплаты за посредников и задержек с выплатами
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow"
                data-testid={`card-advantage-${item.id}`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
