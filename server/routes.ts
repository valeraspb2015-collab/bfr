import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApartmentRequestSchema, insertOwnerApplicationSchema } from "@shared/schema";
import { registerBronnikRoutes } from "./bronnik";

async function sendTelegramMessage(text: string): Promise<void> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.log("⚠️ Telegram not configured - skipping notification");
      return;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

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
      console.log(`⚠️ Telegram API error: ${data.description}`);
    } else {
      console.log("✅ Message sent to Telegram successfully");
    }
  } catch (error) {
    console.log("⚠️ Error sending Telegram message:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register Bronnik AI assistant routes
  registerBronnikRoutes(app);

  app.post("/api/apartment-requests", async (req, res) => {
    try {
      // Валидация данных
      const validatedData = insertApartmentRequestSchema.parse(req.body);
      
      // Сохранение в базу данных
      const request = await storage.createApartmentRequest(validatedData);
      
      // Формирование сообщения для Telegram
      const messengerEmoji = request.messengerType === "telegram" ? "✈️" : request.messengerType === "whatsapp" ? "💬" : "📱";
      const messengerLabel = request.messengerType === "telegram" ? "Telegram" : request.messengerType === "whatsapp" ? "WhatsApp" : "Макс";

      const message = `
🏠 <b>Новая заявка на квартиру!</b>

👤 <b>Имя:</b> ${request.name}
📞 <b>Телефон:</b> ${request.phone}
📍 <b>Район:</b> ${request.location}
💰 <b>Бюджет:</b> ${request.budget} ₽/сутки
🛏 <b>Комнат:</b> ${request.rooms}
📅 <b>Дата заезда:</b> ${request.moveInDate}
📅 <b>Дата выезда:</b> ${request.moveOutDate}
${messengerEmoji} <b>Куда слать предложения (${messengerLabel}):</b> ${request.messengerContact}
${request.additionalInfo ? `\n📝 <b>Доп. информация:</b> ${request.additionalInfo}` : ''}

🆔 ID заявки: ${request.id}
      `.trim();

      // Отправка в Telegram (опционально, не блокирует работу)
      sendTelegramMessage(message).catch(err => 
        console.log("Failed to send Telegram message:", err)
      );

      // Формирование WhatsApp ссылки
      const whatsappNumber = "79899865887";
      const whatsappMessage = `Здравствуйте! Хочу подобрать квартиру через БФР.

Имя: ${request.name}
Телефон: ${request.phone}
Район: ${request.location}
Бюджет: ${request.budget} ₽/сутки
Комнат: ${request.rooms}
Дата заезда: ${request.moveInDate}
Дата выезда: ${request.moveOutDate}${request.additionalInfo ? `\nДополнительная информация: ${request.additionalInfo}` : ''}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      res.json({ 
        success: true, 
        message: "Заявка успешно отправлена!",
        requestId: request.id,
        whatsappUrl
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

  app.post("/api/owner-applications", async (req, res) => {
    try {
      const validatedData = insertOwnerApplicationSchema.parse(req.body);
      const application = await storage.createOwnerApplication(validatedData);
      
      const message = `
🏠 <b>Новая заявка от хозяина!</b>

🌆 <b>Город:</b> ${application.city}
👤 <b>Имя:</b> ${application.name}
📞 <b>Телефон:</b> ${application.phone}
🔗 <b>Ссылка на квартиру:</b> ${application.listingUrl}
${application.question ? `\n❓ <b>Вопрос:</b> ${application.question}` : ''}

🆔 ID заявки: ${application.id}
      `.trim();

      // Отправка в Telegram (опционально, не блокирует работу)
      sendTelegramMessage(message).catch(err => 
        console.log("Failed to send Telegram message:", err)
      );

      // Формирование WhatsApp ссылки
      const whatsappNumber = "79213798941";
      const whatsappMessage = `Здравствуйте! Хочу присоединиться к БФР как хозяин.

Город: ${application.city}
Имя: ${application.name}
Телефон: ${application.phone}
Ссылка на квартиру: ${application.listingUrl}${application.question ? `\nВопрос: ${application.question}` : ''}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      res.json({ 
        success: true, 
        message: "Спасибо. Скоро с вами свяжемся.",
        applicationId: application.id,
        whatsappUrl
      });
    } catch (error) {
      console.error("Error processing owner application:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Ошибка при отправке заявки" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
