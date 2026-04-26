import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Mic, MicOff, ChevronDown } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Web Speech API types ───────────────────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
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

const MESSENGER_LINKS = [
  { id: "telegram", href: "https://t.me/bfrreplit_bot", color: "#0088cc", Icon: SiTelegram, title: "Telegram" },
  { id: "whatsapp", href: "https://wa.me/79899865887", color: "#25D366", Icon: SiWhatsapp, title: "WhatsApp" },
  { id: "max", href: "https://max.ru/u/f9LHodD0cOJGqIR7nRudfc6Wx4fiZADACwanqE4IJkMfLa6mgbmdQ0Ei69A", color: "#7B68EE", Icon: MessageSquare, title: "Макс" },
];

const GREETING: Message = {
  role: "assistant",
  content: "Здравствуйте! Я Бронник — помощник БФР. Опишите ваш вопрос или заявку — я передам её команде.",
};

export default function BronnikChat() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([GREETING]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  // ── Voice recognition ──────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = (typeof SpeechRecognition !== "undefined" && SpeechRecognition)
      || (typeof webkitSpeechRecognition !== "undefined" && webkitSpeechRecognition);
    if (!SR) {
      alert("Ваш браузер не поддерживает голосовой ввод. Попробуйте Chrome или Safari.");
      return;
    }
    const rec = new SR();
    rec.lang = "ru-RU";
    rec.continuous = false;
    rec.interimResults = true;
    recognitionRef.current = rec;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
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

  const toggleMic = () => {
    if (isListening) stopListening();
    else startListening();
  };

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/bronnik/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
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
          } catch {}
        }
      }
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Не удалось передать сообщение. Пожалуйста, свяжитесь с нами через Telegram или WhatsApp.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Hide on community — it has its own panel
  if (location === "/community") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">

      {/* ── Messenger quick-links ── */}
      <div className="flex gap-2">
        {MESSENGER_LINKS.map(({ id, href, color, Icon, title }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
            style={{ background: color }}
            data-testid={`button-${id}`}
          >
            <Icon className="w-5 h-5 text-white" />
          </a>
        ))}
      </div>

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          className="w-[340px] rounded-2xl flex flex-col overflow-hidden"
          style={{
            height: "460px",
            background: "#ffffff",
            border: "1px solid rgba(13,115,119,0.18)",
            boxShadow: "0 16px 48px rgba(28,25,23,0.16)",
          }}
          data-testid="panel-bronnik"
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3 shrink-0"
            style={{ background: "#0d7377" }}
          >
            <div className="relative shrink-0">
              <img
                src={bronnikAvatar}
                alt="Бронник"
                className="w-9 h-9 rounded-full object-cover"
                style={{ border: "2px solid rgba(255,255,255,0.35)" }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">Бронник AI</p>
              <p className="text-[11px] text-white/70 mt-0.5">Принимаем заявки 24/7</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              data-testid="button-bronnik-close"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
            style={{ background: "#f5f2ee" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <img
                    src={bronnikAvatar}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover mr-1.5 mt-1 shrink-0 self-end"
                  />
                )}
                <div
                  className="max-w-[78%] px-3 py-2 text-sm leading-snug shadow-sm"
                  style={{
                    background: msg.role === "user" ? "#d9fdd3" : "#ffffff",
                    color: "#1c1917",
                    borderRadius: msg.role === "user"
                      ? "14px 14px 3px 14px"
                      : "14px 14px 14px 3px",
                  }}
                  data-testid={`msg-bronnik-${idx}`}
                >
                  {msg.content || (isLoading && idx === messages.length - 1 ? (
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0d7377" }} />
                  ) : "")}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-2.5 flex items-center gap-2 shrink-0"
            style={{ borderTop: "1px solid rgba(28,25,23,0.08)", background: "#ffffff" }}
          >
            {/* Mic button */}
            <button
              onClick={toggleMic}
              title={isListening ? "Остановить запись" : "Голосовой ввод"}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{
                background: isListening ? "rgba(220,38,38,0.08)" : "rgba(13,115,119,0.07)",
                border: `1px solid ${isListening ? "rgba(220,38,38,0.25)" : "rgba(13,115,119,0.18)"}`,
              }}
              data-testid="button-bronnik-mic"
            >
              {isListening
                ? <MicOff className="w-3.5 h-3.5" style={{ color: "#dc2626" }} />
                : <Mic className="w-3.5 h-3.5" style={{ color: "#0d7377" }} />
              }
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isListening ? "Говорите…" : "Напишите заявку…"}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-sm rounded-full focus:outline-none"
              style={{
                background: "#f5f2ee",
                border: "1px solid rgba(28,25,23,0.12)",
                color: "#1c1917",
              }}
              data-testid="input-bronnik-message"
            />

            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="rounded-full text-white shrink-0"
              style={{ background: "#0d7377" }}
              data-testid="button-bronnik-send"
            >
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }
            </Button>
          </div>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(13,115,119,0.22)",
          boxShadow: "0 4px 20px rgba(13,115,119,0.14), 0 2px 6px rgba(28,25,23,0.06)",
        }}
        data-testid="button-bronnik-open"
      >
        <div className="relative">
          <img
            src={bronnikAvatar}
            alt="Бронник"
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
            Ваш помощник
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#0d7377" }}>
            Бронник AI
          </p>
        </div>
      </button>
    </div>
  );
}
