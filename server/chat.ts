import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import { storage } from "./storage";

interface WsClient {
  ws: WebSocket;
  userId: string;
  name: string;
  city: string;
  roomId: string;
}

const clients = new Set<WsClient>();

function broadcast(roomId: string, payload: object, excludeWs?: WebSocket) {
  const data = JSON.stringify(payload);
  for (const client of clients) {
    if (client.roomId === roomId && client.ws !== excludeWs && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  }
}

function sendOnlineCount(roomId: string) {
  const count = Array.from(clients).filter(c => c.roomId === roomId).length;
  const data = JSON.stringify({ type: "online_count", roomId, count });
  for (const client of clients) {
    if (client.roomId === roomId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  }
}

export function setupChatWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws/chat" });

  wss.on("connection", (ws) => {
    let client: WsClient | null = null;

    ws.on("message", async (raw) => {
      try {
        const msg = JSON.parse(raw.toString());

        if (msg.type === "join") {
          const user = await storage.getChatUserById(msg.userId);
          if (!user || !user.isApproved) {
            ws.send(JSON.stringify({ type: "error", text: "Доступ запрещён" }));
            ws.close();
            return;
          }
          client = { ws, userId: user.id, name: user.name, city: user.city, roomId: msg.roomId };
          clients.add(client);

          const history = await storage.getChatMessages(msg.roomId, 80);
          ws.send(JSON.stringify({ type: "history", messages: history }));
          sendOnlineCount(msg.roomId);

          broadcast(msg.roomId, {
            type: "system",
            text: `${user.name} вошёл в чат`,
            ts: new Date().toISOString(),
          }, ws);
          return;
        }

        if (msg.type === "switch_room" && client) {
          const oldRoom = client.roomId;
          client.roomId = msg.roomId;
          sendOnlineCount(oldRoom);

          const history = await storage.getChatMessages(msg.roomId, 80);
          ws.send(JSON.stringify({ type: "history", messages: history }));
          sendOnlineCount(msg.roomId);
          return;
        }

        if (msg.type === "message" && client) {
          const text = (msg.text ?? "").trim();
          if (!text || text.length > 2000) return;

          const saved = await storage.createChatMessage({
            roomId: client.roomId,
            userId: client.userId,
            text,
          });

          const payload = { type: "message", message: saved };
          ws.send(JSON.stringify(payload));
          broadcast(client.roomId, payload, ws);
          return;
        }

        if (msg.type === "delete" && client) {
          const chatUser = await storage.getChatUserById(client.userId);
          if (!chatUser?.isAdmin) return;
          await storage.deleteChatMessage(msg.messageId);
          broadcast(client.roomId, { type: "deleted", messageId: msg.messageId });
          ws.send(JSON.stringify({ type: "deleted", messageId: msg.messageId }));
          return;
        }

      } catch (e) {
        console.error("WS error:", e);
      }
    });

    ws.on("close", () => {
      if (client) {
        const roomId = client.roomId;
        clients.delete(client);
        sendOnlineCount(roomId);
      }
    });
  });

  console.log("✅ Chat WebSocket ready at /ws/chat");
}
