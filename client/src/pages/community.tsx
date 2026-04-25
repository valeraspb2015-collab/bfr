import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import {
  Send, LogOut, ArrowLeft, MessageSquare, Wrench, UserX, Bookmark, Newspaper,
  Coffee, ClipboardList, Menu, X, Search, Loader2, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import bronnikAvatar from "@/assets/bronnik-avatar.png";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatUserSession {
  id: string; name: string; email: string; city: string; isAdmin: boolean;
}
interface ChatRoom {
  id: string; slug: string; name: string; description: string | null; icon: string; sortOrder: number;
}
interface ChatMessageData {
  id: string; roomId: string; userId: string; text: string; createdAt: string;
  user: { id: string; name: string; city: string };
}

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  MessageSquare, Wrench, UserX, Bookmark, Newspaper, Coffee, ClipboardList, Search,
};
function RoomIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Icon = ICONS[name] ?? MessageSquare;
  return <Icon className={className} style={style} />;
}

// Room accent colors — each group has its own WhatsApp-like color
const ROOM_COLORS: Record<string, string> = {
  requests: "#0d7377",
  chat: "#7c5cbf",
  staff: "#e07b39",
  blacklist: "#c0392b",
  useful: "#27ae60",
  news: "#2980b9",
};

// ── Mini Бронник panel ────────────────────────────────────────────────────────

function BronnikPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Привет! Я Бронник. Если нужна помощь — напишите, передам администраторам." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/bronnik/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          for (const line of decoder.decode(value, { stream: true }).split("\n")) {
            if (!line.startsWith("data: ")) continue;
            try { const d = JSON.parse(line.slice(6)); if (d.content) { reply += d.content; setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: "assistant", content: reply }; return u; }); } } catch {}
          }
        }
      }
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Ошибка. Попробуйте позже." }]); }
    finally { setLoading(false); }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-72 flex flex-col z-20 shadow-2xl"
      style={{ background: "#fff", borderLeft: "1px solid rgba(28,25,23,0.1)" }}>
      <div className="flex items-center gap-2 px-3 py-3 shrink-0" style={{ background: "#0d7377" }}>
        <img src={bronnikAvatar} alt="Бронник" className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-none">Бронник помоги</p>
          <p className="text-[11px] text-white/70 mt-0.5">Помощь админов</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors text-white" data-testid="button-bronnik-close">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ background: "#e5ddd5" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] px-3 py-1.5 rounded-2xl text-sm leading-snug shadow-sm"
              style={{
                background: m.role === "user" ? "#d9fdd3" : "#fff",
                color: "#1c1917",
                borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
              }}>
              {m.content || (loading && i === messages.length - 1 ? <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" /> : null)}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 p-2 shrink-0" style={{ background: "#f0f0f0", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Написать Броннику…"
          className="flex-1 px-3 py-1.5 text-sm rounded-full focus:outline-none bg-white"
          style={{ border: "1px solid rgba(0,0,0,0.1)" }}
          data-testid="input-bronnik"
        />
        <button onClick={send} disabled={!input.trim() || loading}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-40"
          style={{ background: "#0d7377" }} data-testid="button-bronnik-send">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Auth Screen ───────────────────────────────────────────────────────────────

function AuthScreen({ onAuth }: { onAuth: (u: ChatUserSession) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await apiRequest("POST", mode === "login" ? "/api/chat/login" : "/api/chat/register",
        mode === "login" ? { email: form.email, password: form.password } : form);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      localStorage.setItem("chat_user", JSON.stringify(data.user));
      onAuth(data.user);
      toast({ title: mode === "login" ? "Добро пожаловать!" : "Аккаунт создан!", description: `Привет, ${data.user.name}` });
    } catch (err: any) { setError(err.message ?? "Ошибка"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: "#e5ddd5" }}>
      <Link href="/" className="flex items-center gap-1.5 mb-8 group" data-testid="link-back-home">
        <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-gray-800 transition-colors" />
        <span className="text-sm text-gray-500 group-hover:text-gray-800 transition-colors">На главную</span>
      </Link>
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* WA-style header */}
        <div className="px-6 py-5 flex flex-col items-center" style={{ background: "#0d7377" }}>
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">Сообщество BFR</h1>
          <p className="text-xs text-white/70 mt-0.5">Закрытый чат хозяев квартир</p>
        </div>

        <div className="p-5">
          <div className="flex rounded-xl overflow-hidden border mb-4" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm font-medium transition-colors"
                style={{ background: mode === m ? "#0d7377" : "transparent", color: mode === m ? "#fff" : "#6b7280" }}
                data-testid={`tab-${m}`}>
                {m === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-2.5">
            {mode === "register" && <>
              <Input placeholder="Ваше имя" value={form.name} onChange={e => upd("name", e.target.value)} required data-testid="input-name" />
              <Input placeholder="Телефон" type="tel" value={form.phone} onChange={e => upd("phone", e.target.value)} required data-testid="input-phone" />
              <Input placeholder="Город" value={form.city} onChange={e => upd("city", e.target.value)} data-testid="input-city" />
            </>}
            <Input placeholder="Email" type="email" value={form.email} onChange={e => upd("email", e.target.value)} required data-testid="input-email" />
            <Input placeholder="Пароль" type="password" value={form.password} onChange={e => upd("password", e.target.value)} required data-testid="input-password" />
            {error && <p className="text-sm text-red-600 text-center" data-testid="text-auth-error">{error}</p>}
            <Button type="submit" className="w-full text-white mt-1" style={{ background: "#0d7377" }} disabled={loading} data-testid="button-auth-submit">
              {loading ? "Подождите…" : mode === "login" ? "Войти в чат" : "Создать аккаунт"}
            </Button>
          </form>
          <p className="text-xs text-center mt-4 text-gray-400">Только для хозяев, зарегистрированных в BFR</p>
        </div>
      </div>
    </div>
  );
}

// ── Chat ──────────────────────────────────────────────────────────────────────

function Chat({ user, onLogout }: { user: ChatUserSession; onLogout: () => void }) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);  // left room list on mobile
  const [bronnikOpen, setBronnikOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/chat/rooms").then(r => r.json()).then((data: ChatRoom[]) => {
      setRooms(data);
      if (data.length > 0) setActiveRoom(data[0]);
    });
  }, []);

  useEffect(() => {
    if (!activeRoom) return;
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${proto}://${window.location.host}/ws/chat`);
    wsRef.current = ws;
    ws.onopen = () => ws.send(JSON.stringify({ type: "join", userId: user.id, roomId: activeRoom.id }));
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "history") setMessages(msg.messages);
      else if (msg.type === "message") setMessages(prev => [...prev, msg.message]);
      else if (msg.type === "deleted") setMessages(prev => prev.filter(m => m.id !== msg.messageId));
      else if (msg.type === "online_count") setOnlineCount(msg.count);
      else if (msg.type === "system") setMessages(prev => [...prev, { id: `sys-${Date.now()}`, roomId: activeRoom.id, userId: "", text: msg.text, createdAt: msg.ts, user: { id: "", name: "", city: "" } }]);
    };
    ws.onerror = () => toast({ title: "Ошибка соединения", variant: "destructive" });
    ws.onclose = () => setOnlineCount(0);
    return () => ws.close();
  }, [activeRoom?.id, user.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const switchRoom = useCallback((room: ChatRoom) => {
    setActiveRoom(room);
    setMessages([]);
    if (wsRef.current?.readyState === WebSocket.OPEN)
      wsRef.current.send(JSON.stringify({ type: "switch_room", roomId: room.id }));
    setPanelOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "message", text }));
    setInput("");
    inputRef.current?.focus();
  };

  const deleteMessage = (id: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN)
      wsRef.current.send(JSON.stringify({ type: "delete", messageId: id }));
  };

  const fmt = (iso: string) => new Date(iso).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  const roomColor = (slug: string) => ROOM_COLORS[slug] ?? "#0d7377";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden select-none">

      {/* ── LEFT PANEL — rooms list (WhatsApp style) ──────────────────────── */}
      <aside
        className={`flex flex-col shrink-0 overflow-hidden transition-all duration-200 ${panelOpen ? "w-72" : "w-0"} md:w-72`}
        style={{ background: "#fff", borderRight: "1px solid #e9e9e9" }}
      >
        {/* WA-like green header */}
        <div className="flex items-center justify-between px-4 h-14 shrink-0" style={{ background: "#0d7377" }}>
          <div>
            <p className="text-sm font-bold text-white leading-none">БФР Сообщество</p>
            <p className="text-[11px] text-white/60 mt-0.5">{user.name}{user.city ? ` · ${user.city}` : ""}</p>
          </div>
          <div className="flex items-center gap-1">
            {user.isAdmin && (
              <span className="text-[9px] font-bold tracking-wider bg-white/20 text-white px-1.5 py-0.5 rounded-full uppercase">
                Admin
              </span>
            )}
            <button onClick={onLogout} className="p-1.5 rounded-full hover:bg-white/10 transition-colors" title="Выйти" data-testid="button-logout">
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Rooms list */}
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room, i) => {
            const isActive = activeRoom?.id === room.id;
            const color = roomColor(room.slug);
            return (
              <button key={room.id} onClick={() => switchRoom(room)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b"
                style={{
                  background: isActive ? "#f0f8f8" : "transparent",
                  borderColor: "#f0f0f0",
                }}
                data-testid={`button-room-${room.slug}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: color + "22", border: `1.5px solid ${color}40` }}>
                  <RoomIcon name={room.icon} className="w-[18px] h-[18px]" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: isActive ? color : "#111" }}>{room.name}</p>
                  <p className="text-[11px] truncate" style={{ color: "#9ca3af" }}>{room.description}</p>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />}
              </button>
            );
          })}
        </div>

        {/* Back to site */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "#f0f0f0" }}>
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors" data-testid="link-home">
            <ArrowLeft className="w-3.5 h-3.5" /> На главную сайта
          </Link>
        </div>
      </aside>

      {/* ── RIGHT — messages ─────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 relative">

        {/* Chat header — WA style */}
        <header className="flex items-center gap-3 px-4 h-14 shrink-0 z-10"
          style={{ background: "#0d7377", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
          {/* Mobile: toggle rooms panel */}
          <button className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
            onClick={() => setPanelOpen(v => !v)} data-testid="button-toggle-panel">
            <Menu className="w-5 h-5" />
          </button>

          {/* Room avatar */}
          {activeRoom && (
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <RoomIcon name={activeRoom.icon} className="w-4 h-4 text-white" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{activeRoom?.name ?? "Выберите группу"}</p>
            <p className="text-[11px] text-white/60 truncate">
              <span className="inline-flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-300" />
                {onlineCount} онлайн
              </span>
            </p>
          </div>

          {/* Бронник помоги */}
          <button onClick={() => setBronnikOpen(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors shrink-0"
            style={{ background: bronnikOpen ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)" }}
            data-testid="button-bronnik-toggle"
          >
            <img src={bronnikAvatar} alt="Бронник" className="w-5 h-5 rounded-full object-cover border border-white/40" />
            <span className="text-xs font-medium text-white hidden sm:inline">Бронник помоги</span>
          </button>
        </header>

        {/* Messages area — WA wallpaper background */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 relative"
          style={{ background: "#e5ddd5", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23d5cdc5' fill-opacity='0.5'/%3E%3C/svg%3E\")" }}>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="px-4 py-2 rounded-lg text-center" style={{ background: "rgba(0,0,0,0.12)" }}>
                <p className="text-xs text-gray-700">Здесь пока нет сообщений. Напишите первым!</p>
              </div>
            </div>
          )}

          {messages.map(msg => {
            const isSystem = msg.userId === "";
            const isOwn = msg.userId === user.id;

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <span className="text-[11px] px-3 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.1)", color: "#555" }}>
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} group`} data-testid={`msg-${msg.id}`}>
                {/* Incoming: avatar on left */}
                {!isOwn && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 self-end mr-1.5"
                    style={{ background: "#4a7c59" }}>
                    {msg.user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className={`flex flex-col max-w-[68%] ${isOwn ? "items-end" : "items-start"}`}>
                  <div className="relative px-3 py-1.5 shadow-sm"
                    style={{
                      background: isOwn ? "#d9fdd3" : "#ffffff",
                      borderRadius: isOwn ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                      minWidth: "60px",
                    }}>

                    {/* Sender name for incoming */}
                    {!isOwn && (
                      <p className="text-xs font-semibold mb-0.5 truncate" style={{ color: roomColor(activeRoom?.slug ?? "") }}>
                        {msg.user.name}{msg.user.city ? ` · ${msg.user.city}` : ""}
                      </p>
                    )}

                    <p className="text-sm leading-snug break-words" style={{ color: "#111" }}>{msg.text}</p>

                    {/* Time inside bubble (WA style) */}
                    <p className="text-[10px] text-right mt-0.5" style={{ color: "#9ca3af" }}>{fmt(msg.createdAt)}</p>

                    {/* Admin delete button */}
                    {user.isAdmin && (
                      <button onClick={() => deleteMessage(msg.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`button-delete-${msg.id}`}>
                        <X className="w-3 h-3 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input bar — WA style */}
        <div className="px-3 py-2 shrink-0 flex items-center gap-2" style={{ background: "#f0f0f0", borderTop: "1px solid #e0e0e0" }}>
          <form onSubmit={sendMessage} className="flex items-center gap-2 flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(e as any); } }}
              placeholder={activeRoom ? `Сообщение` : "Выберите группу"}
              disabled={!activeRoom}
              maxLength={2000}
              className="flex-1 px-4 py-2 text-sm rounded-full focus:outline-none bg-white"
              style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
              data-testid="input-message"
            />
            <button
              type="submit"
              disabled={!input.trim() || !activeRoom}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 shrink-0 transition-opacity"
              style={{ background: "#0d7377" }}
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Бронник side panel */}
        {bronnikOpen && <BronnikPanel onClose={() => setBronnikOpen(false)} />}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [user, setUser] = useState<ChatUserSession | null>(() => {
    try { return JSON.parse(localStorage.getItem("chat_user") ?? "null"); } catch { return null; }
  });
  if (!user) return <AuthScreen onAuth={u => { setUser(u); }} />;
  return <Chat user={user} onLogout={() => { localStorage.removeItem("chat_user"); setUser(null); }} />;
}
