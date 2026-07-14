import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ArrowRight, ChevronLeft, ChevronRight,
  Home, Building2, Map,
} from "lucide-react";
import BronnikEntry from "@/components/BronnikEntry";

interface LandingHeroProps {
  onGuestClick?: () => void;
  onOwnerClick: () => void;
}

const SCENE_DURATION = 9000;

/* ── Background tints per scene ── */
const SCENE_BG = ["#faf7f2", "#f6faf6", "#f5f8fa"];
const SCENE_GLOW = [
  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(13,115,119,0.07) 0%, transparent 70%)",
  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(74,124,89,0.07) 0%, transparent 70%)",
  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(13,115,119,0.07) 0%, transparent 70%)",
];
const SCENE_COLORS = ["#0d7377", "#4a7c59", "#0d7377"];

/* ─────────────────────────────────────────
   SCENE 1 — Гостям
───────────────────────────────────────── */
function SceneGuestText() {
  return (
    <div>
      {/* Badge */}
      <div className="mb-5">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ color: "#0d7377", borderColor: "rgba(13,115,119,0.25)", background: "rgba(13,115,119,0.08)" }}
          data-testid="badge-scene-guest"
        >
          <Home className="w-3.5 h-3.5" />
          Прямая аренда без посредников
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-extrabold leading-tight tracking-tight mb-4"
        style={{ color: "#1c1917", fontSize: "clamp(2rem, 4.5vw, 3.1rem)", fontWeight: 800 }}
        data-testid="text-scene-guest-title"
      >
        Одна заявка —{" "}
        <span style={{ color: "#0d7377" }}>и хозяева сами предлагают варианты</span>
      </h1>

      {/* Sub */}
      <p
        className="text-[1.05rem] leading-relaxed mb-7"
        style={{ color: "#6b6560", maxWidth: "420px" }}
        data-testid="text-scene-guest-sub"
      >
        Напишите, что нужно. Без долгих форм и бесконечного поиска — хозяева откликнутся сами, помощник пришлёт топ‑5 вариантов в Telegram.
      </p>

      {/* Checkmarks */}
      <div className="flex flex-col gap-2.5 mb-8">
        {[
          { text: "Без сервисных сборов платформе", strong: true },
          { text: "Прямой контакт с хозяином" },
          { text: "Результат — в вашем мессенджере" },
        ].map(({ text, strong }) => (
          <div key={text} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
            <span className={strong ? "text-sm font-semibold" : "text-sm"} style={{ color: "#44403c" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div
        className="flex flex-wrap gap-4 pt-5"
        style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}
      >
        {[
          { value: "500+", label: "хозяев в базе" },
          { value: "1 заявка", label: "вместо долгого поиска" },
          { value: "0 ₽", label: "сервисных сборов" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col">
            <span className="text-base font-bold" style={{ color: "#0d7377" }}>{value}</span>
            <span className="text-xs" style={{ color: "#78736e" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 2 — Хозяевам
───────────────────────────────────────── */
function SceneOwnerText({ onOwnerClick }: { onOwnerClick: () => void }) {
  return (
    <div>
      <div className="mb-6">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ color: "#4a7c59", borderColor: "rgba(74,124,89,0.25)", background: "rgba(74,124,89,0.08)" }}
          data-testid="badge-scene-owner"
        >
          <Building2 className="w-3.5 h-3.5" />
          Для хозяев · сообщество BFR
        </span>
      </div>
      <h1
        className="font-extrabold leading-tight tracking-tight mb-5"
        style={{ color: "#1c1917", fontSize: "clamp(1.85rem, 4vw, 2.9rem)", fontWeight: 800 }}
        data-testid="text-scene-owner-title"
      >
        Прямые заявки от гостей{" "}
        <span style={{ color: "#4a7c59" }}>без посредников и комиссий платформе</span>
      </h1>
      <p
        className="text-base leading-relaxed mb-8"
        style={{ color: "#6b6560", maxWidth: "400px" }}
        data-testid="text-scene-owner-sub"
      >
        Вы сами решаете, кому отвечать. Выстраиваете отношения с гостями и развиваете своё дело внутри сообщества БФР.
      </p>
      <div className="flex flex-col gap-2.5 mb-8">
        {[
          "Прямые заявки без посредников",
          "Сами выбираете, кому отвечать",
          "Чат хозяев BFR и повторные бронирования",
        ].map((label) => (
          <div key={label} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
            <span className="text-sm" style={{ color: "#44403c" }}>{label}</span>
          </div>
        ))}
      </div>
      <Button
        onClick={onOwnerClick}
        className="rounded-xl text-white gap-2"
        style={{ background: "#4a7c59", boxShadow: "0 4px 16px rgba(74,124,89,0.22)" }}
        data-testid="button-scene-owner-cta"
      >
        Стать хозяином БФР
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 3 — Сервисы
───────────────────────────────────────── */
function SceneServicesText() {
  return (
    <div>
      <div className="mb-6">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ color: "#0d7377", borderColor: "rgba(13,115,119,0.25)", background: "rgba(13,115,119,0.08)" }}
          data-testid="badge-scene-services"
        >
          <Map className="w-3.5 h-3.5" />
          Сервисы и полезное
        </span>
      </div>
      <h1
        className="font-extrabold leading-tight tracking-tight mb-5"
        style={{ color: "#1c1917", fontSize: "clamp(1.85rem, 4vw, 2.9rem)", fontWeight: 800 }}
        data-testid="text-scene-services-title"
      >
        BFR — это не только поиск жилья.{" "}
        <span style={{ color: "#0d7377" }}>Но и полезная экосистема вокруг поездки</span>
      </h1>
      <p
        className="text-base leading-relaxed mb-8"
        style={{ color: "#6b6560", maxWidth: "400px" }}
        data-testid="text-scene-services-sub"
      >
        Рекомендации, сервисы и партнёры от тех, кто живёт в этих местах. Для гостей и хозяев.
      </p>
      <div className="flex flex-col gap-3">
        {[
          "Где поесть и куда сходить",
          "Экскурсии и маршруты",
          "Партнёры и местные сервисы",
        ].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{ background: "rgba(13,115,119,0.1)", color: "#0d7377" }}
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium" style={{ color: "#44403c" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE LABELS
───────────────────────────────────────── */
const SCENE_LABELS = ["Гостям", "Хозяевам", "Сервисы"];

/* Host-intent hashes deep-link straight into the "Хозяевам" scene */
const OWNER_HASHES = ["#audiences", "#owner", "#hosts", "#become-host", "#for-hosts"];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function LandingHero({ onOwnerClick }: LandingHeroProps) {
  const [scene, setScene] = useState(0);
  const [fading, setFading] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const fadingRef = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (next === scene || fadingRef.current) return;
      fadingRef.current = true;
      setFading(true);
      setTimeout(() => {
        setScene(next);
        fadingRef.current = false;
        setFading(false);
        setProgressKey((k) => k + 1);
      }, 280);
    },
    [scene]
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => goTo((scene + 1) % 3), SCENE_DURATION);
    return () => clearTimeout(t);
  }, [scene, paused, goTo]);

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  /* Host-intent hashes open the "Хозяевам" scene — on load and on hashchange */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncSceneFromHash = (fromEvent: boolean) => {
      if (!OWNER_HASHES.includes(window.location.hash)) return;
      setPaused(true);
      goToRef.current(1);
      if (fromEvent) {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    syncSceneFromHash(false);
    const onHashChange = () => syncSceneFromHash(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const accentColor = SCENE_COLORS[scene];
  const heroBg = SCENE_BG[scene];
  const heroGlow = SCENE_GLOW[scene];

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: heroBg,
        paddingTop: "4rem",
        paddingBottom: "4rem",
        minHeight: "calc(100vh - 84px)",
        display: "flex",
        alignItems: "center",
        transition: "background 0.6s ease",
      }}
    >
      {/* Decorative glow behind right card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: heroGlow, transition: "background 0.6s ease" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center">

          {/* LEFT: scene text */}
          <div
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.28s ease, transform 0.28s ease",
            }}
          >
            {scene === 0 && <SceneGuestText />}
            {scene === 1 && <SceneOwnerText onOwnerClick={onOwnerClick} />}
            {scene === 2 && <SceneServicesText />}
          </div>

          {/* RIGHT: Bronnik card */}
          <div className="w-full lg:w-[420px] xl:w-[440px] shrink-0">
            <BronnikEntry
              embedded
              sceneIndex={scene}
              onChatStart={() => setPaused(true)}
            />
          </div>
        </div>

        {/* ── Scene navigation ── */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {/* Prev */}
          <button
            onClick={() => { setPaused(true); goTo((scene + 2) % 3); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(28,25,23,0.06)", color: "#6b6560" }}
            aria-label="Предыдущий"
            data-testid="button-hero-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scene tabs */}
          <div className="flex items-center gap-1 bg-black/5 rounded-full p-1">
            {SCENE_LABELS.map((label, i) => {
              const isActive = scene === i;
              return (
                <button
                  key={label}
                  onClick={() => { setPaused(true); goTo(i); }}
                  data-testid={`button-hero-scene-${i}`}
                  className="relative px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: isActive ? "#fff" : "transparent",
                    color: isActive ? accentColor : "#78736e",
                    boxShadow: isActive ? "0 1px 4px rgba(28,25,23,0.12)" : "none",
                  }}
                >
                  {label}
                  {/* Progress bar */}
                  {isActive && !paused && (
                    <span
                      key={progressKey}
                      className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(28,25,23,0.08)" }}
                    >
                      <span
                        className="block h-full rounded-full"
                        style={{
                          background: accentColor,
                          animationName: "heroProgress",
                          animationDuration: `${SCENE_DURATION}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                          width: "0%",
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={() => { setPaused(true); goTo((scene + 1) % 3); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(28,25,23,0.06)", color: "#6b6560" }}
            aria-label="Следующий"
            data-testid="button-hero-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
