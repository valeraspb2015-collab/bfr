import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Loader2, Mic, MicOff, Home, Camera, Utensils,
  Building2, HeadphonesIcon, ChevronDown, MapPin, X,
} from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

/* ─── Config — easy to extend ─────────────────────────────── */
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

const EXAMPLES = [
  "Нужна 3-кк в центре, 4 взрослых и 2 детей на 15–18 июля. Нужна парковка.",
  "Ищу квартиру в Санкт-Петербурге на выходные для семьи с ребёнком.",
  "Нужна студия в Кисловодске на 3 ночи, желательно рядом с парком.",
  "Нужна квартира посуточно для 2 взрослых и собаки.",
  "Есть что-то с поздним заездом после 23:00?",
  "Ищу квартиру с ранним заездом и парковкой.",
  "Нужна квартира для курящих на 2 дня.",
  "Ищу вариант рядом с метро в центре Петербурга.",
  "Нужна квартира в Кисловодске на 5 дней для мамы с ребёнком.",
  "Ищу жильё с отдельными спальными местами.",
  "Какие места порекомендуешь посмотреть за 3 дня?",
  "Интересуют нестандартные экскурсии и места.",
  "Где вкусно поесть рядом?",
  "Как вступить в сообщество хозяев?",
  "Хочу связаться с администратором.",
];

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
export default function BronnikEntry() {
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

  const animPlaceholder = useTypewriter(EXAMPLES, !isFocused && input.length === 0 && view === "entry");

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

  /* ── Input row (shared between states) ── */
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
      {/* Mic + Send overlay */}
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
      {/* Char hint when typing */}
      {input.length > 0 && !compact && (
        <p className="absolute left-4 bottom-3 text-[10px]" style={{ color: "#a39e98" }}>
          Shift+Enter для переноса строки · Enter для отправки
        </p>
      )}
    </div>
  );

  /* ── ENTRY VIEW ── */
  if (view === "entry") {
    return (
      <section
        id="bronnik"
        className="py-16 px-4"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Avatar + name */}
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

          {/* Main input */}
          <div className="mb-5">
            <InputRow />
          </div>

          {/* City chips */}
          <div className="mb-4">
            <CityChips />
          </div>

          {/* Topic chips */}
          <div className="mb-8">
            <TopicChips />
          </div>

          {/* Messenger alternatives */}
          <div className="flex items-center justify-center gap-6 pt-4" style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}>
            <span className="text-xs" style={{ color: "#a39e98" }}>Или написать напрямую:</span>
            {MESSENGER_LINKS.map(({ id, href, color, Icon, label }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color }}
                data-testid={`link-bronnik-${id}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── CHAT VIEW ── */
  return (
    <section
      id="bronnik"
      className="py-8 px-4"
      style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Compact header */}
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

        {/* Messages */}
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

        {/* Context chips (compact) */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs">
          <CityChips />
        </div>

        {/* Compact input */}
        <div className="mb-5">
          <InputRow compact />
        </div>

        {/* Topic chips below input */}
        <div className="mb-5">
          <TopicChips />
        </div>

        {/* Messenger alternatives */}
        <div className="flex items-center justify-center gap-6 pt-4" style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}>
          <span className="text-xs" style={{ color: "#a39e98" }}>Или написать напрямую:</span>
          {MESSENGER_LINKS.map(({ id, href, color, Icon, label }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color }}
              data-testid={`link-bronnik-chat-${id}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
