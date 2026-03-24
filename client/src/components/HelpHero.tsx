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
      className="relative pt-24 pb-10 px-4 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(200,98,42,0.14) 0%, transparent 60%), " +
          "radial-gradient(ellipse 45% 45% at 10% 85%, rgba(74,124,89,0.12) 0%, transparent 55%), " +
          "#faf7f2",
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              color: "#c8622a",
              borderColor: "rgba(200,98,42,0.3)",
              background: "rgba(200,98,42,0.08)",
            }}
            data-testid="badge-slogan"
          >
            Работает иначе, чем обычные сервисы
          </span>
        </div>

        <h1
          className="font-extrabold mb-5 leading-tight tracking-tight"
          style={{
            color: "#1c1917",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800,
          }}
          data-testid="text-hero-title"
        >
          Опишите, что нужно —{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c8622a 0%, #e07540 50%, #4a7c59 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            хозяева сами предложат варианты
          </span>
        </h1>

        <p
          className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "#6b6560" }}
          data-testid="text-hero-subtitle"
        >
          Заполните заявку один раз. Бронник AI разошлёт её хозяевам и вернёт вам топ-5 предложений в выбранный вами способ связи
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
                className="rounded-full px-7 gap-2"
                style={
                  isActive
                    ? {
                        background: "#c8622a",
                        color: "#fff",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(200,98,42,0.25)",
                      }
                    : {
                        color: "#6b6560",
                        borderColor: "rgba(28,25,23,0.15)",
                        background: "transparent",
                      }
                }
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
          className="rounded-xl px-10 text-base text-white"
          style={{
            background: "#c8622a",
            boxShadow: "0 4px 20px rgba(200,98,42,0.2)",
          }}
          data-testid="button-hero-action"
        >
          {activeRole === "guest" ? "Отправить заявку хозяевам" : "Подать заявку хозяина"}
        </Button>
      </div>
    </section>
  );
}
