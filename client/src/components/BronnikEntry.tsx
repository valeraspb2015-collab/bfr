import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Send, Loader2, Mic, MicOff, Home, Camera, Utensils,
  Building2, HeadphonesIcon, ChevronDown, MapPin, X,
} from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

/* ─── Config ──────────────────────────────────────────────── */
export const CITIES = [
  { id: "spb", label: "Санкт-Петербург" },
  { id: "kslv", label: "Кисловодск" },
];

export const TOPICS = [
  { id: "rental", label: "Посуточная аренда", Icon: Home },
  { id: "excursions", label: "Экскурсии", Icon: Camera },
  { id: "food", label: "Питание", Icon: Utensils },
  { id: "owners", label: "Хозяевам", Icon: Building2 },
  { id: "admin", label: "Связь с админом", Icon: HeadphonesIcon },
];

const MESSENGER_LINKS = [
  { id: "telegram", href: "https://t.me/bfrreplit_bot", color: "#0088cc", Icon: SiTelegram, label: "Telegram" },
  { id: "whatsapp", href: "https://wa.me/79899865887", color: "#25D366", Icon: SiWhatsapp, label: "WhatsApp" },
  { id: "max", href: "https://max.ru/u/f9LHodD0cOJGqIR7nRudfc6Wx4fiZADACwanqE4IJkMfLa6mgbmdQ0Ei69A", color: "#7B68EE", Icon: MessageSquare, label: "Макс" },
];

/* ─── Scene-specific typewriter examples ─────────────────── */
const SCENE_EXAMPLES: Record<number, string[]> = {
  0: [
    "Нужна 2-кк в Санкт-Петербурге, заезд 10 августа, выезд 14 августа. 2 взрослых, бюджет 4 000 ₽/сутки. Есть кошка.",
    "Ищу 1-кк в Кисловодске на 5 ночей с 20 июля. 2 взрослых + ребёнок 5 лет. Нужна парковка, бюджет до 3 500 ₽.",
    "Нужна студия в центре Петербурга с 1 по 3 сентября. 1 человек, бюджет до 3 000 ₽/сутки, поздний заезд около 23:00.",
    "Ищем 3-кк на Крестовском острове с 28 июня по 5 июля. 4 взрослых, дети 8 и 12 лет.",
    "Нужна квартира в Кисловодске на июль, 2 взрослых. Рядом с парком, бюджет 2 500–4 000 ₽/сутки.",
    "Ищу 2-кк в Петербурге с 15 по 20 августа. 2 взрослых + собака. Есть авто — важна парковка.",
  ],
  1: [
    "Хочу вступить в сообщество хозяев BFR",
    "Как получать прямые заявки от гостей без посредников?",
    "Сколько стоит участие и какие условия для хозяев?",
    "Как добавить своё жильё в базу BFR?",
    "Что такое чат хозяев BFR и как в него попасть?",
    "Расскажи об условиях для хозяев подробнее",
  ],
  2: [
    "Что посмотреть в Кисловодске за 3 дня?",
    "Где вкусно поесть в Кисловодске рядом с парком?",
    "Какие необычные экскурсии есть в Петербурге?",
    "Куда сходить с детьми в Санкт-Петербурге за выходные?",
    "Посоветуй маршрут на 2 дня в Кисловодске",
    "Что обязательно попробовать из еды в Петербурге?",
  ],
};

/* ─── Web Speech API types ─────────────────────────────────── */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event { error: string; }
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}
declare const SpeechRecognition: { new(): SpeechRecognitionInstance } | undefined;
declare const webkitSpeechRecognition: { new(): SpeechRecognitionInstance } | undefined;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BronnikEntryProps {
  embedded?: boolean;
  sceneIndex?: number;
  onChatStart?: () => void;
}

/* ─── Typewriter hook ──────────────────────────────────────── */
function useTypewriter(texts: string[], active: boolean): string {
  const [display, setDisplay] = useState("");
  const stateRef = useRef({ idx: 0, char: 0, deleting: false });
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!active) { setDisplay(""); return; }
    let tid: ReturnType<typeof setTimeout>;
    const s = stateRef.current;
    s.idx = 0; s.char = 0; s.deleting = false;

    const tick = () => {
      if (!activeRef.current) return;
      const text = texts[s.idx % texts.length];
      if (!s.deleting) {
        s.char++;
        setDisplay(text.slice(0, s.char));
        if (s.char >= text.length) {
          s.deleting = true;
          tid = setTimeout(tick, 2400);
        } else {
          tid = setTimeout(tick, 46);
        }
      } else {
        s.char--;
        setDisplay(text.slice(0, s.char));
        if (s.char <= 0) {
          s.deleting = false;
          s.idx++;
          tid = setTimeout(tick, 500);
        } else {
          tid = setTimeout(tick, 22);
        }
      }
    };
    tid = setTimeout(tick, 700);
    return () => clearTimeout(tid);
  }, [active, texts]);

  return display;
}

/* ─── Main component ───────────────────────────────────────── */
export default function BronnikEntry({ embedded, sceneIndex, onChatStart }: BronnikEntryProps = {}) {
  const [view, setView] = useState<"entry" | "chat">("entry");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const historyRef = useRef<Message[]>([]);

  const examples = useMemo(
    () => embedded ? (SCENE_EXAMPLES[sceneIndex ?? 0] ?? SCENE_EXAMPLES[0]) : SCENE_EXAMPLES[0],
    [embedded, sceneIndex]
  );

  const animPlaceholder = useTypewriter(examples, !isFocused && input.length === 0 && view === "entry");

  useEffect(() => { historyRef.current = messages; }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Voice ── */
  const startListening = useCallback(() => {
    const SR = (typeof SpeechRecognition !== "undefined" && SpeechRecognition)
      || (typeof webkitSpeechRecognition !== "undefined" && webkitSpeechRecognition);
    if (!SR) { alert("Ваш браузер не поддерживает голосовой ввод. Попробуйте Chrome."); return; }
    const rec = new SR();
    rec.lang = "ru-RU";
    rec.continuous = false;
    rec.interimResults = true;
    recognitionRef.current = rec;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let final = ""; let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      setInput(final || interim);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleMic = () => isListening ? stopListening() : startListening();

  /* ── Build prefix from context chips ── */
  const buildContextPrefix = () => {
    const cityLabel = selectedCity ? CITIES.find(c => c.id === selectedCity)?.label : null;
    const topicLabel = selectedTopic ? TOPICS.find(t => t.id === selectedTopic)?.label : null;
    if (!cityLabel && !topicLabel) return "";
    const parts = [];
    if (cityLabel) parts.push(`город: ${cityLabel}`);
    if (topicLabel) parts.push(`тема: ${topicLabel}`);
    return `[${parts.join(", ")}] `;
  };

  /* ── Send ── */
  const sendMessage = async (overrideText?: string) => {
    const rawText = (overrideText ?? input).trim();
    if (!rawText || isLoading) return;
    const prefix = buildContextPrefix();
    const userText = prefix ? `${prefix}${rawText}` : rawText;

    if (messages.length === 0) onChatStart?.();

    setInput("");
    const userMsg: Message = { role: "user", content: rawText };
    const newMsgs = [...historyRef.current, userMsg];
    setMessages(newMsgs);
    setView("chat");
    setIsLoading(true);

    try {
      const response = await fetch("/api/bronnik/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyRef.current.map(m => ({ role: m.role, content: m.content })),
          city: selectedCity,
          topic: selectedTopic,
        }),
      });
      if (!response.ok) throw new Error("Network error");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let assistantText = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const d = JSON.parse(line.slice(6));
            if (d.content) {
              assistantText += d.content;
              setMessages(prev => {
                const u = [...prev];
                u[u.length - 1] = { role: "assistant", content: assistantText };
                return u;
              });
            }
          } catch { /* */ }
        }
      }
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Не удалось передать сообщение. Напишите напрямую в Telegram или WhatsApp.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(prev => prev === topicId ? null : topicId);
    if (topicId === "admin") {
      sendMessage("Хочу связаться с администратором.");
    } else if (topicId === "owners") {
      sendMessage("Хочу узнать о вступлении в сообщество хозяев BFR.");
    }
  };

  const handleReset = () => {
    setView("entry");
    setMessages([]);
    setInput("");
    setSelectedCity(null);
    setSelectedTopic(null);
  };

  /* ── City chips ── */
  const CityChips = () => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs shrink-0" style={{ color: "#6b6560" }}>
        <MapPin className="w-3 h-3" /> Город:
      </span>
      {CITIES.slice(0, showAllCities ? undefined : 6).map(city => (
        <button
          key={city.id}
          onClick={() => setSelectedCity(prev => prev === city.id ? null : city.id)}
          data-testid={`chip-city-${city.id}`}
          className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
          style={{
            background: selectedCity === city.id ? "rgba(13,115,119,0.08)" : "transparent",
            borderColor: selectedCity === city.id ? "rgba(13,115,119,0.35)" : "rgba(28,25,23,0.14)",
            color: selectedCity === city.id ? "#0d7377" : "#44403c",
          }}
        >
          {city.label}
        </button>
      ))}
      {!showAllCities && CITIES.length > 6 && (
        <button
          onClick={() => setShowAllCities(true)}
          className="px-3 py-1 rounded-full text-xs border flex items-center gap-1"
          style={{ borderColor: "rgba(28,25,23,0.12)", color: "#6b6560" }}
        >
          Ещё <ChevronDown className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  /* ── Topic chips ── */
  const TopicChips = () => (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => handleTopicClick(id)}
          data-testid={`chip-topic-${id}`}
          className="px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all"
          style={{
            background: selectedTopic === id ? "rgba(13,115,119,0.08)" : "transparent",
            borderColor: selectedTopic === id ? "rgba(13,115,119,0.35)" : "rgba(28,25,23,0.14)",
            color: selectedTopic === id ? "#0d7377" : "#44403c",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );

  /* ── Input row ── */
  const InputRow = ({ compact = false }: { compact?: boolean }) => (
    <div
      className="relative rounded-2xl"
      style={{
        background: "#fff",
        border: `1.5px solid ${isFocused ? "rgba(13,115,119,0.4)" : "rgba(28,25,23,0.12)"}`,
        boxShadow: isFocused ? "0 0 0 3px rgba(13,115,119,0.08)" : "0 2px 12px rgba(28,25,23,0.06)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "Напишите запрос..." : (animPlaceholder || "Напишите, что нужно...")}
        disabled={isLoading}
        rows={compact ? 2 : 4}
        className="w-full resize-none text-sm leading-relaxed focus:outline-none"
        style={{
          padding: compact ? "12px 100px 12px 16px" : "16px 100px 52px 16px",
          background: "transparent",
          color: "#1c1917",
          fontFamily: "inherit",
        }}
        data-testid="input-bronnik-entry"
      />
      <div className="absolute right-3 flex items-center gap-1.5" style={{ bottom: compact ? "10px" : "12px" }}>
        <button
          onClick={toggleMic}
          title={isListening ? "Остановить запись" : "Голосовой ввод"}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: isListening ? "rgba(220,38,38,0.08)" : "rgba(13,115,119,0.07)",
            border: `1px solid ${isListening ? "rgba(220,38,38,0.22)" : "rgba(13,115,119,0.18)"}`,
          }}
          data-testid="button-bronnik-entry-mic"
        >
          {isListening
            ? <MicOff className="w-4 h-4" style={{ color: "#dc2626" }} />
            : <Mic className="w-4 h-4" style={{ color: "#0d7377" }} />}
        </button>
        <Button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="w-9 h-9 rounded-full text-white"
          style={{ background: "#0d7377" }}
          data-testid="button-bronnik-entry-send"
        >
          {isLoading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Send className="w-4 h-4" />}
        </Button>
      </div>
      {input.length > 0 && !compact && (
        <p className="absolute left-4 bottom-3 text-[10px]" style={{ color: "#a39e98" }}>
          Shift+Enter для переноса строки · Enter для отправки
        </p>
      )}
    </div>
  );

  /* ── Messenger links row ── */
  const MessengerRow = ({ testPrefix }: { testPrefix: string }) => (
    <div className="flex items-center justify-center gap-5 pt-4" style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}>
      <span className="text-xs" style={{ color: "#a39e98" }}>Или напрямую:</span>
      {MESSENGER_LINKS.map(({ id, href, color, Icon, label }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color }}
          data-testid={`link-${testPrefix}-${id}`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </a>
      ))}
    </div>
  );

  /* ═══════════════════════════════════════
     EMBEDDED MODE (inside hero)
  ═══════════════════════════════════════ */
  if (embedded) {
    return (
      <div
        id="bronnik"
        className="rounded-2xl w-full"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(28,25,23,0.09)",
          boxShadow: "0 8px 32px rgba(28,25,23,0.08)",
          padding: "20px",
        }}
        data-testid="section-bronnik-embedded"
      >
        {/* Chat messages — only when conversation is active */}
        {view === "chat" && (
          <div className="mb-4">
            <div
              className="flex items-center gap-2 mb-3 pb-3"
              style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}
            >
              <div className="relative shrink-0">
                <img
                  src={bronnikAvatar}
                  alt="Помощник"
                  className="w-7 h-7 rounded-full object-cover"
                  style={{ border: "2px solid rgba(13,115,119,0.2)" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400" style={{ border: "2px solid #fff" }} />
              </div>
              <p className="text-xs font-medium flex-1" style={{ color: "#6b6560" }}>
                Помощник BFR
              </p>
              <button
                onClick={handleReset}
                className="p-1 rounded-full"
                style={{ background: "rgba(28,25,23,0.05)", color: "#a39e98" }}
                title="Начать заново"
                data-testid="button-bronnik-reset"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2.5 mb-3" style={{ maxHeight: "240px", overflowY: "auto" }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <img
                      src={bronnikAvatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover shrink-0 self-end"
                    />
                  )}
                  <div
                    className="max-w-[85%] px-3 py-2 text-xs leading-snug"
                    style={{
                      background: msg.role === "user" ? "#d9fdd3" : "#f5f2ee",
                      color: "#1c1917",
                      borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    }}
                    data-testid={`msg-bronnik-entry-${idx}`}
                  >
                    {msg.content || (isLoading && idx === messages.length - 1
                      ? <Loader2 className="w-3 h-3 animate-spin" style={{ color: "#0d7377" }} />
                      : ""
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input */}
        <div className="mb-3">
          <InputRow compact={view === "chat"} />
        </div>

        {/* City chips */}
        <div className="mb-3">
          <CityChips />
        </div>

        {/* Topic chips */}
        <div className="mb-4">
          <TopicChips />
        </div>

        {/* Messenger alternatives */}
        <MessengerRow testPrefix="bronnik-embedded" />
      </div>
    );
  }

  /* ═══════════════════════════════════════
     STANDALONE — ENTRY VIEW
  ═══════════════════════════════════════ */
  if (view === "entry") {
    return (
      <section
        id="bronnik"
        className="py-16 px-4"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img
                src={bronnikAvatar}
                alt="Бронник"
                className="w-16 h-16 rounded-full object-cover"
                style={{ border: "3px solid rgba(13,115,119,0.2)" }}
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400"
                style={{ border: "2.5px solid #ffffff" }}
              />
            </div>
            <h2
              className="text-2xl font-bold text-center leading-snug mb-1"
              style={{ color: "#1c1917" }}
            >
              Привет. Я Бронник
            </h2>
            <p className="text-sm text-center" style={{ color: "#6b6560" }}>
              Напиши, что нужно, — постараюсь помочь
            </p>
          </div>

          <div className="mb-5">
            <InputRow />
          </div>

          <div className="mb-4">
            <CityChips />
          </div>

          <div className="mb-8">
            <TopicChips />
          </div>

          <MessengerRow testPrefix="bronnik-entry" />
        </div>
      </section>
    );
  }

  /* ═══════════════════════════════════════
     STANDALONE — CHAT VIEW
  ═══════════════════════════════════════ */
  return (
    <section
      id="bronnik"
      className="py-8 px-4"
      style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}>
          <div className="relative shrink-0">
            <img
              src={bronnikAvatar}
              alt="Бронник"
              className="w-10 h-10 rounded-full object-cover"
              style={{ border: "2px solid rgba(13,115,119,0.2)" }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400" style={{ border: "2px solid #fff" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#1c1917" }}>Бронник AI</p>
            <p className="text-[11px]" style={{ color: "#0d7377" }}>принимаем заявки 24/7</p>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full"
            style={{ background: "rgba(28,25,23,0.05)", color: "#6b6560" }}
            title="Начать заново"
            data-testid="button-bronnik-reset"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-5" style={{ maxHeight: "380px", overflowY: "auto" }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <img
                  src={bronnikAvatar}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover shrink-0 self-end"
                />
              )}
              <div
                className="max-w-[80%] px-3.5 py-2.5 text-sm leading-snug shadow-sm"
                style={{
                  background: msg.role === "user" ? "#d9fdd3" : "#f5f2ee",
                  color: "#1c1917",
                  borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                }}
                data-testid={`msg-bronnik-entry-${idx}`}
              >
                {msg.content || (isLoading && idx === messages.length - 1
                  ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0d7377" }} />
                  : ""
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-wrap gap-3 mb-4 text-xs">
          <CityChips />
        </div>

        <div className="mb-5">
          <InputRow compact />
        </div>

        <div className="mb-5">
          <TopicChips />
        </div>

        <MessengerRow testPrefix="bronnik-chat" />
      </div>
    </section>
  );
}
