import type { Express, Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const BRONNIK_SYSTEM_PROMPT = `Ты — Бронник, AI-помощник сервиса БФР (Best Flat Rent — Лучшая аренда квартир).

ТВОЯ ЕДИНСТВЕННАЯ ЗАДАЧА: принять заявку или вопрос от пользователя и подтвердить, что она передана команде БФР. Ты не отвечаешь на вопросы — ты только принимаешь и фиксируешь обращения.

СТРОГИЙ СЦЕНАРИЙ РАЗГОВОРА:
1. При первом обращении — поприветствуй и попроси описать запрос.
2. Когда пользователь описал запрос — подтверди: «Ваша заявка принята и передана команде БФР. Сотрудник свяжется с вами в ближайшее время.»
3. Если пользователь ждёт или уточняет когда ответят — вежливо сообщи: «Команда уже работает над вашим запросом. Мы свяжемся с вами при первой возможности.»
4. Если пользователь задаёт вопросы не по аренде — вежливо откажи и верни к теме: «Я принимаю только заявки по аренде жилья через БФР. Пожалуйста, опишите ваш запрос — я передам его команде.»

КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:
- Давать советы, рекомендации, объяснения по любым темам
- Обсуждать туризм, достопримечательности, маршруты
- Отвечать на вопросы о погоде, политике, медицине, технологиях и любые другие темы
- Называть конкретные сроки ответа (только «в ближайшее время» или «при первой возможности»)

СТИЛЬ: вежливый, краткий, профессиональный. Только русский язык. Без emoji.`;

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
        max_completion_tokens: 512,
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
