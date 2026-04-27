import { User, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudiencesSectionProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function AudiencesSection({ onGuestClick, onOwnerClick }: AudiencesSectionProps) {
  return (
    <section id="audiences" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#1c1917" }}
            data-testid="text-audiences-title"
          >
            Для кого БФР?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="rounded-2xl p-7 flex flex-col"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.08)",
              boxShadow: "0 4px 20px rgba(28,25,23,0.06)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "rgba(13,115,119,0.10)" }}
            >
              <User className="w-5 h-5" style={{ color: "#0d7377" }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "#1c1917" }}>
              Я гость
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#6b6560" }}>
              Оставьте одну заявку — и получите предложения от реальных хозяев напрямую.
              Никаких лишних сервисов и сборов. Бронник AI отберёт лучшие варианты за вас.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Одна заявка вместо десятков поисков",
                "Прямой контакт с хозяином",
                "Без комиссий и переплат",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#6b6560" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#0d7377" }} />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              onClick={onGuestClick}
              className="rounded-xl text-white gap-2"
              style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.2)" }}
              data-testid="button-audience-guest"
            >
              Оставить заявку
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div
            className="rounded-2xl p-7 flex flex-col"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.08)",
              boxShadow: "0 4px 20px rgba(28,25,23,0.06)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "rgba(74,124,89,0.10)" }}
            >
              <Home className="w-5 h-5" style={{ color: "#4a7c59" }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "#1c1917" }}>
              Я хозяин
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#6b6560" }}>
              Получайте прямые заявки от гостей без сервисных сборов платформе. Вы сами решаете, кому отвечать, выстраиваете отношения с гостями и развиваете свою работу внутри сообщества БФР.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Прямые заявки от гостей без посредников",
                "Сами выбираете, кому отвечать",
                "Чат хозяев внутри BFR и возможность строить повторные отношения с гостями",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#6b6560" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#4a7c59" }} />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              onClick={onOwnerClick}
              className="rounded-xl text-white gap-2"
              style={{ background: "#4a7c59", boxShadow: "0 4px 16px rgba(74,124,89,0.2)" }}
              data-testid="button-audience-owner"
            >
              Стать хозяином БФР
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
