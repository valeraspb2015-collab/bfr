import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  User,
  Home,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Utensils,
  MapPin,
  Camera,
  Map,
  Star,
  Handshake,
} from "lucide-react";

interface LandingHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

const SCENE_DURATION = 7000;

/* ─────────────────────────────────────────
   SCENE 1 RIGHT — Guest flow diagram
───────────────────────────────────────── */
function GuestFlowDiagram() {
  return (
    <div className="w-full max-w-sm">
      {/* Guest → Request */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="flex-1 rounded-xl p-3 flex items-center gap-2.5"
          style={{ background: "#fff", border: "1px solid rgba(28,25,23,0.09)", boxShadow: "0 2px 8px rgba(28,25,23,0.05)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(13,115,119,0.10)" }}
          >
            <User className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "#1c1917" }}>Гость</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <div className="w-5 h-px" style={{ background: "rgba(13,115,119,0.3)" }} />
          <ArrowRight className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
        </div>
        <div
          className="flex-1 rounded-xl p-3 flex items-center gap-2.5"
          style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.20)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(13,115,119,0.15)" }}
          >
            <ClipboardList className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "#0d7377" }}>Заявка BFR</span>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-2">
        <div className="w-px h-4" style={{ background: "rgba(13,115,119,0.20)" }} />
      </div>

      {/* Owners */}
      <div
        className="rounded-xl p-3 mb-2"
        style={{ background: "#fff", border: "1px solid rgba(28,25,23,0.08)" }}
      >
        <p className="text-[10px] font-semibold mb-2.5 uppercase tracking-wide" style={{ color: "#a39e98" }}>
          Хозяева откликаются
        </p>
        <div className="flex gap-1.5">
          {[
            { l: "А", n: "Алексей" },
            { l: "Т", n: "Татьяна" },
            { l: "М", n: "Михаил" },
            { l: "+", n: "ещё" },
          ].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: i < 3 ? "rgba(13,115,119,0.10)" : "rgba(28,25,23,0.05)",
                  color: i < 3 ? "#0d7377" : "#a39e98",
                }}
              >
                {h.l}
              </div>
              <span className="text-[9px]" style={{ color: "#a39e98" }}>{h.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-2">
        <div className="w-px h-4" style={{ background: "rgba(13,115,119,0.20)" }} />
      </div>

      {/* Bronnik AI */}
      <div
        className="rounded-xl p-3.5 flex items-center gap-3 mb-2"
        style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.18)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(13,115,119,0.15)" }}
        >
          <Sparkles className="w-4 h-4" style={{ color: "#0d7377" }} />
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: "#0d7377" }}>Бронник AI</p>
          <p className="text-[10px]" style={{ color: "#6b6560" }}>отбирает топ-5 подходящих вариантов</p>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-2">
        <div className="w-px h-4" style={{ background: "rgba(13,115,119,0.20)" }} />
      </div>

      {/* Messengers */}
      <div className="flex gap-2">
        {[
          { label: "Telegram", color: "#0088cc", bg: "rgba(0,136,204,0.08)", brd: "rgba(0,136,204,0.22)" },
          { label: "WhatsApp", color: "#25d366", bg: "rgba(37,211,102,0.08)", brd: "rgba(37,211,102,0.22)" },
          { label: "Макс", color: "#4a7c59", bg: "rgba(74,124,89,0.08)", brd: "rgba(74,124,89,0.22)" },
        ].map((m) => (
          <div
            key={m.label}
            className="flex-1 rounded-xl py-2.5 text-center text-xs font-semibold"
            style={{ background: m.bg, border: `1px solid ${m.brd}`, color: m.color }}
          >
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 2 RIGHT — Owner ecosystem
───────────────────────────────────────── */
function OwnerEcosystem() {
  const nodes = [
    { icon: ClipboardList, label: "Новые заявки", sub: "прямые, без посредников", color: "#0d7377", bg: "rgba(13,115,119,0.07)", brd: "rgba(13,115,119,0.14)" },
    { icon: MessageCircle, label: "Чат хозяев", sub: "внутри BFR", color: "#0d7377", bg: "rgba(13,115,119,0.07)", brd: "rgba(13,115,119,0.14)" },
    { icon: User, label: "Прямой контакт", sub: "с гостями", color: "#4a7c59", bg: "rgba(74,124,89,0.07)", brd: "rgba(74,124,89,0.14)" },
    { icon: Sparkles, label: "Сервисы BFR", sub: "дополнительные", color: "#4a7c59", bg: "rgba(74,124,89,0.07)", brd: "rgba(74,124,89,0.14)" },
  ];

  return (
    <div className="w-full max-w-sm">
      {/* Central hub */}
      <div className="flex justify-center mb-4">
        <div
          className="rounded-2xl px-8 py-4 flex flex-col items-center gap-2"
          style={{
            background: "#fff",
            border: "1px solid rgba(74,124,89,0.20)",
            boxShadow: "0 6px 24px rgba(74,124,89,0.10)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(74,124,89,0.10)" }}
          >
            <Home className="w-5 h-5" style={{ color: "#4a7c59" }} />
          </div>
          <p className="text-sm font-bold" style={{ color: "#1c1917" }}>Хозяин</p>
          <p className="text-[10px]" style={{ color: "#6b6560" }}>участник BFR</p>
        </div>
      </div>

      {/* Spoke nodes */}
      <div className="grid grid-cols-2 gap-2.5">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              className="rounded-xl p-3 flex items-start gap-2"
              style={{ background: node.bg, border: `1px solid ${node.brd}` }}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: node.color }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: "#1c1917" }}>{node.label}</p>
                <p className="text-[10px]" style={{ color: "#6b6560" }}>{node.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 3 RIGHT — Services ecosystem grid
───────────────────────────────────────── */
const serviceCategories = [
  { icon: Utensils, label: "Где поесть", color: "#c07035", bg: "rgba(192,112,53,0.08)" },
  { icon: MapPin, label: "Куда сходить", color: "#0d7377", bg: "rgba(13,115,119,0.08)" },
  { icon: Camera, label: "Экскурсии", color: "#6b52a0", bg: "rgba(107,82,160,0.08)" },
  { icon: Map, label: "Маршруты", color: "#4a7c59", bg: "rgba(74,124,89,0.08)" },
  { icon: Star, label: "Советы", color: "#b8882a", bg: "rgba(184,136,42,0.08)" },
  { icon: Handshake, label: "Партнёры", color: "#0d7377", bg: "rgba(13,115,119,0.08)" },
];

function ServicesGrid() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="rounded-xl px-3 py-2 mb-3 flex items-center gap-2"
        style={{ background: "rgba(13,115,119,0.06)", border: "1px solid rgba(13,115,119,0.12)" }}
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: "#0d7377" }} />
        <p className="text-xs" style={{ color: "#0d7377" }}>
          Полезная экосистема вокруг поездки и проживания
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {serviceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.label}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center"
              style={{
                background: "#fff",
                border: "1px solid rgba(28,25,23,0.07)",
                boxShadow: "0 1px 6px rgba(28,25,23,0.04)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: cat.bg }}
              >
                <Icon className="w-4 h-4" style={{ color: cat.color }} />
              </div>
              <span className="text-[10px] font-medium leading-tight" style={{ color: "#1c1917" }}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 1 — ГОСТЯМ
───────────────────────────────────────── */
function SceneGuest({ onGuestClick }: { onGuestClick: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
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
          Опишите, что нужно. Хозяева откликнутся сами, а Бронник AI пришлёт топ-5 подходящих вариантов в ваш мессенджер.
        </p>
        <div className="flex flex-wrap gap-3 mb-7">
          <Button
            size="lg"
            onClick={onGuestClick}
            className="rounded-xl text-white gap-2"
            style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.22)" }}
            data-testid="button-scene-guest-cta"
          >
            Оставить заявку
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-xl"
            style={{ borderColor: "rgba(28,25,23,0.14)", color: "#1c1917" }}
            data-testid="button-scene-guest-how"
          >
            <a href="#how-it-works">Как это работает</a>
          </Button>
        </div>
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
      <div className="flex justify-center lg:justify-end">
        <GuestFlowDiagram />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 2 — ХОЗЯЕВАМ
───────────────────────────────────────── */
function SceneOwner({ onOwnerClick }: { onOwnerClick: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
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
        <div className="flex flex-wrap gap-3 mb-7">
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
        <div className="flex flex-col gap-2">
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
      </div>
      <div className="flex justify-center lg:justify-end">
        <OwnerEcosystem />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCENE 3 — СЕРВИСЫ И ПОЛЕЗНОЕ
───────────────────────────────────────── */
function SceneServices() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
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
        <div className="flex flex-col gap-2.5 mb-7">
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
        <Button
          size="lg"
          asChild
          className="rounded-xl text-white gap-2"
          style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.22)" }}
          data-testid="button-scene-services-cta"
        >
          <a href="https://t.me/bfrreplit_bot" target="_blank" rel="noopener noreferrer">
            Написать нам
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
      <div className="flex justify-center lg:justify-end">
        <ServicesGrid />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const SCENE_LABELS = ["Гостям", "Хозяевам", "Сервисы"];
const SCENE_COLORS = ["#0d7377", "#4a7c59", "#0d7377"];

export default function LandingHero({ onGuestClick, onOwnerClick }: LandingHeroProps) {
  const [scene, setScene] = useState(0);
  const [fading, setFading] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (next === scene || fading) return;
      setFading(true);
      setTimeout(() => {
        setScene(next);
        setFading(false);
        setProgressKey((k) => k + 1);
      }, 260);
    },
    [scene, fading]
  );

  /* auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => goTo((scene + 1) % 3), SCENE_DURATION);
    return () => clearTimeout(t);
  }, [scene, paused, goTo]);

  /* hash → owner tab */
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audiences") {
      setScene(1);
    }
  }, []);

  return (
    <section
      id="audiences"
      className="relative overflow-hidden"
      style={{ background: "#faf7f2", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* ── Scene content ── */}
        <div
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.26s ease, transform 0.26s ease",
            minHeight: "440px",
          }}
        >
          {scene === 0 && <SceneGuest onGuestClick={onGuestClick} />}
          {scene === 1 && <SceneOwner onOwnerClick={onOwnerClick} />}
          {scene === 2 && <SceneServices />}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goTo((scene + 2) % 3)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(28,25,23,0.06)", color: "#6b6560" }}
            data-testid="button-hero-prev"
            aria-label="Предыдущий кадр"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {SCENE_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => goTo(i)}
                className="flex items-center gap-2"
                style={{ opacity: i === scene ? 1 : 0.4 }}
                data-testid={`dot-hero-${i}`}
                aria-label={label}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: i === scene ? "28px" : "8px",
                    height: "8px",
                    background: i === scene ? SCENE_COLORS[i] : "rgba(28,25,23,0.25)",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
                <span
                  className="hidden sm:inline text-xs font-medium"
                  style={{ color: i === scene ? SCENE_COLORS[i] : "#6b6560" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo((scene + 1) % 3)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(28,25,23,0.06)", color: "#6b6560" }}
            data-testid="button-hero-next"
            aria-label="Следующий кадр"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Progress bar ── */}
        <div
          className="mt-4 mx-auto max-w-xs rounded-full overflow-hidden"
          style={{ height: "2px", background: "rgba(28,25,23,0.08)" }}
        >
          <div
            key={`${progressKey}-${scene}`}
            className="h-full rounded-full"
            style={{
              background: SCENE_COLORS[scene],
              animationPlayState: paused ? "paused" : "running",
              animation: `bfrHeroProgress ${SCENE_DURATION}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bfrHeroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
