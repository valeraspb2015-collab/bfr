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
          <div className="flex items-center gap-5">
            <a
              href="/community"
              className="text-sm transition-colors"
              style={{ color: "#0d7377" }}
              data-testid="link-owner-chat"
            >
              Чат хозяев
            </a>
            <span className="font-bold text-sm" style={{ color: "#0d7377" }}>БФР</span>
          </div>
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
            BFR для хозяев: прямые заявки, больше контроля и рост без лишних посредников
          </h1>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "#6b6560", maxWidth: "560px", margin: "0 auto 1.5rem" }}
            data-testid="text-owner-hero-subtitle"
          >
            Подключайтесь к BFR, чтобы получать прямые заявки, выстраивать повторные отношения с гостями, работать внутри сообщества и использовать дополнительные инструменты для развития.
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
            Прямые заявки · чат хозяев · поддержка · сервисы для роста
          </p>
        </div>
      </section>

      {/* 2. BFR — НЕ ПРОСТО ЕЩЁ ОДНА ПЛОЩАДКА */}
      <section className="py-14 px-4" style={{ background: "#faf7f2" }} data-testid="section-owner-not-platform">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-4"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-not-platform-title"
          >
            BFR — не просто ещё одна площадка
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "#6b6560" }}
            data-testid="text-owner-not-platform-text"
          >
            Мы не строим модель, где хозяин теряет контакт с гостем и полностью зависит от чужой воронки. BFR помогает получать прямые заявки, укреплять репутацию, выстраивать повторные отношения и работать внутри профессионального сообщества.
          </p>
          <div className="space-y-3">
            {[
              "Прямой контакт вместо обезличенного потока",
              "Сообщество хозяев вместо одиночной работы",
              "Основа для подписки и сервисов, которые реально помогают в работе",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#0d7377" }} />
                <p className="text-base leading-relaxed" style={{ color: "#1c1917" }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ЧТО ПОЛУЧАЕТ ХОЗЯИН */}
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
                text: "Гости приходят с готовым запросом, а вы сами решаете, откликаться ли на него и как вести дальнейшее общение.",
              },
              {
                icon: SlidersHorizontal,
                title: "Больше контроля",
                text: "Вы не теряете контакт с гостем и сами определяете условия общения, договорённостей и повторного взаимодействия.",
              },
              {
                icon: RefreshCw,
                title: "Повторные гости и репутация",
                text: "Работа через BFR помогает не только закрывать отдельные даты, но и постепенно нарабатывать доверие, репутацию и свою базу гостей.",
              },
              {
                icon: MessageSquare,
                title: "Чат хозяев внутри BFR",
                text: "Внутренний чат помогает оставаться на связи, обмениваться опытом и иметь дополнительный рабочий канал внутри сообщества.",
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

      {/* 4. ПОЧЕМУ ЭТО МОЖЕТ ОКУПАТЬСЯ */}
      <section className="py-14 px-4" style={{ background: "#faf7f2" }} data-testid="section-owner-why">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-why-title"
          >
            Почему участие в BFR может окупаться
          </h2>
          <div className="space-y-4">
            {[
              "Вы работаете на прямые отношения с гостями, а не только на одну бронь",
              "Подписка может быть понятнее и прозрачнее, чем зависимость от чужих правил и комиссионных сценариев",
              "Дополнительные сервисы BFR могут помогать в реальной работе хозяина, а не просто давать размещение",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#0d7377" }} />
                <p className="text-base leading-relaxed" style={{ color: "#1c1917" }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ДЛЯ КОГО BFR И ЧТО МЫ РАЗВИВАЕМ */}
      <section className="py-14 px-4" style={{ background: "#f3ede3" }} data-testid="section-owner-combined">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold tracking-tight mb-4"
            style={{ color: "#1c1917" }}
            data-testid="text-owner-combined-title"
          >
            Для кого BFR и что мы развиваем
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#6b6560" }}>
            BFR подходит хозяевам квартир посуточно, тем, кто хочет меньше зависеть от площадок, и тем, кто хочет развивать собственную базу гостей. Внутри BFR мы развиваем:
          </p>
          <div className="space-y-3">
            {[
              "Поток прямых заявок от гостей",
              "Сообщество и чат хозяев внутри сайта",
              "Инструменты для работы с гостями и репутацией",
              "Дополнительные сервисы и поддержку",
              "Личную репутацию и повторные заезды",
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

      {/* 6. ФИНАЛЬНЫЙ CTA */}
      <section className="py-16 px-4" style={{ background: "#0d7377" }} data-testid="section-owner-cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
            style={{ color: "#ffffff" }}
            data-testid="text-owner-cta-title"
          >
            Хотите попробовать BFR как хозяин?
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.8)" }}
            data-testid="text-owner-cta-subtitle"
          >
            Оставьте заявку — мы свяжемся с вами и покажем, как BFR работает именно для вашего объекта.
          </p>
          <Button
            onClick={handleApply}
            variant="outline"
            className="rounded-xl gap-2 bg-white/10 border-white/30 text-white"
            data-testid="button-owner-cta-apply"
          >
            Подать заявку хозяина
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            После одобрения вы получите доступ к чату хозяев внутри BFR.
          </p>
        </div>
      </section>

    </div>
  );
}
