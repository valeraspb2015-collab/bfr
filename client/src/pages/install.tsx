import { Link } from "wouter";
import HelpHeader from "@/components/HelpHeader";
import HelpFooter from "@/components/HelpFooter";
import { useLocation } from "wouter";
import {
  Smartphone,
  Share2,
  MoreVertical,
  Plus,
  Download,
  CheckCircle2,
  ArrowLeft,
  Wifi,
  Zap,
  ShieldCheck,
  BellRing,
} from "lucide-react";

const androidSteps = [
  {
    step: "01",
    title: "Откройте браузер Chrome",
    desc: "Перейдите на сайт bfr.su. Установка работает только в Chrome (или Samsung Internet).",
    color: "#34a853",
    bg: "rgba(52,168,83,0.10)",
  },
  {
    step: "02",
    title: "Нажмите меню ⋮",
    desc: "Найдите три точки в правом верхнем углу браузера и нажмите на них.",
    color: "#34a853",
    bg: "rgba(52,168,83,0.10)",
  },
  {
    step: "03",
    title: "«Добавить на главный экран»",
    desc: 'Выберите пункт «Добавить на главный экран» или «Установить приложение» — они означают одно и то же.',
    color: "#34a853",
    bg: "rgba(52,168,83,0.10)",
  },
  {
    step: "04",
    title: "Подтвердите установку",
    desc: 'Нажмите «Установить» во всплывающем окне. Иконка БФР появится на главном экране.',
    color: "#34a853",
    bg: "rgba(52,168,83,0.10)",
  },
];

const iosSteps = [
  {
    step: "01",
    title: "Откройте Safari",
    desc: "Перейдите на bfr.su именно в Safari. В Chrome и других браузерах на iOS эта функция недоступна.",
    color: "#007aff",
    bg: "rgba(0,122,255,0.10)",
  },
  {
    step: "02",
    title: "Нажмите «Поделиться»",
    desc: "Найдите кнопку с квадратом и стрелкой вверх (↑) внизу экрана и нажмите на неё.",
    color: "#007aff",
    bg: "rgba(0,122,255,0.10)",
  },
  {
    step: "03",
    title: '«На экран "Домой"»',
    desc: 'Прокрутите список действий вниз и выберите «На экран "Домой"» (Home Screen).',
    color: "#007aff",
    bg: "rgba(0,122,255,0.10)",
  },
  {
    step: "04",
    title: "Нажмите «Добавить»",
    desc: 'Подтвердите действие, нажав «Добавить» в правом верхнем углу. Готово.',
    color: "#007aff",
    bg: "rgba(0,122,255,0.10)",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Мгновенный запуск",
    desc: "Открывается за секунду прямо с главного экрана",
  },
  {
    icon: Wifi,
    title: "Без магазинов",
    desc: "Не нужны App Store и Google Play — просто сайт",
  },
  {
    icon: ShieldCheck,
    title: "Безопасно",
    desc: "Никаких лишних разрешений и фонового трекинга",
  },
  {
    icon: BellRing,
    title: "Вход запомнится",
    desc: "Авторизация сохраняется между сессиями",
  },
];

export default function Install() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "#faf7f2" }}>
      <HelpHeader />

      {/* Hero */}
      <section
        className="py-12 px-4 text-center"
        style={{ background: "#0d7377" }}
        data-testid="section-install-hero"
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Установите БФР на телефон
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            Работает как приложение — иконка на главном экране, быстрый запуск.
            <br className="hidden sm:block" />
            Без App Store и Google Play. Бесплатно.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 px-4" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center px-2 py-4" data-testid={`item-benefit-${b.title}`}>
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: "rgba(13,115,119,0.10)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#0d7377" }} />
                </div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "#1c1917" }}>{b.title}</h3>
                <p className="text-xs leading-snug" style={{ color: "#6b6560" }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instructions */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xl font-bold mb-8 text-center tracking-tight"
            style={{ color: "#1c1917" }}
          >
            Пошаговые инструкции
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Android */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(28,25,23,0.08)", boxShadow: "0 2px 16px rgba(28,25,23,0.05)" }}
              data-testid="card-android-steps"
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ background: "rgba(52,168,83,0.08)", borderBottom: "1px solid rgba(52,168,83,0.15)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(52,168,83,0.15)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#34a853">
                    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#1c1917" }}>Android</h3>
                  <p className="text-xs" style={{ color: "#6b6560" }}>Chrome · Samsung Internet</p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5" style={{ background: "#ffffff" }}>
                {androidSteps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: "#1c1917" }}>{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* iOS */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(28,25,23,0.08)", boxShadow: "0 2px 16px rgba(28,25,23,0.05)" }}
              data-testid="card-ios-steps"
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ background: "rgba(0,122,255,0.07)", borderBottom: "1px solid rgba(0,122,255,0.12)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,122,255,0.12)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#007aff">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#1c1917" }}>iPhone / iPad</h3>
                  <p className="text-xs" style={{ color: "#6b6560" }}>Safari — только этот браузер</p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5" style={{ background: "#ffffff" }}>
                {iosSteps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: "#1c1917" }}>{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ note */}
          <div
            className="mt-6 rounded-2xl px-5 py-4"
            style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.12)" }}
            data-testid="section-install-faq"
          >
            <h4 className="text-sm font-semibold mb-2" style={{ color: "#0d7377" }}>Часто задаваемые вопросы</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium" style={{ color: "#1c1917" }}>Это бесплатно?</p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#6b6560" }}>
                  Да, полностью бесплатно. PWA — это просто ярлык на сайт с улучшенным интерфейсом.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#1c1917" }}>Нужен ли интернет?</p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#6b6560" }}>
                  Для чата и заявок — да. Базовые страницы кешируются и доступны офлайн.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#1c1917" }}>Почему на iOS только Safari?</p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#6b6560" }}>
                  Apple ограничивает добавление на главный экран только для Safari. Это политика компании, не наше ограничение.
                </p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "#0d7377" }}
              data-testid="link-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
          </div>
        </div>
      </section>

      <HelpFooter
        onGuestClick={() => setLocation("/request")}
        onOwnerClick={() => setLocation("/owner-application")}
      />
    </div>
  );
}
