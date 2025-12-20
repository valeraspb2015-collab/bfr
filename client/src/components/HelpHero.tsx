import { useState } from "react";
import { User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

type RoleType = "guest" | "owner";

export default function HelpHero({ onGuestClick, onOwnerClick }: HelpHeroProps) {
  const [activeRole, setActiveRole] = useState<RoleType>("guest");

  const roles = [
    { id: "guest" as RoleType, label: "Гость", icon: User },
    { id: "owner" as RoleType, label: "Хозяин жилья", icon: Home },
  ];

  const handleRoleAction = () => {
    if (activeRole === "guest") {
      onGuestClick();
    } else if (activeRole === "owner") {
      onOwnerClick();
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#f7f9fc] to-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <span 
            className="inline-block px-4 py-2 bg-[#0078d7]/10 text-[#0078d7] text-sm font-medium rounded-full"
            data-testid="badge-slogan"
          >
            Альтернатива комиссионным площадкам
          </span>
        </div>

        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          data-testid="text-hero-title"
        >
          БФР — соединяем гостей и хозяев без посредников
        </h1>
        <p 
          className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto"
          data-testid="text-hero-subtitle"
        >
          Соединяем гостей и хозяев напрямую через мессенджеры, а нейросети берут на себя рутину — поиск, проверку и оформление
        </p>
        <p 
          className="text-base text-gray-500 mb-10"
          data-testid="text-hero-description"
        >
          Удобство онлайн-площадок без переплаты за посредников
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Button
                key={role.id}
                variant={activeRole === role.id ? "default" : "outline"}
                onClick={() => setActiveRole(role.id)}
                className={`rounded-full px-6 py-5 gap-2 transition-all ${
                  activeRole === role.id 
                    ? "bg-[#0078d7] hover:bg-[#005fa3] text-white shadow-md" 
                    : "border-gray-300 text-gray-700 hover:border-[#0078d7] hover:text-[#0078d7]"
                }`}
                data-testid={`button-role-${role.id}`}
              >
                <Icon className="w-4 h-4" />
                {role.label}
              </Button>
            );
          })}
        </div>

        <Button
          size="lg"
          onClick={handleRoleAction}
          className="bg-[#0078d7] hover:bg-[#005fa3] text-white rounded-full px-10 py-6 text-base shadow-lg"
          data-testid="button-hero-action"
        >
          {activeRole === "guest" ? "Подобрать квартиру" : "Подать заявку хозяина"}
        </Button>
      </div>
    </section>
  );
}
