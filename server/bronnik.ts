import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import pg from "pg";
const { Pool } = pg;

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

/* ─── Admin config — change via env vars, never hardcode ─── */
const ADMIN_CONFIG = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",
  adminPhone: process.env.ADMIN_PHONE ?? "+79213798941",
};

/* ─── Orchestrator system prompt ────────────────────────── */
const BRONNIK_SYSTEM_PROMPT = `Ты — Бронник, ИИ-помощник сервиса BFR (Best Flat Rent — лучшая аренда квартир).

ТВОЯ РОЛЬ: дружелюбный помощник, который принимает заявки на аренду, отвечает на вопросы и помогает разобраться в сервисе.

СТИЛЬ ОБЩЕНИЯ:
- Человеческий, простой, тёплый. Без официоза.
- Ответы короткие и ясные.
- Если что-то непонятно — вежливо уточни, не ругай пользователя.
- Только русский язык. Без emoji и лишних символов.

─────────────────────────────────────────
СЦЕНАРИЙ 1 — АРЕНДА ЖИЛЬЯ
─────────────────────────────────────────
Если пользователь хочет снять квартиру:
1. Понять: город, даты (заезд/выезд), количество гостей, пожелания.
2. Если информации достаточно — подтверди принятие заявки:
   «Отлично, заявка принята. Хозяева откликнутся — мы пришлём подходящие варианты.»
3. Если чего-то не хватает — задай один уточняющий вопрос (не несколько сразу).

Что важно собрать (по мере разговора, не анкетой):
- Город
- Даты заезда и выезда / срок проживания
- Количество взрослых, наличие детей
- Тип жилья (студия, 1-кк, 2-кк и т.д.)
- Район или ориентир (центр, метро, парк и т.п.)
- Особые пожелания: парковка, животные, курение, поздний/ранний заезд

─────────────────────────────────────────
СЦЕНАРИЙ 2 — ЭКСКУРСИИ, ПИТАНИЕ, МАРШРУТЫ
─────────────────────────────────────────
Если пользователь спрашивает про экскурсии, питание или интересные места:
- Коротко отреагируй по-человечески.
- Предложи перейти в раздел «Сервисы и полезное» на сайте.
- Уточни, не нужна ли заодно квартира.

─────────────────────────────────────────
СЦЕНАРИЙ 3 — ХОЗЯЕВАМ / ВСТУПЛЕНИЕ В СООБЩЕСТВО
─────────────────────────────────────────
Если пользователь интересуется вступлением в сообщество хозяев BFR:
- Кратко расскажи: BFR — это сообщество хозяев, работают напрямую с гостями, без сервисных сборов платформе.
- Направь: «Для регистрации перейдите в раздел Сообщество хозяев на сайте или напишите нам напрямую.»

─────────────────────────────────────────
СЦЕНАРИЙ 4 — ПЕРЕДАЧА АДМИНИСТРАТОРУ
─────────────────────────────────────────
Если пользователь хочет поговорить с человеком, или запрос сложный, или непонятно что нужно:
- Скажи: «Понял. Передаю вашу заявку администратору — с вами свяжутся в ближайшее время.»
- Добавь: «Можно также написать напрямую в Telegram или WhatsApp.»
- Признак передачи: включи в ответ фразу [TRANSFER_TO_ADMIN]

─────────────────────────────────────────
ЗАПРЕЩЕНО:
- Придумывать конкретные объекты или давать реальные адреса
- Называть точные цены (только диапазоны, если пользователь спросил)
- Обещать конкретные сроки ответа (только «в ближайшее время»)
- Отказываться помогать без объяснения
`;

/* ─── Telegram notification ────────────────────────────── */
async function notifyAdmin(text: string): Promise<void> {
  const { telegramBotToken, telegramChatId } = ADMIN_CONFIG;
  if (!telegramBotToken || !telegramChatId) {
    console.log("⚠️ Admin notification: Telegram not configured");
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("⚠️ Admin notify error:", err);
  }
}

/* ─── DB logging (best-effort, non-blocking) ────────────── */
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function ensureLogsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bronnik_logs (
      id SERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      topic TEXT,
      city TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// Run once on startup
ensureLogsTable().catch(e => console.warn("⚠️ bronnik_logs table init:", e));

async function logMessage(sessionId: string, role: string, content: string, topic?: string, city?: string): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO bronnik_logs (session_id, role, content, topic, city) VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, role, content, topic ?? null, city ?? null]
    );
  } catch {
    /* non-critical — don't break the chat */
  }
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/* ─── Routes ─────────────────────────────────────────────── */
export function registerBronnikRoutes(app: Express): void {
  /* Main chat endpoint */
  app.post("/api/bronnik/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [], city, topic } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      /* Generate or reuse session id */
      const sessionId = (req.headers["x-bronnik-session"] as string) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      res.setHeader("x-bronnik-session", sessionId);

      /* Build context prefix */
      const ctxParts: string[] = [];
      if (city) ctxParts.push(`Выбранный город: ${city}`);
      if (topic) ctxParts.push(`Выбранная тема: ${topic}`);
      const systemExtra = ctxParts.length ? `\n\nКонтекст из интерфейса: ${ctxParts.join(", ")}.` : "";

      const messages: ChatMessage[] = [
        { role: "system", content: BRONNIK_SYSTEM_PROMPT + systemExtra },
        ...history.slice(-12),
        { role: "user", content: message },
      ];

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("x-bronnik-session", sessionId);

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        stream: true,
        max_completion_tokens: 600,
      });

      let fullResponse = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();

      /* Post-stream: log + admin notify (non-blocking) */
      logMessage(sessionId, "user", message, topic, city).catch(() => {});
      logMessage(sessionId, "assistant", fullResponse, topic, city).catch(() => {});

      if (fullResponse.includes("[TRANSFER_TO_ADMIN]")) {
        const notifText =
          `🤖 <b>Бронник → передача администратору</b>\n\n` +
          `💬 Сообщение пользователя: ${message}\n\n` +
          `📋 История:\n${history.slice(-4).map((m: ChatMessage) => `${m.role === "user" ? "👤" : "🤖"} ${m.content}`).join("\n")}\n\n` +
          (city ? `📍 Город: ${city}\n` : "") +
          (topic ? `🏷 Тема: ${topic}\n` : "");
        notifyAdmin(notifText).catch(() => {});
      }
    } catch (error) {
      console.error("Bronnik chat error:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Произошла ошибка. Попробуйте позже." })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  /* Read logs — admin only, protected by token */
  app.get("/api/bronnik/logs", async (req: Request, res: Response) => {
    const token = req.headers["x-admin-token"];
    if (token !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ error: "Forbidden" });
    }
    try {
      const { rows } = await pool.query(
        `SELECT * FROM bronnik_logs ORDER BY created_at DESC LIMIT 200`
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });
}
