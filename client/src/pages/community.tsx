import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { Send, LogOut, Users, ArrowLeft, MessageSquare, Scale, TrendingUp, Sofa, Bell, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// ── Types ────────────────────────────────────────────────────────────────────

interface ChatUserSession {
  id: string;
  name: string;
  email: string;
  city: string;
  isAdmin: boolean;
}

interface ChatRoom {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string;
  sortOrder: number;
}

interface ChatMessageData {
  id: string;
  roomId: string;
  userId: string;
  text: string;
  createdAt: string;
  user: { id: string; name: string; city: string };
}

// ── Icon map ─────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  MessageSquare, Scale, TrendingUp, Sofa, Bell, Shield,
};
function RoomIcon({ name, ...props }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? MessageSquare;
  return <Icon {...props} />;
}

// ── Auth Forms ───────────────────────────────────────────────────────────────

function AuthScreen({ onAuth }: { onAuth: (user: ChatUserSession) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/chat/login" : "/api/chat/register";
      const body = mode === "login" ? { email: form.email, password: form.password } : form;
      const res = await apiRequest("POST", endpoint, body);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      localStorage.setItem("chat_user", JSON.stringify(data.user));
      onAuth(data.user);
      toast({ title: mode === "login" ? "Добро пожаловать!" : "Аккаунт создан!", description: `Привет, ${data.user.name}` });
    } catch (err: any) {
      setError(err.message ?? "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: "#faf7f2" }}>
      <Link href="/" className="flex items-center gap-2 mb-8 group" data-testid="link-back-home">
        <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">На главную</span>
      </Link>

      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: "#0d7377" }}>
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#1c1917" }}>Сообщество хозяев BFR</h1>
          <p className="text-sm mt-1" style={{ color: "#6b6560" }}>Закрытый чат для хозяев квартир</p>
        </div>

        <div className="flex rounded-lg overflow-hidden border mb-5" style={{ borderColor: "rgba(28,25,23,0.1)" }}>
          <button
            className="flex-1 py-2 text-sm font-medium transition-colors"
            style={{ background: mode === "login" ? "#0d7377" : "transparent", color: mode === "login" ? "#fff" : "#6b6560" }}
            onClick={() => setMode("login")}
            data-testid="tab-login"
          >Войти</button>
          <button
            className="flex-1 py-2 text-sm font-medium transition-colors"
            style={{ background: mode === "register" ? "#0d7377" : "transparent", color: mode === "register" ? "#fff" : "#6b6560" }}
            onClick={() => setMode("register")}
            data-testid="tab-register"
          >Регистрация</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <>
              <Input placeholder="Ваше имя" value={form.name} onChange={e => update("name", e.target.value)} required data-testid="input-name" />
              <Input placeholder="Телефон" type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} required data-testid="input-phone" />
              <Input placeholder="Город (необязательно)" value={form.city} onChange={e => update("city", e.target.value)} data-testid="input-city" />
            </>
          )}
          <Input placeholder="Email" type="email" value={form.email} onChange={e => update("email", e.target.value)} required data-testid="input-email" />
          <Input placeholder="Пароль" type="password" value={form.password} onChange={e => update("password", e.target.value)} required data-testid="input-password" />

          {error && <p className="text-sm text-red-600 text-center" data-testid="text-auth-error">{error}</p>}

          <Button type="submit" className="w-full text-white" style={{ background: "#0d7377" }} disabled={loading} data-testid="button-auth-submit">
            {loading ? "Подождите…" : mode === "login" ? "Войти в чат" : "Создать аккаунт"}
          </Button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: "#a39e98" }}>
          Чат доступен только для хозяев, зарегистрированных в BFR
        </p>
      </div>
    </div>
  );
}

// ── Chat ─────────────────────────────────────────────────────────────────────

function Chat({ user, onLogout }: { user: ChatUserSession; onLogout: () => void }) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load rooms
  useEffect(() => {
    fetch("/api/chat/rooms")
      .then(r => r.json())
      .then((data: ChatRoom[]) => {
        setRooms(data);
        if (data.length > 0) setActiveRoom(data[0]);
      });
  }, []);

  // Connect WebSocket
  useEffect(() => {
    if (!activeRoom) return;

    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${proto}://${window.location.host}/ws/chat`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", userId: user.id, roomId: activeRoom.id }));
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "history") {
        setMessages(msg.messages);
      } else if (msg.type === "message") {
        setMessages(prev => [...prev, msg.message]);
      } else if (msg.type === "deleted") {
        setMessages(prev => prev.filter(m => m.id !== msg.messageId));
      } else if (msg.type === "online_count") {
        setOnlineCount(msg.count);
      } else if (msg.type === "system") {
        // system messages shown as pseudo-message
        setMessages(prev => [...prev, { id: `sys-${Date.now()}`, roomId: activeRoom.id, userId: "", text: msg.text, createdAt: msg.ts, user: { id: "", name: "система", city: "" } }]);
      }
    };

    ws.onerror = () => toast({ title: "Ошибка соединения", variant: "destructive" });
    ws.onclose = () => setOnlineCount(0);

    return () => ws.close();
  }, [activeRoom?.id, user.id]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchRoom = useCallback((room: ChatRoom) => {
    setActiveRoom(room);
    setMessages([]);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "switch_room", roomId: room.id }));
    }
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "message", text }));
    setInput("");
  };

  const deleteMessage = (messageId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "delete", messageId }));
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#faf7f2" }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-300 shrink-0 ${sidebarOpen ? "w-64" : "w-0 md:w-14"} overflow-hidden`}
        style={{ background: "#f3ede3", borderRight: "1px solid rgba(28,25,23,0.08)" }}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-2 p-3 border-b shrink-0" style={{ borderColor: "rgba(28,25,23,0.08)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#0d7377" }}>
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: "#1c1917" }}>БФР Сообщество</p>
              <p className="text-[10px] truncate" style={{ color: "#6b6560" }}>{user.name}</p>
            </div>
          )}
        </div>

        {/* Rooms */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => switchRoom(room)}
              className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover-elevate"
              style={{
                background: activeRoom?.id === room.id ? "rgba(13,115,119,0.12)" : "transparent",
                color: activeRoom?.id === room.id ? "#0d7377" : "#6b6560",
              }}
              data-testid={`button-room-${room.slug}`}
            >
              <RoomIcon name={room.icon} className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium truncate">{room.name}</span>}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-2 border-t" style={{ borderColor: "rgba(28,25,23,0.08)" }}>
          {sidebarOpen && (
            <div className="px-2 py-1.5 mb-1">
              <p className="text-xs font-semibold truncate" style={{ color: "#1c1917" }}>{user.name}</p>
              {user.city && <p className="text-[10px] truncate" style={{ color: "#6b6560" }}>{user.city}</p>}
              {user.isAdmin && <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: "#0d7377" }}>Администратор</span>}
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 hover-elevate transition-colors"
            style={{ color: "#6b6560" }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span className="text-xs">Выйти</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 h-12 shrink-0" style={{ background: "#fff", borderBottom: "1px solid rgba(28,25,23,0.08)" }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-1.5 rounded-lg hover-elevate"
            style={{ color: "#6b6560" }}
            data-testid="button-toggle-sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "#1c1917" }}>
              {activeRoom?.name ?? "Выберите комнату"}
            </p>
            {activeRoom?.description && (
              <p className="text-[11px] truncate" style={{ color: "#6b6560" }}>{activeRoom.description}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
            <span className="text-xs" style={{ color: "#6b6560" }} data-testid="text-online-count">{onlineCount} онлайн</span>
          </div>
          <Link href="/" className="p-1.5 rounded-lg hover-elevate" style={{ color: "#6b6560" }} data-testid="link-home-from-chat">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-2" style={{ color: "#a39e98" }}>
              <MessageSquare className="w-10 h-10 opacity-30" />
              <p className="text-sm">Здесь пока нет сообщений. Напишите первым!</p>
            </div>
          )}
          {messages.map(msg => {
            const isSystem = msg.userId === "";
            const isOwn = msg.userId === user.id;
            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center" data-testid={`msg-${msg.id}`}>
                  <span className="text-[11px] px-3 py-1 rounded-full" style={{ background: "rgba(28,25,23,0.06)", color: "#a39e98" }}>{msg.text}</span>
                </div>
              );
            }
            return (
              <div key={msg.id} className={`flex gap-2 group ${isOwn ? "flex-row-reverse" : ""}`} data-testid={`msg-${msg.id}`}>
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: isOwn ? "#0d7377" : "#4a7c59" }}>
                  {msg.user.name.charAt(0).toUpperCase()}
                </div>
                <div className={`flex flex-col gap-0.5 max-w-[72%] ${isOwn ? "items-end" : "items-start"}`}>
                  {!isOwn && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold" style={{ color: "#1c1917" }}>{msg.user.name}</span>
                      {msg.user.city && <span className="text-[10px]" style={{ color: "#a39e98" }}>{msg.user.city}</span>}
                    </div>
                  )}
                  <div className="relative">
                    <div
                      className="px-3 py-1.5 rounded-2xl text-sm leading-snug"
                      style={{
                        background: isOwn ? "#0d7377" : "#fff",
                        color: isOwn ? "#fff" : "#1c1917",
                        boxShadow: "0 1px 3px rgba(28,25,23,0.08)",
                        borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      }}
                    >
                      {msg.text}
                    </div>
                    {user.isAdmin && (
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="absolute -top-1 -right-6 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded"
                        style={{ color: "#e57373" }}
                        data-testid={`button-delete-${msg.id}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px]" style={{ color: "#a39e98" }}>{formatTime(msg.createdAt)}</span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex gap-2 px-4 py-3 shrink-0" style={{ background: "#fff", borderTop: "1px solid rgba(28,25,23,0.08)" }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={activeRoom ? `Сообщение в «${activeRoom.name}»…` : "Выберите комнату"}
            disabled={!activeRoom}
            className="flex-1"
            maxLength={2000}
            data-testid="input-message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || !activeRoom}
            style={{ background: "#0d7377" }}
            className="shrink-0"
            data-testid="button-send"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [user, setUser] = useState<ChatUserSession | null>(() => {
    try {
      const stored = localStorage.getItem("chat_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const handleAuth = (u: ChatUserSession) => setUser(u);
  const handleLogout = () => {
    localStorage.removeItem("chat_user");
    setUser(null);
  };

  if (!user) return <AuthScreen onAuth={handleAuth} />;
  return <Chat user={user} onLogout={handleLogout} />;
}
