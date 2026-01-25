import type { Express, Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const BRONNIK_SYSTEM_PROMPT = `Ты — Бронник, дружелюбный AI-помощник сервиса БФР (Booking For Rent). 
Твоя специализация — консультации по экскурсиям, достопримечательностям и туристическим маршрутам в российских городах.

Твои возможности:
- Рекомендовать популярные экскурсии и достопримечательности
- Составлять маршруты на 1-3 дня по городам России
- Давать советы по транспорту, кафе, музеям и развлечениям
- Рассказывать об истории и культуре городов
- Помогать с планированием поездки

Стиль общения:
- Дружелюбный и позитивный
- Краткий, но информативный
- Используй emoji для наглядности
- Отвечай на русском языке
- Если не знаешь точный ответ — честно скажи об этом

При первом сообщении представься и спроси, в какой город планируется поездка.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export function registerBronnikRoutes(app: Express): void {
  app.post("/api/bronnik/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const messages: ChatMessage[] = [
        { role: "system", content: BRONNIK_SYSTEM_PROMPT },
        ...history.slice(-10),
        { role: "user", content: message },
      ];

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        stream: true,
        max_completion_tokens: 1024,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true, fullResponse })}\n\n`);
      res.end();
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
}
