import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BronnikEntry from "@/components/BronnikEntry";

interface LandingHeroProps {
  onGuestClick?: () => void;
  onOwnerClick: () => void;
}

const SCENE_DURATION = 7000;

/* ─────────────────────────────────────────
   SCENE 1 TEXT — Гостям (left column only)
───────────────────────────────────────── */
function SceneGuestText() {
  return (
    <div>
      <div className="mb-5">
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-medium border"
          style={{ color: "#0d7377", borderColor: "rgba(13,115,119,0.25)", background: "rgba(13,115,119,0.07)" }}
          data-testid="badge-scene-guest"
        >
          Аренда напрямую от хозяев · без сервисных сборов платформе
        </span>
      </div>
      <h1
        className="font-extrabold leading-tight tracking-tight mb-4"
        style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)", fontWeight: 800 }}
        data-testid="text-scene-guest-title"
      >
        Одна заявка — и хозяева сами предложат варианты{" "}
        <span style={{ color: "#0d7377" }}>напрямую, без лишнего поиска и переплат</span>
      </h1>
      <p
        className="text-base leading-relaxed mb-7"
        style={{ color: "#6b6560", maxWidth: "420px" }}
        data-testid="text-scene-guest-sub"
      >
        Опишите, что нужно. Хозяева откликнутся сами, а помощник пришлёт топ‑5 подходящих вариантов в ваш мессенджер.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {[
          "Без сервисных сборов платформе",
          "Прямой контакт с хозяином",
          "Топ-5 вариантов — в мессенджер",
        ].map((label) => (
          <div key={label} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
            <span className="text-sm" style={{ color: "#6b6560" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 2 TEXT — Хозяевам (left column only)
───────────────────────────────────────── */
function SceneOwnerText({ onOwnerClick }: { onOwnerClick: () => void }) {
  return (
    <div>
      <div className="mb-5">
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-medium border"
          style={{ color: "#4a7c59", borderColor: "rgba(74,124,89,0.25)", background: "rgba(74,124,89,0.07)" }}
          data-testid="badge-scene-owner"
        >
          Для хозяев · сообщество BFR
        </span>
      </div>
      <h1
        className="font-extrabold leading-tight tracking-tight mb-4"
        style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)", fontWeight: 800 }}
        data-testid="text-scene-owner-title"
      >
        Прямые заявки от гостей{" "}
        <span style={{ color: "#4a7c59" }}>без посредников и сервисных сборов платформе</span>
      </h1>
      <p
        className="text-base leading-relaxed mb-7"
        style={{ color: "#6b6560", maxWidth: "420px" }}
        data-testid="text-scene-owner-sub"
      >
        Вы сами решаете, кому отвечать, выстраиваете отношения с гостями и развиваете свою работу внутри сообщества БФР.
      </p>
      <div className="flex flex-col gap-2 mb-7">
        {[
          "Прямые заявки от гостей без посредников",
          "Сами выбираете, кому отвечать",
          "Чат хозяев внутри BFR и повторные отношения с гостями",
        ].map((label) => (
          <div key={label} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
            <span className="text-sm" style={{ color: "#6b6560" }}>{label}</span>
          </div>
        ))}
      </div>
      <Button
        size="lg"
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
   SCENE 3 TEXT — Сервисы (left column only)
───────────────────────────────────────── */
function SceneServicesText() {
  return (
    <div>
      <div className="mb-5">
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-medium border"
          style={{ color: "#0d7377", borderColor: "rgba(13,115,119,0.25)", background: "rgba(13,115,119,0.07)" }}
          data-testid="badge-scene-services"
        >
          Сервисы и полезное
        </span>
      </div>
      <h1
        className="font-extrabold leading-tight tracking-tight mb-4"
        style={{ color: "#1c1917", fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)", fontWeight: 800 }}
        data-testid="text-scene-services-title"
      >
        BFR — это не только поиск жилья{" "}
        <span style={{ color: "#0d7377" }}>но и полезная экосистема вокруг поездки</span>
      </h1>
      <p
        className="text-base leading-relaxed mb-7"
        style={{ color: "#6b6560", maxWidth: "420px" }}
        data-testid="text-scene-services-sub"
      >
        Полезная информация о месте — для гостей и хозяев. Рекомендации, сервисы и партнёры от тех, кто живёт в этих местах.
      </p>
      <div className="flex flex-col gap-2.5">
        {[
          "Где поесть и куда сходить",
          "Экскурсии и маршруты",
          "Партнёры и местные сервисы",
        ].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: "rgba(13,115,119,0.09)", color: "#0d7377" }}
            >
              {i + 1}
            </span>
            <span className="text-sm" style={{ color: "#44403c" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE LABELS for navigation
───────────────────────────────────────── */
const SCENE_LABELS = ["Гостям", "Хозяевам", "Сервисы"];
const SCENE_COLORS = ["#0d7377", "#4a7c59", "#0d7377"];

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
      }, 260);
    },
    [scene]
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => goTo((scene + 1) % 3), SCENE_DURATION);
    return () => clearTimeout(t);
  }, [scene, paused, goTo]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audiences") {
      setScene(1);
    }
  }, []);

  const accentColor = SCENE_COLORS[scene];

  return (
    <section
      id="audiences"
      className="relative overflow-hidden"
      style={{ background: "#faf7f2", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      onMouseEnter={() => !paused && setPaused(true) /* pause only for scene nav */}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* ── Two-column grid: left = scene text, right = Bronnik input ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center">

          {/* LEFT: scene-specific text — fades on scene change */}
          <div
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="w-full">
              {scene === 0 && <SceneGuestText />}
              {scene === 1 && <SceneOwnerText onOwnerClick={onOwnerClick} />}
              {scene === 2 && <SceneServicesText />}
            </div>
          </div>

          {/* RIGHT: Bronnik input — stays stable, examples change via sceneIndex */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md">
              <BronnikEntry
                embedded
                sceneIndex={scene}
                onChatStart={() => setPaused(true)}
              />
            </div>
          </div>
        </div>

        {/* ── Scene navigation ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Prev */}
          <button
            onClick={() => { setPaused(true); goTo((scene + 2) % 3); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(28,25,23,0.06)", color: "#6b6560" }}
            aria-label="Предыдущий слайд"
            data-testid="button-hero-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scene tabs */}
          <div className="flex items-center gap-1">
            {SCENE_LABELS.map((label, i) => {
              const isActive = scene === i;
              return (
                <button
                  key={label}
                  onClick={() => { setPaused(true); goTo(i); }}
                  data-testid={`button-hero-scene-${i}`}
                  className="relative px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: isActive ? "rgba(28,25,23,0.07)" : "transparent",
                    color: isActive ? accentColor : "#a39e98",
                  }}
                >
                  {label}
                  {/* Progress bar */}
                  {isActive && !paused && (
                    <span
                      key={progressKey}
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full overflow-hidden"
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
                          animationPlayState: "running",
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
            aria-label="Следующий слайд"
            data-testid="button-hero-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
