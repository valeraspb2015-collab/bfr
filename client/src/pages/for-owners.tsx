import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Inbox, SlidersHorizontal, RefreshCw, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ForOwners() {
  const [, setLocation] = useLocation();

  const handleApply = () => setLocation("/owner-application");
  const handleBack = () => setLocation("/");

  return (
    <div className="min-h-screen" style={{ background: "#faf7f2" }}>

      {/* Minimal top bar */}
      <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(28,25,23,0.07)", background: "#faf7f2" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#6b6560" }}
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </button>
          <span className="font-bold text-sm" style={{ color: "#0d7377" }}>БФР</span>
        </div>
      </div>

      {/* 1. HERO */}
      <section className="py-16 px-4" style={{ background: "#faf7f2" }} data-testid="section-owner-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="font-bold tracking-tight mb-4"
            style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15 }}
            data-testid="text-owner-hero-title"
          >
            Получайте прямые заявки и развивайте свою работу внутри BFR
          </h1>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "#6b6560", maxWidth: "560px", margin: "0 auto 1.5rem" }}
            data-testid="text-owner-hero-subtitle"
          >
            BFR помогает хозяевам получать прямых гостей, выстраивать повторные отношения, работать внутри сообщества и использовать дополнительные инструменты для роста.
          </p>
          <Button
            onClick={handleApply}
            className="rounded-xl text-white gap-2 mb-5"
            style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.2)" }}
            data-testid="button-owner-hero-apply"
          >
            Подать заявку хозяина
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-xs" style={{ color: "#a39e98" }}>
            Прямые заявки · чат хозяев · поддержка · дополнительные сервисы
          </p>
        </div>
      </section>

      {/* 2. ЧТО ПОЛУЧАЕТ ХОЗЯИН */}
      <section className="py-14 px-4" style={{ background: "#f3ede3" }} data-testid="section-owner-benefits">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight text-center mb-10"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-benefits-title"
          >
            Что получает хозяин
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Inbox,
                title: "Прямые заявки от гостей",
                text: "Гости оставляют заявку, а вы сами решаете, подходит ли она вам. Без лишних посредников между вами и гостем.",
              },
              {
                icon: SlidersHorizontal,
                title: "Больше контроля",
                text: "Вы сами выбираете, кому отвечать, на каких условиях работать и как выстраивать общение с гостем.",
              },
              {
                icon: RefreshCw,
                title: "Повторные гости и репутация",
                text: "BFR помогает не только получить первую заявку, но и выстраивать прямые отношения с гостями на будущее.",
              },
              {
                icon: MessageSquare,
                title: "Чат хозяев внутри BFR",
                text: "Внутри сайта есть чат хозяев — дополнительный рабочий канал связи, обмена опытом и координации внутри сообщества.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl p-6"
                  style={{ background: "#ffffff", border: "1px solid rgba(28,25,23,0.08)" }}
                  data-testid={`card-owner-benefit-${card.title.toLowerCase().replace(/\s/g, "-").slice(0, 15)}`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(13,115,119,0.09)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#0d7377" }} />
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "#1c1917" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ПОЧЕМУ ЭТО ВЫГОДНО */}
      <section className="py-14 px-4" style={{ background: "#faf7f2" }} data-testid="section-owner-why">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-why-title"
          >
            Почему участие в BFR может быть выгоднее
          </h2>
          <div className="space-y-4">
            {[
              "Вы работаете не только на одну сделку, а на прямые отношения с гостями",
              "Подписка может быть понятнее и прозрачнее, чем зависимость от внешних правил и чужой воронки",
              "Вокруг BFR можно получать не только заявки, но и полезные сервисы для вашей работы",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#0d7377" }} />
                <p className="text-base leading-relaxed" style={{ color: "#1c1917" }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ЧТО BFR РАЗВИВАЕТ ДЛЯ ХОЗЯЕВ */}
      <section className="py-14 px-4" style={{ background: "#f3ede3" }} data-testid="section-owner-develops">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-develops-title"
          >
            Что BFR развивает для хозяев
          </h2>
          <div className="space-y-3">
            {[
              "Поток прямых заявок",
              "Внутреннее сообщество и чат хозяев",
              "Инструменты для работы с гостями",
              "Дополнительные сервисы и поддержка",
              "Развитие личной репутации и повторных заездов",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                  style={{ background: "#0d7377" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. КОМУ ПОДОЙДЁТ BFR */}
      <section className="py-14 px-4" style={{ background: "#faf7f2" }} data-testid="section-owner-audience">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-audience-title"
          >
            Кому особенно подойдёт участие в BFR
          </h2>
          <div className="space-y-3">
            {[
              "Хозяевам квартир и апартаментов посуточно",
              "Тем, кто хочет меньше зависеть от площадок",
              "Тем, кто хочет развивать собственную базу гостей",
              "Администраторам и мини-сетям объектов",
              "Тем, кому важна внутренняя профессиональная среда",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                  style={{ background: "#4a7c59" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ФИНАЛЬНЫЙ CTA */}
      <section className="py-16 px-4" style={{ background: "#0d7377" }} data-testid="section-owner-cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
            style={{ color: "#ffffff" }}
            data-testid="text-owner-cta-title"
          >
            Хотите стать хозяином BFR?
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.8)" }}
            data-testid="text-owner-cta-subtitle"
          >
            Оставьте заявку и расскажите о своём объекте. Мы свяжемся с вами и покажем, как участие в BFR может работать именно для вас.
          </p>
          <Button
            onClick={handleApply}
            variant="outline"
            className="rounded-xl gap-2 bg-white/10 border-white/30 text-white"
            data-testid="button-owner-cta-apply"
          >
            Стать хозяином БФР
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

    </div>
  );
}
