import { useState } from "react";
import { Search, User, Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HelpHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

type RoleType = "guest" | "owner" | "admin";

export default function HelpHero({ onGuestClick, onOwnerClick }: HelpHeroProps) {
  const [activeRole, setActiveRole] = useState<RoleType>("guest");
  const [searchQuery, setSearchQuery] = useState("");

  const roles = [
    { id: "guest" as RoleType, label: "Гость", icon: User },
    { id: "owner" as RoleType, label: "Хозяин жилья", icon: Home },
    { id: "admin" as RoleType, label: "Администратор", icon: Settings },
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
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          data-testid="text-hero-title"
        >
          Чем БФР может помочь?
        </h1>
        <p 
          className="text-lg text-gray-600 mb-8"
          data-testid="text-hero-subtitle"
        >
          Центр помощи для гостей и хозяев жилья
        </p>

        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск по вопросам и инструкциям"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-base rounded-full border-gray-200 shadow-sm focus:border-[#0078d7] focus:ring-[#0078d7]"
            data-testid="input-search"
          />
        </div>

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

        {activeRole !== "admin" && (
          <Button
            size="lg"
            onClick={handleRoleAction}
            className="bg-[#0078d7] hover:bg-[#005fa3] text-white rounded-full px-10 py-6 text-base shadow-lg"
            data-testid="button-hero-action"
          >
            {activeRole === "guest" ? "Подобрать квартиру" : "Подать заявку хозяина"}
          </Button>
        )}
      </div>
    </section>
  );
}
