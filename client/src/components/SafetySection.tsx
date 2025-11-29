import { Shield, Users, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SafetySection() {
  const safetyItems = [
    {
      id: "rules",
      icon: Users,
      title: "Правила сообщества",
      description: "Основные принципы взаимодействия между гостями и хозяевами в БФР",
      color: "#0078d7",
    },
    {
      id: "safety",
      icon: Shield,
      title: "Безопасность гостей и хозяев",
      description: "Рекомендации по безопасному бронированию и сдаче жилья",
      color: "#00a67d",
    },
    {
      id: "complaint",
      icon: AlertTriangle,
      title: "Как подать жалобу",
      description: "Порядок обращения при возникновении спорных ситуаций",
      color: "#e74c3c",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
          data-testid="text-safety-title"
        >
          Правила и безопасность
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Важная информация для всех участников платформы
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="group p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
                data-testid={`card-safety-${item.id}`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0078d7] transition-colors">
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
