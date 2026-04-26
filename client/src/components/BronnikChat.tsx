import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, ChevronRight, Clock } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

const CHANNELS = [
  {
    id: "telegram",
    icon: SiTelegram,
    label: "Telegram",
    sublabel: "Быстрый ответ",
    href: "https://t.me/bfrreplit_bot",
    color: "#0088cc",
    bg: "rgba(0,136,204,0.08)",
    border: "rgba(0,136,204,0.18)",
  },
  {
    id: "whatsapp",
    icon: SiWhatsapp,
    label: "WhatsApp",
    sublabel: "Голос + текст",
    href: "https://wa.me/79899865887",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.18)",
  },
  {
    id: "max",
    icon: MessageCircle,
    label: "Макс",
    sublabel: "VK-мессенджер",
    href: "https://max.ru/u/f9LHodD0cOJGqIR7nRudfc6Wx4fiZADACwanqE4IJkMfLa6mgbmdQ0Ei69A",
    color: "#7B68EE",
    bg: "rgba(123,104,238,0.08)",
    border: "rgba(123,104,238,0.18)",
  },
];

export default function BronnikChat() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Hide on /community — has its own panel
  if (location === "/community") return null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* ── Messenger shortcut row (always visible) ── */}
      <div className="flex gap-2">
        {CHANNELS.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              title={ch.label}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
              style={{ background: ch.color }}
              data-testid={`button-${ch.id}`}
            >
              <Icon className="w-5 h-5 text-white" />
            </a>
          );
        })}
      </div>

      {/* ── Support panel (slide up when open) ── */}
      {isOpen && (
        <div
          className="w-80 rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(13,115,119,0.15)",
            boxShadow: "0 16px 48px rgba(28,25,23,0.18)",
          }}
          data-testid="panel-support"
        >
          {/* Header */}
          <div
            className="px-4 py-4 relative"
            style={{ background: "#0d7377" }}
          >
            {/* Online dot */}
            <span
              className="absolute top-3 right-10 w-2.5 h-2.5 rounded-full bg-green-400 border-2"
              style={{ borderColor: "#0d7377" }}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-white/60 hover:text-white transition-colors"
              data-testid="button-support-close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={bronnikAvatar}
                  alt="Куратор"
                  className="w-11 h-11 rounded-full object-cover"
                  style={{ border: "2px solid rgba(255,255,255,0.35)" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm leading-none">Кураторы БФР</p>
                <p className="text-white/70 text-xs mt-1">Сейчас онлайн</p>
              </div>
            </div>

            <p className="text-white/85 text-sm mt-3 leading-relaxed">
              Привет! Выберите удобный способ связи — куратор ответит в ближайшее время.
            </p>
          </div>

          {/* Channels */}
          <div className="p-3 space-y-2">
            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.id}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
                  style={{
                    background: ch.bg,
                    border: `1px solid ${ch.border}`,
                  }}
                  data-testid={`link-support-${ch.id}`}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: ch.color }}
                  >
                    <Icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-none" style={{ color: "#1c1917" }}>
                      {ch.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b6560" }}>{ch.sublabel}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "#a39e98" }} />
                </a>
              );
            })}
          </div>

          {/* Footer note */}
          <div
            className="px-4 py-2.5 flex items-center gap-1.5"
            style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "#a39e98" }} />
            <p className="text-xs" style={{ color: "#a39e98" }}>
              Обычно отвечаем в течение нескольких минут
            </p>
          </div>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(13,115,119,0.22)",
          boxShadow: "0 4px 20px rgba(13,115,119,0.14), 0 2px 6px rgba(28,25,23,0.06)",
        }}
        data-testid="button-support-open"
      >
        <div className="relative">
          <img
            src={bronnikAvatar}
            alt="Куратор"
            className="w-10 h-10 rounded-full object-cover"
            style={{ border: "2px solid rgba(13,115,119,0.35)" }}
          />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400"
            style={{ border: "2px solid #ffffff" }}
          />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold leading-none" style={{ color: "#1c1917" }}>
            Нужна помощь?
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#0d7377" }}>
            Кураторы онлайн
          </p>
        </div>
      </button>
    </div>
  );
}
