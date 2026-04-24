import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, verifyPassword, hashPassword } from "./storage";
import { insertApartmentRequestSchema, insertOwnerApplicationSchema, insertChatMessageSchema } from "@shared/schema";
import { insertChatUserSchema } from "@shared/schema";
import { registerBronnikRoutes } from "./bronnik";
import { setupChatWebSocket } from "./chat";

async function sendTelegramMessage(text: string): Promise<void> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) { console.log("⚠️ Telegram not configured"); return; }
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await response.json();
    if (!data.ok) console.log(`⚠️ Telegram API error: ${data.description}`);
    else console.log("✅ Telegram message sent");
  } catch (error) {
    console.log("⚠️ Error sending Telegram message:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  registerBronnikRoutes(app);

  // ── Apartment requests ───────────────────────────────────────────
  app.post("/api/apartment-requests", async (req, res) => {
    try {
      const validatedData = insertApartmentRequestSchema.parse(req.body);
      const request = await storage.createApartmentRequest(validatedData);
      const messengerLabel = request.messengerType === "telegram" ? "Telegram" : request.messengerType === "whatsapp" ? "WhatsApp" : "Макс";
      const message = `🏠 <b>Новая заявка!</b>\n👤 ${request.name}\n📞 ${request.phone}\n📍 ${request.location}\n💰 ${request.budget} ₽/сутки\n🛏 ${request.rooms}\n📅 ${request.moveInDate}–${request.moveOutDate}\n📬 ${messengerLabel}: ${request.messengerContact}${request.additionalInfo ? `\n📝 ${request.additionalInfo}` : ""}`;
      sendTelegramMessage(message).catch(console.error);
      const whatsappUrl = `https://wa.me/79899865887?text=${encodeURIComponent(`Здравствуйте! Заявка от ${request.name}, ${request.phone}, ${request.location}`)}`;
      res.json({ success: true, message: "Заявка успешно отправлена!", requestId: request.id, whatsappUrl });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Ошибка" });
    }
  });

  app.get("/api/apartment-requests", async (_req, res) => {
    try { res.json(await storage.getApartmentRequests()); }
    catch (error) { res.status(500).json({ success: false, message: "Ошибка" }); }
  });

  app.post("/api/owner-applications", async (req, res) => {
    try {
      const validatedData = insertOwnerApplicationSchema.parse(req.body);
      const application = await storage.createOwnerApplication(validatedData);
      const message = `🏠 <b>Новая заявка хозяина!</b>\n🌆 ${application.city}\n👤 ${application.name}\n📞 ${application.phone}\n🔗 ${application.listingUrl}${application.question ? `\n❓ ${application.question}` : ""}`;
      sendTelegramMessage(message).catch(console.error);
      const whatsappUrl = `https://wa.me/79213798941?text=${encodeURIComponent(`Здравствуйте! Хочу стать хозяином БФР. Город: ${application.city}, ${application.name}`)}`;
      res.json({ success: true, message: "Спасибо. Скоро с вами свяжемся.", applicationId: application.id, whatsappUrl });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Ошибка" });
    }
  });

  // ── Chat auth ────────────────────────────────────────────────────
  app.post("/api/chat/register", async (req, res) => {
    try {
      const data = insertChatUserSchema.parse(req.body);
      const user = await storage.createChatUser(data);
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, city: user.city, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Ошибка регистрации" });
    }
  });

  app.post("/api/chat/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ success: false, message: "Введите email и пароль" });
      const user = await storage.getChatUserByEmail(email);
      if (!user || !verifyPassword(password, user.passwordHash)) {
        return res.status(401).json({ success: false, message: "Неверный email или пароль" });
      }
      if (!user.isApproved) return res.status(403).json({ success: false, message: "Ваш аккаунт заблокирован" });
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, city: user.city, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  });

  // ── Chat rooms & messages (REST fallback) ────────────────────────
  app.get("/api/chat/rooms", async (_req, res) => {
    res.json(await storage.getChatRooms());
  });

  app.get("/api/chat/messages/:roomId", async (req, res) => {
    res.json(await storage.getChatMessages(req.params.roomId, 80));
  });

  // ── Chat admin ───────────────────────────────────────────────────
  app.get("/api/chat/users", async (_req, res) => {
    res.json(await storage.getChatUsers());
  });

  app.delete("/api/chat/messages/:messageId", async (req, res) => {
    await storage.deleteChatMessage(req.params.messageId);
    res.json({ success: true });
  });

  app.post("/api/chat/ban/:userId", async (req, res) => {
    await storage.banChatUser(req.params.userId);
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  setupChatWebSocket(httpServer);

  return httpServer;
}
