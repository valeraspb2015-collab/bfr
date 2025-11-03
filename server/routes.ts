import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApartmentRequestSchema } from "@shared/schema";

async function sendTelegramMessage(text: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN not configured");
  }

  // Получаем chat_id бота (обычно это ваш личный chat_id или chat_id группы)
  // Для начала отправим в сам бот, чтобы получить chat_id
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  // Сначала получим обновления, чтобы найти chat_id
  const updatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
  const updatesResponse = await fetch(updatesUrl);
  const updatesData = await updatesResponse.json();
  
  let chatId = null;
  if (updatesData.ok && updatesData.result.length > 0) {
    // Берем последний chat_id из обновлений
    chatId = updatesData.result[updatesData.result.length - 1]?.message?.chat?.id;
  }
  
  if (!chatId) {
    console.log("Chat ID not found. Please send any message to the bot first.");
    // Используем тестовый chat_id или выбрасываем ошибку
    throw new Error("Chat ID not found. Send a message to @bfrreplit_bot first to initialize chat.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/apartment-requests", async (req, res) => {
    try {
      // Валидация данных
      const validatedData = insertApartmentRequestSchema.parse(req.body);
      
      // Сохранение в базу данных
      const request = await storage.createApartmentRequest(validatedData);
      
      // Формирование сообщения для Telegram
      const message = `
🏠 <b>Новая заявка на квартиру!</b>

👤 <b>Имя:</b> ${request.name}
📞 <b>Телефон:</b> ${request.phone}
📍 <b>Район:</b> ${request.location}
💰 <b>Бюджет:</b> ${request.budget} ₽/сутки
🛏 <b>Комнат:</b> ${request.rooms}
📅 <b>Дата заезда:</b> ${request.moveInDate}
${request.additionalInfo ? `\n📝 <b>Доп. информация:</b> ${request.additionalInfo}` : ''}

🆔 ID заявки: ${request.id}
      `.trim();

      // Отправка в Telegram
      await sendTelegramMessage(message);
      
      res.json({ 
        success: true, 
        message: "Заявка успешно отправлена!",
        requestId: request.id 
      });
    } catch (error) {
      console.error("Error processing apartment request:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Ошибка при отправке заявки" 
      });
    }
  });

  app.get("/api/apartment-requests", async (req, res) => {
    try {
      const requests = await storage.getApartmentRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching apartment requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Ошибка при получении заявок" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
