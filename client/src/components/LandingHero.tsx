import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Send,
  User,
  Home,
  Smartphone,
  Users,
  HelpCircle,
  Handshake,
} from "lucide-react";
import { Link } from "wouter";

interface LandingHeroProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

type HeroTab = "guest" | "owner" | "info";

const guestTrustMarkers = [
  "Без сервисных сборов платформе",
  "Прямой контакт с хозяином",
  "Топ-5 вариантов — в мессенджер",
];

const ownerPoints = [
  "Прямые заявки от гостей без посредников",
  "Сами выбираете, кому отвечать",
  "Чат хозяев внутри BFR и возможность строить повторные отношения с гостями",
];

const infoCards = [
  {
    icon: Smartphone,
    title: "Установить приложение",
    description:
      "Работает как приложение — иконка на главном экране, быстрый запуск, никаких App Store и Google Play",
    href: "/install",
    internal: true,
  },
  {
    icon: Users,
    title: "Чат хозяев",
    description: "Чат хозяев — это внутренний канал связи внутри сайта BFR.",
    href: "/community",
    internal: true,
  },
  {
    icon: HelpCircle,
    title: "Частые вопросы",
    description: "Ответы на главные вопросы гостей и хозяев",
    href: "#faq",
    internal: false,
  },
  {
    icon: Handshake,
    title: "Сотрудничество",
    description:
      "Приглашаем администраторов сообществ, предпринимателей и единомышленников",
    href: "https://t.me/bfrreplit_bot",
    internal: false,
  },
];

const messengerLinks = [
  { label: "Telegram", href: "https://t.me/bfrreplit_bot" },
  { label: "WhatsApp", href: "https://wa.me/79899865887" },
  { label: "Макс", href: "https://max.ru/call/+79213798941" },
];

export default function LandingHero({ onGuestClick, onOwnerClick }: LandingHeroProps) {
  const [tab, setTab] = useState<HeroTab>("guest");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audiences") {
      setTab("owner");
    }
  }, []);

  const tabs: { key: HeroTab; label: string }[] = [
    { key: "guest", label: "Для гостей" },
    { key: "owner", label: "Для хозяев" },
    { key: "info", label: "Полезная информация" },
  ];

  return (
    <section
      id="audiences"
      className="relative px-4 overflow-hidden"
      style={{ background: "#faf7f2", paddingTop: "2.5rem", paddingBottom: "3.5rem" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Segmented tab switcher */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-xl"
            style={{ background: "#f3ede3", border: "1px solid rgba(28,25,23,0.07)" }}
            data-testid="tabs-hero"
          >
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: active ? "#ffffff" : "transparent",
                    color: active ? "#0d7377" : "#6b6560",
                    boxShadow: active ? "0 1px 4px rgba(28,25,23,0.08)" : "none",
                  }}
                  data-testid={`tab-hero-${t.key}`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GUEST */}
        {tab === "guest" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-5">
                <span
                  className="inline-block px-3.5 py-1 rounded-full text-xs font-medium border"
                  style={{
                    color: "#0d7377",
                    borderColor: "rgba(13,115,119,0.25)",
                    background: "rgba(13,115,119,0.07)",
                  }}
                  data-testid="badge-slogan"
                >
                  Аренда напрямую от хозяев · без сервисных сборов платформе
                </span>
              </div>

              <h1
                className="font-extrabold leading-tight tracking-tight mb-5"
                style={{ color: "#1c1917", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}
                data-testid="text-hero-title"
              >
                Одна заявка — и хозяева сами предложат варианты{" "}
                <span style={{ color: "#0d7377" }}>
                  Напрямую, без лишнего поиска и переплат
                </span>
              </h1>

              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#6b6560", maxWidth: "430px" }}
                data-testid="text-hero-subtitle"
              >
                Опишите, что нужно. Хозяева откликнутся сами, а Бронник AI пришлёт топ-5 подходящих вариантов в ваш мессенджер.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  size="lg"
                  onClick={onGuestClick}
                  className="rounded-xl text-white gap-2"
                  style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.20)" }}
                  data-testid="button-hero-action"
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
                  data-testid="button-hero-how"
                >
                  <a href="#how-it-works">Как это работает</a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-5">
                {guestTrustMarkers.map((label) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4a7c59" }} />
                    <span className="text-sm" style={{ color: "#6b6560" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product mockup */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="rounded-2xl p-5 w-full max-w-sm"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.08)",
                  boxShadow: "0 8px 48px rgba(28,25,23,0.09)",
                }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(13,115,119,0.09)", color: "#0d7377" }}
                    >
                      01 Ваша заявка
                    </span>
                  </div>
                  <div
                    className="rounded-xl p-3.5"
                    style={{ background: "#faf7f2", border: "1px solid rgba(28,25,23,0.07)" }}
                  >
                    <p className="text-sm font-medium mb-1" style={{ color: "#1c1917" }}>
                      Мария · Сочи
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                      2-комн. · 12–19 июля · 4 000–5 500 ₽/ночь
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <MessageCircle className="w-3.5 h-3.5" style={{ color: "#4a7c59" }} />
                    <span className="text-xs font-semibold" style={{ color: "#4a7c59" }}>
                      02 Отклики от хозяев
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Хозяин Алексей", note: "2-комн., центр, 4 800 ₽" },
                      { name: "Хозяин Татьяна", note: "Студия с видом, 4 200 ₽" },
                      { name: "Хозяин Андрей", note: "2-комн., у моря, 5 100 ₽" },
                    ].map((r) => (
                      <div
                        key={r.name}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                        style={{ background: "#f3ede3", border: "1px solid rgba(28,25,23,0.06)" }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                          style={{ background: "rgba(13,115,119,0.12)", color: "#0d7377" }}
                        >
                          {r.name[7]}
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: "#1c1917" }}>{r.name}</p>
                          <p className="text-xs" style={{ color: "#6b6560" }}>{r.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    className="rounded-xl p-3"
                    style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.15)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
                      <span className="text-xs font-semibold" style={{ color: "#0d7377" }}>
                        03 Бронник AI выбирает топ-5
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                      Анализирует все отклики и отбирает наиболее подходящие под ваш запрос
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-xl p-3 flex items-center gap-2.5"
                  style={{ background: "rgba(74,124,89,0.08)", border: "1px solid rgba(74,124,89,0.16)" }}
                >
                  <Send className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a7c59" }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#4a7c59" }}>
                      04 Отправлено вам
                    </p>
                    <p className="text-xs" style={{ color: "#6b6560" }}>
                      Топ-5 вариантов — в Telegram, WhatsApp или Макс
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OWNER */}
        {tab === "owner" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(74,124,89,0.10)" }}
              >
                <Home className="w-5 h-5" style={{ color: "#4a7c59" }} />
              </div>
              <h1
                className="font-extrabold leading-tight tracking-tight mb-5"
                style={{ color: "#1c1917", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}
                data-testid="text-hero-owner-title"
              >
                Я хозяин
              </h1>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#6b6560", maxWidth: "460px" }}
                data-testid="text-hero-owner-subtitle"
              >
                Получайте прямые заявки от гостей без сервисных сборов платформе. Вы сами решаете, кому отвечать, выстраиваете отношения с гостями и развиваете свою работу внутри сообщества БФР.
              </p>
              <Button
                size="lg"
                onClick={onOwnerClick}
                className="rounded-xl text-white gap-2"
                style={{ background: "#4a7c59", boxShadow: "0 4px 16px rgba(74,124,89,0.2)" }}
                data-testid="button-hero-owner-action"
              >
                Стать хозяином БФР
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div
              className="rounded-2xl p-7"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(28,25,23,0.08)",
                boxShadow: "0 8px 48px rgba(28,25,23,0.09)",
              }}
            >
              <ul className="space-y-4">
                {ownerPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#44403c" }}>
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#4a7c59" }} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* INFO */}
        {tab === "info" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {infoCards.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(13,115,119,0.09)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#0d7377" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-1" style={{ color: "#1c1917" }}>
                        {card.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "#6b6560" }}>
                        {card.description}
                      </p>
                    </div>
                  </>
                );
                const cls =
                  "text-left rounded-2xl p-5 flex items-start gap-4 hover-elevate";
                const style = {
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.07)",
                  boxShadow: "0 2px 10px rgba(28,25,23,0.05)",
                };
                return card.internal ? (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={cls}
                    style={style}
                    data-testid={`card-info-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cls}
                    style={style}
                    data-testid={`card-info-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            <div
              className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ background: "rgba(13,115,119,0.07)", border: "1px solid rgba(13,115,119,0.12)" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#44403c" }}>
                Топ-5 вариантов — в мессенджер
              </p>
              <div className="flex flex-wrap gap-4">
                {messengerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                    style={{ color: "#0d7377" }}
                    data-testid={`link-info-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
