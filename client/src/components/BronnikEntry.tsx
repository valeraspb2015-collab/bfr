import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Send, Loader2, Mic, MicOff, Home, Camera, Utensils,
  Building2, HeadphonesIcon, MapPin, X,
  ClipboardList, Map, Star,
} from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

/* ─── Standalone chips ──────────────────────────────────────── */
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

/* ─── Scene meta ─────────────────────────────────────────────── */
type SceneIconComp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

interface SceneMeta {
  label: string;
  accent: string;
  accentLight: string;
  Icon: SceneIconComp;
}

const SCENE_META: Record<number, SceneMeta> = {
  0: { label: "Поиск жилья", accent: "#0d7377", accentLight: "rgba(13,115,119,0.08)", Icon: Home },
  1: { label: "Для хозяев", accent: "#4a7c59", accentLight: "rgba(74,124,89,0.08)", Icon: Building2 },
  2: { label: "Сервисы BFR", accent: "#0d7377", accentLight: "rgba(13,115,119,0.08)", Icon: Map },
};

/* ─── Ghost preview conversation per scene ─────────────────── */
const SCENE_PREVIEW: Record<number, { user: string; bot: string }> = {
  0: {
    user: "Нужна 2-кк в центре Петербурга на 3 ночи, 2 взрослых",
    bot: "Принял! Отправлю запрос хозяевам — варианты придут вам в Telegram",
  },
  1: {
    user: "Хочу вступить в сообщество хозяев BFR",
    bot: "Расскажу об условиях и подключу к чату хозяев",
  },
  2: {
    user: "Что посмотреть в Кисловодске за 3 дня?",
    bot: "Составлю маршрут: парк, нарзанная галерея, замок коварства и любви",
  },
};

/* ─── Scene-specific chips ─────────────────────────────────── */
interface SceneChip {
  id: string;
  label: string;
  Icon: SceneIconComp;
  type: "city" | "topic";
  autoSend?: string;
}

const SCENE_CHIPS: Record<number, SceneChip[]> = {
  0: [
    { id: "spb",        label: "Санкт-Петербург",   Icon: MapPin,         type: "city" },
    { id: "kslv",       label: "Кисловодск",         Icon: MapPin,         type: "city" },
    { id: "daily",      label: "Посуточная аренда",  Icon: Home,           type: "topic" },
    { id: "excursions", label: "Экскурсии",          Icon: Camera,         type: "topic" },
    { id: "food",       label: "Питание",            Icon: Utensils,       type: "topic" },
    { id: "admin",      label: "Связь с админом",    Icon: HeadphonesIcon, type: "topic",
      autoSend: "Хочу связаться с администратором." },
  ],
  1: [
    { id: "join",       label: "Вступить в БФР",     Icon: Building2,      type: "topic",
      autoSend: "Хочу вступить в сообщество хозяев BFR." },
    { id: "bookings",   label: "Прямые заявки",      Icon: ClipboardList,  type: "topic",
      autoSend: "Как получать прямые заявки от гостей?" },
    { id: "conditions", label: "Условия участия",    Icon: Star,           type: "topic",
      autoSend: "Каковы условия участия в сообществе хозяев BFR?" },
    { id: "admin",      label: "Связь с админом",    Icon: HeadphonesIcon, type: "topic",
      autoSend: "Хочу связаться с администратором." },
  ],
  2: [
    { id: "kslv",       label: "Кисловодск",         Icon: MapPin,         type: "city" },
    { id: "spb",        label: "Санкт-Петербург",    Icon: MapPin,         type: "city" },
    { id: "excursions", label: "Экскурсии",          Icon: Camera,         type: "topic" },
    { id: "food",       label: "Питание",            Icon: Utensils,       type: "topic" },
    { id: "routes",     label: "Маршруты",           Icon: Map,            type: "topic" },
    { id: "admin",      label: "Связь с админом",    Icon: HeadphonesIcon, type: "topic",
      autoSend: "Хочу связаться с администратором." },
  ],
};

/* ─── Typewriter examples per scene ────────────────────────── */
const SCENE_EXAMPLES: Record<number, string[]> = {
  0: [
    "Нужна 2-кк в центре Петербурга на 3 ночи. 2 взрослых, бюджет 4 000 ₽/сутки.",
    "Кисловодск, 5 ночей с 20 июля. 2 взрослых + ребёнок, нужна парковка.",
    "Студия в Петербурге с 1 по 3 сентября. Поздний заезд около 23:00.",
    "3-кк на Крестовском острове, 28 июня – 5 июля. 4 взрослых + дети.",
    "Нужна квартира с поздним заездом и домашними животными.",
  ],
  1: [
    "Хочу вступить в сообщество хозяев BFR",
    "Как получать прямые заявки без посредников?",
    "Что даёт участие в БФР?",
    "Как добавить своё жильё в базу BFR?",
    "Расскажи об условиях для хозяев подробнее",
  ],
  2: [
    "Что посмотреть в Кисловодске за 3 дня?",
    "Где вкусно поесть рядом с нарзанной галереей?",
    "Какие необычные экскурсии есть в Петербурге?",
    "Куда сходить с детьми за выходные в Петербурге?",
    "Посоветуй маршрут на 2 дня по Кисловодску",
  ],
};

/* ─── Web Speech API types ─────────────────────────────────── */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event { error: string; }
interface SpeechRecognitionInstance extends EventTarget {
  lang: string; continuous: boolean; interimResults: boolean;
  start(): void; stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}
declare const SpeechRecognition: { new(): SpeechRecognitionInstance } | undefined;
declare const webkitSpeechRecognition: { new(): SpeechRecognitionInstance } | undefined;

interface Message { role: "user" | "assistant"; content: string; }

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
        if (s.char >= text.length) { s.deleting = true; tid = setTimeout(tick, 2600); }
        else tid = setTimeout(tick, 44);
      } else {
        s.char--;
        setDisplay(text.slice(0, s.char));
        if (s.char <= 0) { s.deleting = false; s.idx++; tid = setTimeout(tick, 500); }
        else tid = setTimeout(tick, 20);
      }
    };
    tid = setTimeout(tick, 800);
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
  const [previewVisible, setPreviewVisible] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const historyRef = useRef<Message[]>([]);

  const sceneMeta = embedded ? (SCENE_META[sceneIndex ?? 0] ?? SCENE_META[0]) : SCENE_META[0];
  const sceneChips = useMemo(
    () => embedded ? (SCENE_CHIPS[sceneIndex ?? 0] ?? SCENE_CHIPS[0]) : [],
    [embedded, sceneIndex]
  );
  const examples = useMemo(
    () => embedded ? (SCENE_EXAMPLES[sceneIndex ?? 0] ?? SCENE_EXAMPLES[0]) : SCENE_EXAMPLES[0],
    [embedded, sceneIndex]
  );
  const preview = embedded ? (SCENE_PREVIEW[sceneIndex ?? 0] ?? SCENE_PREVIEW[0]) : SCENE_PREVIEW[0];

  /* Reset preview visibility when scene changes */
  useEffect(() => {
    if (embedded && view === "entry") {
      setPreviewVisible(false);
      const t = setTimeout(() => setPreviewVisible(true), 150);
      return () => clearTimeout(t);
    }
  }, [sceneIndex, embedded, view]);

  const animPlaceholder = useTypewriter(
    examples,
    !isFocused && input.length === 0 && view === "entry"
  );

  useEffect(() => { historyRef.current = messages; }, [messages]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  /* ── Voice ── */
  const startListening = useCallback(() => {
    const SR = (typeof SpeechRecognition !== "undefined" && SpeechRecognition)
      || (typeof webkitSpeechRecognition !== "undefined" && webkitSpeechRecognition);
    if (!SR) { alert("Ваш браузер не поддерживает голосовой ввод. Попробуйте Chrome."); return; }
    const rec = new SR();
    rec.lang = "ru-RU"; rec.continuous = false; rec.interimResults = true;
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
  const stopListening = useCallback(() => { recognitionRef.current?.stop(); setIsListening(false); }, []);
  const toggleMic = () => isListening ? stopListening() : startListening();

  /* ── Build context prefix ── */
  const buildContextPrefix = () => {
    if (embedded && sceneIndex !== undefined) {
      const chips = SCENE_CHIPS[sceneIndex] ?? [];
      const activeCityChip = chips.find(c => c.type === "city" && selectedCity === c.id);
      const activeTopicChip = chips.find(c => c.type === "topic" && !c.autoSend && selectedTopic === c.id);
      if (!activeCityChip && !activeTopicChip) return "";
      const parts = [];
      if (activeCityChip) parts.push(`город: ${activeCityChip.label}`);
      if (activeTopicChip) parts.push(`тема: ${activeTopicChip.label}`);
      return `[${parts.join(", ")}] `;
    }
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
          city: selectedCity, topic: selectedTopic,
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
              setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: "assistant", content: assistantText }; return u; });
            }
          } catch { /* */ }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Не удалось передать сообщение. Напишите напрямую в Telegram или WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleSceneChip = (chip: SceneChip) => {
    if (chip.autoSend) { sendMessage(chip.autoSend); return; }
    if (chip.type === "city") setSelectedCity(prev => prev === chip.id ? null : chip.id);
    else setSelectedTopic(prev => prev === chip.id ? null : chip.id);
  };

  const isChipActive = (chip: SceneChip) =>
    chip.type === "city" ? selectedCity === chip.id : selectedTopic === chip.id;

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(prev => prev === topicId ? null : topicId);
    if (topicId === "admin") sendMessage("Хочу связаться с администратором.");
    else if (topicId === "owners") sendMessage("Хочу узнать о вступлении в сообщество хозяев BFR.");
  };

  const handleReset = () => {
    setView("entry"); setMessages([]); setInput("");
    setSelectedCity(null); setSelectedTopic(null);
  };

  /* ── Standalone chips ── */
  const CityChips = () => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs shrink-0" style={{ color: "#6b6560" }}>
        <MapPin className="w-3 h-3" /> Город:
      </span>
      {CITIES.map(city => (
        <button key={city.id} onClick={() => setSelectedCity(prev => prev === city.id ? null : city.id)}
          data-testid={`chip-city-${city.id}`}
          className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
          style={{
            background: selectedCity === city.id ? "rgba(13,115,119,0.08)" : "transparent",
            borderColor: selectedCity === city.id ? "rgba(13,115,119,0.35)" : "rgba(28,25,23,0.14)",
            color: selectedCity === city.id ? "#0d7377" : "#44403c",
          }}>{city.label}</button>
      ))}
    </div>
  );

  const TopicChips = () => (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => handleTopicClick(id)} data-testid={`chip-topic-${id}`}
          className="px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all"
          style={{
            background: selectedTopic === id ? "rgba(13,115,119,0.08)" : "transparent",
            borderColor: selectedTopic === id ? "rgba(13,115,119,0.35)" : "rgba(28,25,23,0.14)",
            color: selectedTopic === id ? "#0d7377" : "#44403c",
          }}>
          <Icon className="w-3.5 h-3.5" />{label}
        </button>
      ))}
    </div>
  );

  /* ── Messenger row ── */
  const MessengerRow = ({ testPrefix }: { testPrefix: string }) => (
    <div className="flex items-center justify-center gap-5 pt-3"
      style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}>
      <span className="text-xs" style={{ color: "#a39e98" }}>Или напрямую:</span>
      {MESSENGER_LINKS.map(({ id, href, color, Icon, label }) => (
        <a key={id} href={href} target="_blank" rel="noopener noreferrer" title={label}
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color }} data-testid={`link-${testPrefix}-${id}`}>
          <Icon className="w-4 h-4" />{label}
        </a>
      ))}
    </div>
  );

  /* ═══════════════════════════════════════
     EMBEDDED MODE
  ═══════════════════════════════════════ */
  if (embedded) {
    const SceneIcon = sceneMeta.Icon;

    return (
      <div
        id="bronnik"
        className="rounded-2xl w-full flex flex-col"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(28,25,23,0.09)",
          borderTop: `3px solid ${sceneMeta.accent}`,
          boxShadow: "0 12px 40px rgba(28,25,23,0.10), 0 2px 8px rgba(28,25,23,0.06)",
          overflow: "hidden",
        }}
        data-testid="section-bronnik-embedded"
      >

        {/* ── Scene header / chat header ── */}
        {view === "entry" ? (
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(28,25,23,0.07)", background: sceneMeta.accentLight }}>
            <div className="flex items-center gap-2">
              <SceneIcon className="w-3.5 h-3.5" style={{ color: sceneMeta.accent }} />
              <span className="text-xs font-semibold" style={{ color: sceneMeta.accent }}>{sceneMeta.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px]" style={{ color: "#6b6560" }}>онлайн</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}>
            <div className="relative shrink-0">
              <img src={bronnikAvatar} alt="" className="w-7 h-7 rounded-full object-cover"
                style={{ border: `2px solid ${sceneMeta.accent}33` }} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400"
                style={{ border: "2px solid #fff" }} />
            </div>
            <p className="text-xs font-medium flex-1" style={{ color: "#6b6560" }}>Помощник BFR</p>
            <button onClick={handleReset} className="p-1 rounded-full"
              style={{ background: "rgba(28,25,23,0.05)", color: "#a39e98" }}
              data-testid="button-bronnik-reset">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Ghost preview (entry) / Real messages (chat) ── */}
        {view === "entry" ? (
          <div
            className="px-4 pt-4 pb-2"
            style={{
              opacity: previewVisible ? 0.28 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {/* User ghost bubble */}
            <div className="flex justify-end mb-2.5">
              <div
                className="max-w-[82%] px-3 py-2 text-[11px] leading-snug"
                style={{
                  background: "#d9fdd3",
                  color: "#1c1917",
                  borderRadius: "12px 12px 3px 12px",
                }}
              >
                {preview.user}
              </div>
            </div>
            {/* Bot ghost bubble */}
            <div className="flex items-end gap-2">
              <img src={bronnikAvatar} alt="" className="w-5 h-5 rounded-full object-cover shrink-0" />
              <div
                className="max-w-[82%] px-3 py-2 text-[11px] leading-snug"
                style={{
                  background: "#f0ece6",
                  color: "#1c1917",
                  borderRadius: "12px 12px 12px 3px",
                }}
              >
                {preview.bot}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 pt-3 pb-1" style={{ maxHeight: "220px", overflowY: "auto" }}>
            <div className="space-y-2.5">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <img src={bronnikAvatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0 self-end" />
                  )}
                  <div className="max-w-[85%] px-3 py-2 text-xs leading-snug"
                    style={{
                      background: msg.role === "user" ? "#d9fdd3" : "#f5f2ee",
                      color: "#1c1917",
                      borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    }}
                    data-testid={`msg-bronnik-entry-${idx}`}>
                    {msg.content || (isLoading && idx === messages.length - 1
                      ? <Loader2 className="w-3 h-3 animate-spin" style={{ color: sceneMeta.accent }} />
                      : "")}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* ── Input area ── */}
        <div className="px-4 pt-3 pb-2">
          <div
            className="relative rounded-xl"
            style={{
              background: isFocused ? "#fff" : "#faf7f2",
              border: `1.5px solid ${isFocused ? sceneMeta.accent + "88" : "rgba(28,25,23,0.12)"}`,
              boxShadow: isFocused ? `0 0 0 3px ${sceneMeta.accentLight}` : "none",
              transition: "all 0.2s ease",
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
              rows={view === "chat" ? 2 : 3}
              className="w-full resize-none text-sm leading-relaxed focus:outline-none"
              style={{
                padding: view === "chat" ? "10px 90px 10px 14px" : "14px 90px 40px 14px",
                background: "transparent",
                color: "#1c1917",
                fontFamily: "inherit",
              }}
              data-testid="input-bronnik-entry"
            />
            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
              <button onClick={toggleMic} title={isListening ? "Стоп" : "Голос"}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isListening ? "rgba(220,38,38,0.1)" : sceneMeta.accentLight,
                  border: `1px solid ${isListening ? "rgba(220,38,38,0.25)" : sceneMeta.accent + "30"}`,
                }}
                data-testid="button-bronnik-entry-mic">
                {isListening
                  ? <MicOff className="w-3.5 h-3.5" style={{ color: "#dc2626" }} />
                  : <Mic className="w-3.5 h-3.5" style={{ color: sceneMeta.accent }} />}
              </button>
              <Button onClick={() => sendMessage()} disabled={!input.trim() || isLoading}
                size="icon" className="w-8 h-8 rounded-full text-white"
                style={{ background: sceneMeta.accent, minWidth: 0 }}
                data-testid="button-bronnik-entry-send">
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </Button>
            </div>
            {view === "entry" && !isFocused && (
              <p className="absolute left-3.5 bottom-2.5 text-[10px]" style={{ color: "#b8b3ae" }}>
                Enter для отправки · Shift+Enter для переноса
              </p>
            )}
          </div>
        </div>

        {/* ── Scene-specific chips ── */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {sceneChips.map((chip) => {
              const active = !chip.autoSend && isChipActive(chip);
              return (
                <button
                  key={chip.id}
                  onClick={() => handleSceneChip(chip)}
                  data-testid={`chip-scene-${chip.id}`}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all"
                  style={{
                    background: active ? sceneMeta.accentLight : "transparent",
                    borderColor: active ? `${sceneMeta.accent}55` : "rgba(28,25,23,0.13)",
                    color: active ? sceneMeta.accent : "#44403c",
                  }}
                >
                  <chip.Icon className="w-3 h-3 shrink-0" />
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Messenger links ── */}
        <div className="px-4 pb-4">
          <MessengerRow testPrefix="bronnik-embedded" />
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     STANDALONE — ENTRY VIEW
  ═══════════════════════════════════════ */
  if (view === "entry") {
    return (
      <section id="bronnik" className="py-16 px-4"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img src={bronnikAvatar} alt="Бронник" className="w-16 h-16 rounded-full object-cover"
                style={{ border: "3px solid rgba(13,115,119,0.2)" }} />
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400"
                style={{ border: "2.5px solid #ffffff" }} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-1" style={{ color: "#1c1917" }}>
              Привет. Я Бронник
            </h2>
            <p className="text-sm text-center" style={{ color: "#6b6560" }}>
              Напиши, что нужно, — постараюсь помочь
            </p>
          </div>
          <div className="relative rounded-2xl mb-5"
            style={{ background: "#faf7f2", border: "1.5px solid rgba(28,25,23,0.12)" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
              placeholder={animPlaceholder || "Напишите, что нужно..."}
              rows={4} className="w-full resize-none text-sm leading-relaxed focus:outline-none"
              style={{ padding: "16px 100px 16px 16px", background: "transparent", color: "#1c1917" }}
              data-testid="input-bronnik-entry" />
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
              <button onClick={toggleMic}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(13,115,119,0.08)" }}
                data-testid="button-bronnik-entry-mic">
                {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" style={{ color: "#0d7377" }} />}
              </button>
              <Button onClick={() => sendMessage()} disabled={!input.trim() || isLoading}
                size="icon" className="rounded-full text-white" style={{ background: "#0d7377" }}
                data-testid="button-bronnik-entry-send">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="mb-4"><CityChips /></div>
          <div className="mb-8"><TopicChips /></div>
          <MessengerRow testPrefix="bronnik-entry" />
        </div>
      </section>
    );
  }

  /* ═══════════════════════════════════════
     STANDALONE — CHAT VIEW
  ═══════════════════════════════════════ */
  return (
    <section id="bronnik" className="py-8 px-4"
      style={{ background: "#ffffff", borderTop: "1px solid rgba(28,25,23,0.07)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.07)" }}>
          <div className="relative shrink-0">
            <img src={bronnikAvatar} alt="Бронник" className="w-10 h-10 rounded-full object-cover"
              style={{ border: "2px solid rgba(13,115,119,0.2)" }} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
              style={{ border: "2px solid #fff" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#1c1917" }}>Бронник AI</p>
            <p className="text-[11px]" style={{ color: "#0d7377" }}>принимаем заявки 24/7</p>
          </div>
          <button onClick={handleReset} className="p-1.5 rounded-full"
            style={{ background: "rgba(28,25,23,0.05)", color: "#6b6560" }}
            data-testid="button-bronnik-reset">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 mb-5" style={{ maxHeight: "380px", overflowY: "auto" }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <img src={bronnikAvatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 self-end" />
              )}
              <div className="max-w-[80%] px-3.5 py-2.5 text-sm leading-snug"
                style={{
                  background: msg.role === "user" ? "#d9fdd3" : "#f5f2ee",
                  color: "#1c1917",
                  borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                }}
                data-testid={`msg-bronnik-entry-${idx}`}>
                {msg.content || (isLoading && idx === messages.length - 1
                  ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0d7377" }} />
                  : "")}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-wrap gap-3 mb-4 text-xs"><CityChips /></div>
        <div className="relative rounded-2xl mb-5"
          style={{ background: "#faf7f2", border: "1.5px solid rgba(28,25,23,0.12)" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            rows={2} placeholder="Ваш следующий вопрос..."
            className="w-full resize-none text-sm leading-relaxed focus:outline-none"
            style={{ padding: "10px 90px 10px 14px", background: "transparent", color: "#1c1917" }}
            data-testid="input-bronnik-entry" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button onClick={toggleMic}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(13,115,119,0.08)" }}
              data-testid="button-bronnik-entry-mic">
              {isListening ? <MicOff className="w-3.5 h-3.5 text-red-500" /> : <Mic className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />}
            </button>
            <Button onClick={() => sendMessage()} disabled={!input.trim() || isLoading}
              size="icon" className="rounded-full text-white" style={{ background: "#0d7377", minWidth: 0 }}
              data-testid="button-bronnik-entry-send">
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
        <div className="mb-5"><TopicChips /></div>
        <MessengerRow testPrefix="bronnik-chat" />
      </div>
    </section>
  );
}
