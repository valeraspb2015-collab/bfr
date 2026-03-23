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
    } else {
      onOwnerClick();
    }
  };

  return (
    <section
      className="relative py-24 px-4 text-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.22) 0%, transparent 60%), #0a0a0f",
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10"
            data-testid="badge-slogan"
          >
            Альтернатива сервисам бронирования
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-50 mb-5 leading-tight tracking-tight"
          data-testid="text-hero-title"
        >
          Соединяем гостей и хозяев{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
            без посредников
          </span>
        </h1>

        <p
          className="text-lg text-slate-400 mb-10 max-w-xl mx-auto"
          data-testid="text-hero-subtitle"
        >
          Общаемся через привычные мессенджеры, нейросети помогут в выборе
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <Button
                key={role.id}
                variant={isActive ? "default" : "outline"}
                onClick={() => setActiveRole(role.id)}
                className={`rounded-full px-7 gap-2 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-[0_0_24px_rgba(99,102,241,0.4)]"
                    : "border-white/10 text-slate-400 bg-transparent"
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
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-10 text-base shadow-[0_0_32px_rgba(99,102,241,0.45)]"
          data-testid="button-hero-action"
        >
          {activeRole === "guest" ? "Подобрать квартиру" : "Подать заявку хозяина"}
        </Button>
      </div>
    </section>
  );
}
