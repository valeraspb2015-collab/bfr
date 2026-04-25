import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function BronnikChat() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Скрываем на странице сообщества — там своя кнопка
  if (location === "/community") return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Привет! Я Бронник — ваш персональный гид по городам России. Расскажу про экскурсии, достопримечательности и составлю маршрут. В какой город планируете поездку?"
      }]);
    }
  }, [isOpen, messages.length]);

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

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              assistantMessage += data.content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantMessage };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Извините, произошла ошибка. Попробуйте позже."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
          <div className="flex gap-2">
            <a
              href="https://t.me/bfrreplit_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#0088cc] hover:bg-[#0077b5] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              data-testid="button-telegram"
            >
              <SiTelegram className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://wa.me/79899865887"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              data-testid="button-whatsapp"
            >
              <SiWhatsapp className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOJGqIR7nRudfc6Wx4fiZADACwanqE4IJkMfLa6mgbmdQ0Ei69A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#7B68EE] hover:bg-[#6a5acd] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              data-testid="button-max"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </a>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-2xl flex items-center gap-3 px-4 py-3 transition-all hover:scale-105"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(13,115,119,0.25)",
              boxShadow: "0 4px 20px rgba(13,115,119,0.12), 0 2px 8px rgba(28,25,23,0.08)",
            }}
            data-testid="button-bronnik-open"
          >
            <img
              src={bronnikAvatar}
              alt="Бронник"
              className="w-12 h-12 rounded-full object-cover"
              style={{ border: "2px solid rgba(13,115,119,0.4)" }}
            />
            <div className="text-left">
              <div className="font-semibold text-sm" style={{ color: "#0d7377" }}>Бронник помоги</div>
              <div className="text-xs" style={{ color: "#6b6560" }}>Помощь админов</div>
            </div>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-[360px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(13,115,119,0.2)",
            boxShadow: "0 20px 60px rgba(28,25,23,0.15)",
          }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              background: "#faf7f2",
              borderBottom: "1px solid rgba(28,25,23,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <img
                src={bronnikAvatar}
                alt="Бронник"
                className="w-8 h-8 rounded-full object-cover"
                style={{ border: "2px solid rgba(13,115,119,0.35)" }}
              />
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "#1c1917" }}>Бронник</h3>
                <p className="text-xs" style={{ color: "#6b6560" }}>Помощь админов</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded transition-colors"
              style={{ color: "#6b6560" }}
              data-testid="button-bronnik-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "#faf7f2" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] px-3 py-2 rounded-2xl text-sm"
                  style={
                    msg.role === "user"
                      ? {
                          background: "#0d7377",
                          color: "#ffffff",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          background: "#ffffff",
                          color: "#1c1917",
                          border: "1px solid rgba(28,25,23,0.08)",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                  data-testid={`message-${msg.role}-${idx}`}
                >
                  {msg.content || (isLoading && idx === messages.length - 1 ? (
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0d7377" }} />
                  ) : null)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            className="p-3"
            style={{ borderTop: "1px solid rgba(28,25,23,0.08)", background: "#ffffff" }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="flex-1 px-3 py-2 text-sm rounded-full focus:outline-none"
                style={{
                  background: "#faf7f2",
                  border: "1px solid rgba(28,25,23,0.12)",
                  color: "#1c1917",
                }}
                disabled={isLoading}
                data-testid="input-bronnik-message"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full text-white"
                style={{ background: "#0d7377" }}
                data-testid="button-bronnik-send"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
