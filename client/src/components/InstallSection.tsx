import { Smartphone, Share2, MoreVertical, Plus, Download, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const androidSteps = [
  {
    icon: Smartphone,
    text: "Откройте bfr.su в браузере Chrome",
  },
  {
    icon: MoreVertical,
    text: 'Нажмите ⋮ (три точки) в правом верхнем углу',
  },
  {
    icon: Plus,
    text: '«Добавить на главный экран» или «Установить приложение»',
  },
  {
    icon: Download,
    text: 'Нажмите «Установить» — готово',
  },
];

const iosSteps = [
  {
    icon: Smartphone,
    text: "Откройте bfr.su в браузере Safari",
  },
  {
    icon: Share2,
    text: "Нажмите кнопку «Поделиться» (квадрат со стрелкой вверх) внизу экрана",
  },
  {
    icon: Plus,
    text: 'Прокрутите и выберите «На экран "Домой"»',
  },
  {
    icon: CheckCircle2,
    text: 'Нажмите «Добавить» — готово',
  },
];

export default function InstallSection() {
  return (
    <section
      id="install"
      className="py-16 px-4"
      style={{ background: "#faf7f2" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "rgba(13,115,119,0.1)" }}
          >
            <Smartphone className="w-7 h-7" style={{ color: "#0d7377" }} />
          </div>
          <h2
            className="text-2xl font-bold tracking-tight mb-2"
            style={{ color: "#1c1917" }}
            data-testid="text-install-title"
          >
            Установите БФР на телефон
          </h2>
          <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Работает как приложение&nbsp;— иконка на главном экране,
            быстрый запуск, никаких App&nbsp;Store и Google&nbsp;Play
          </p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          {/* Android */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.07)",
              boxShadow: "0 2px 12px rgba(28,25,23,0.05)",
            }}
            data-testid="card-install-android"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(52,168,83,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#34a853">
                  <path d="M17.523 15.341 14.63 10.5l2.868-4.838A1 1 0 0 0 16.63 4.5H7.37a1 1 0 0 0-.868 1.162L9.37 10.5l-2.893 4.841A1 1 0 0 0 7.37 16.5h9.26a1 1 0 0 0 .893-1.159zM5 3a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1zm0 18a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "#1c1917" }}>Android</h3>
                <p className="text-xs" style={{ color: "#6b6560" }}>Chrome · Samsung Internet</p>
              </div>
            </div>
            <ol className="space-y-3">
              {androidSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{ background: "rgba(52,168,83,0.12)", color: "#34a853" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-snug" style={{ color: "#44403c" }}>
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* iOS */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.07)",
              boxShadow: "0 2px 12px rgba(28,25,23,0.05)",
            }}
            data-testid="card-install-ios"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,122,255,0.10)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#007aff">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "#1c1917" }}>iPhone / iPad</h3>
                <p className="text-xs" style={{ color: "#6b6560" }}>Safari · только этот браузер</p>
              </div>
            </div>
            <ol className="space-y-3">
              {iosSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{ background: "rgba(0,122,255,0.10)", color: "#007aff" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-snug" style={{ color: "#44403c" }}>
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.12)" }}
          data-testid="banner-pwa-note"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" style={{ color: "#0d7377" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#44403c" }}>
            <strong style={{ color: "#0d7377" }}>Что такое PWA?</strong>{" "}
            Прогрессивное веб-приложение — сайт с иконкой на главном экране. Работает как приложение:
            быстро открывается, запоминает вход, не занимает много места.{" "}
            <Link href="/install" className="font-medium underline underline-offset-2" style={{ color: "#0d7377" }} data-testid="link-install-detail">
              Подробная инструкция
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
