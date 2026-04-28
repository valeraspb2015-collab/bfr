import {
  type User, type InsertUser,
  type ApartmentRequest, type InsertApartmentRequest,
  type OwnerApplication, type InsertOwnerApplication,
  type ChatUser, type InsertChatUser,
  type ChatRoom,
  type ChatMessage, type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { createHash } from "crypto";
import pg from "pg";
const { Pool } = pg;

function hashPassword(password: string): string {
  return createHash("sha256").update(password + "bfr_salt_2024").digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export { hashPassword };

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createApartmentRequest(request: InsertApartmentRequest): Promise<ApartmentRequest>;
  getApartmentRequests(): Promise<ApartmentRequest[]>;
  createOwnerApplication(application: InsertOwnerApplication): Promise<OwnerApplication>;
  getOwnerApplications(): Promise<OwnerApplication[]>;

  // Chat
  getChatUserByEmail(email: string): Promise<ChatUser | undefined>;
  getChatUserById(id: string): Promise<ChatUser | undefined>;
  createChatUser(data: InsertChatUser): Promise<ChatUser>;
  getChatRooms(): Promise<ChatRoom[]>;
  getChatMessages(roomId: string, limit?: number): Promise<(ChatMessage & { user: Pick<ChatUser, "id" | "name" | "city"> })[]>;
  createChatMessage(data: InsertChatMessage): Promise<ChatMessage & { user: Pick<ChatUser, "id" | "name" | "city"> }>;
  deleteChatMessage(messageId: string): Promise<void>;
  getChatUsers(): Promise<Pick<ChatUser, "id" | "name" | "email" | "city" | "isAdmin" | "createdAt">[]>;
  banChatUser(userId: string): Promise<void>;
}

// ── PostgreSQL Storage ────────────────────────────────────────────────────────

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function rowToChatUser(row: any): ChatUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    passwordHash: row.password_hash,
    isAdmin: row.is_admin,
    isApproved: row.is_approved,
    createdAt: new Date(row.created_at),
  };
}

function rowToChatRoom(row: any): ChatRoom {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? null,
    icon: row.icon,
    sortOrder: row.sort_order,
    createdAt: new Date(row.created_at),
  };
}

function rowToChatMessage(row: any): ChatMessage & { user: Pick<ChatUser, "id" | "name" | "city"> } {
  return {
    id: row.id,
    roomId: row.room_id,
    userId: row.user_id,
    text: row.text,
    deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
    createdAt: new Date(row.created_at),
    user: {
      id: row.user_id,
      name: row.user_name ?? "Удалённый",
      city: row.user_city ?? "",
    },
  };
}

export class DbStorage implements IStorage {

  // ── Generic users (legacy, not used by chat) ──────────────────────
  async getUser(id: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return res.rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const res = await pool.query(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [randomUUID(), insertUser.username, insertUser.password]
    );
    return res.rows[0];
  }

  // ── Apartment requests ────────────────────────────────────────────
  async createApartmentRequest(r: InsertApartmentRequest): Promise<ApartmentRequest> {
    const res = await pool.query(
      `INSERT INTO apartment_requests
        (id, name, phone, location, budget, rooms, move_in_date, move_out_date, additional_info, messenger_type, messenger_contact, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'new',NOW()) RETURNING *`,
      [randomUUID(), r.name, r.phone, r.location, r.budget, r.rooms,
       r.moveInDate, r.moveOutDate, r.additionalInfo ?? null,
       r.messengerType, r.messengerContact]
    );
    const row = res.rows[0];
    return {
      id: row.id, name: row.name, phone: row.phone, location: row.location,
      budget: row.budget, rooms: row.rooms, moveInDate: row.move_in_date,
      moveOutDate: row.move_out_date, additionalInfo: row.additional_info,
      messengerType: row.messenger_type, messengerContact: row.messenger_contact,
      status: row.status, createdAt: new Date(row.created_at),
    };
  }

  async getApartmentRequests(): Promise<ApartmentRequest[]> {
    const res = await pool.query("SELECT * FROM apartment_requests ORDER BY created_at DESC");
    return res.rows.map(row => ({
      id: row.id, name: row.name, phone: row.phone, location: row.location,
      budget: row.budget, rooms: row.rooms, moveInDate: row.move_in_date,
      moveOutDate: row.move_out_date, additionalInfo: row.additional_info,
      messengerType: row.messenger_type, messengerContact: row.messenger_contact,
      status: row.status, createdAt: new Date(row.created_at),
    }));
  }

  // ── Owner applications ────────────────────────────────────────────
  async createOwnerApplication(a: InsertOwnerApplication): Promise<OwnerApplication> {
    const res = await pool.query(
      `INSERT INTO owner_applications (id, city, name, phone, listing_url, question, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,'new',NOW()) RETURNING *`,
      [randomUUID(), a.city, a.name, a.phone, a.listingUrl, a.question ?? null]
    );
    const row = res.rows[0];
    return {
      id: row.id, city: row.city, name: row.name, phone: row.phone,
      listingUrl: row.listing_url, question: row.question,
      status: row.status, createdAt: new Date(row.created_at),
    };
  }

  async getOwnerApplications(): Promise<OwnerApplication[]> {
    const res = await pool.query("SELECT * FROM owner_applications ORDER BY created_at DESC");
    return res.rows.map(row => ({
      id: row.id, city: row.city, name: row.name, phone: row.phone,
      listingUrl: row.listing_url, question: row.question,
      status: row.status, createdAt: new Date(row.created_at),
    }));
  }

  // ── Chat users ────────────────────────────────────────────────────
  async getChatUserByEmail(email: string): Promise<ChatUser | undefined> {
    const res = await pool.query("SELECT * FROM chat_users WHERE email = $1", [email.toLowerCase()]);
    return res.rows[0] ? rowToChatUser(res.rows[0]) : undefined;
  }

  async getChatUserById(id: string): Promise<ChatUser | undefined> {
    const res = await pool.query("SELECT * FROM chat_users WHERE id = $1", [id]);
    return res.rows[0] ? rowToChatUser(res.rows[0]) : undefined;
  }

  async createChatUser(data: InsertChatUser): Promise<ChatUser> {
    const existing = await this.getChatUserByEmail(data.email);
    if (existing) throw new Error("Пользователь с таким email уже зарегистрирован");
    const res = await pool.query(
      `INSERT INTO chat_users (id, name, email, phone, city, password_hash, is_admin, is_approved, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,false,true,NOW()) RETURNING *`,
      [randomUUID(), data.name, data.email.toLowerCase(), data.phone,
       data.city ?? "", hashPassword(data.password)]
    );
    return rowToChatUser(res.rows[0]);
  }

  async getChatUsers(): Promise<Pick<ChatUser, "id" | "name" | "email" | "city" | "isAdmin" | "createdAt">[]> {
    const res = await pool.query("SELECT id, name, email, city, is_admin, created_at FROM chat_users ORDER BY created_at DESC");
    return res.rows.map(row => ({
      id: row.id, name: row.name, email: row.email, city: row.city,
      isAdmin: row.is_admin, createdAt: new Date(row.created_at),
    }));
  }

  async banChatUser(userId: string): Promise<void> {
    await pool.query("UPDATE chat_users SET is_approved = false WHERE id = $1", [userId]);
  }

  // ── Chat rooms ────────────────────────────────────────────────────
  async getChatRooms(): Promise<ChatRoom[]> {
    const res = await pool.query("SELECT * FROM chat_rooms ORDER BY sort_order ASC");
    return res.rows.map(rowToChatRoom);
  }

  async seedChatRooms(): Promise<void> {
    const existing = await pool.query("SELECT COUNT(*) FROM chat_rooms");
    if (parseInt(existing.rows[0].count) > 0) return;
    const rooms = [
      { id: "room-requests", slug: "requests", name: "Заявки любые", description: "Заявки и предложения от хозяев", icon: "ClipboardList", sortOrder: 0 },
      { id: "room-chat",     slug: "chat",     name: "Болталка",             description: "Свободное общение",                icon: "Coffee",         sortOrder: 1 },
      { id: "room-staff",    slug: "staff",    name: "Горничные и мастера",  description: "Поиск персонала и мастеров",        icon: "Wrench",         sortOrder: 2 },
      { id: "room-blacklist",slug: "blacklist",name: "Черный список",        description: "Проблемные гости и ситуации",       icon: "UserX",          sortOrder: 3 },
      { id: "room-useful",   slug: "useful",   name: "Полезное",             description: "Советы, лайфхаки, ресурсы",        icon: "Bookmark",       sortOrder: 4 },
      { id: "room-news",     slug: "news",     name: "Новости BFR",          description: "Обновления платформы",              icon: "Newspaper",      sortOrder: 5 },
    ];
    for (const r of rooms) {
      await pool.query(
        `INSERT INTO chat_rooms (id, slug, name, description, icon, sort_order, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,NOW()) ON CONFLICT (id) DO NOTHING`,
        [r.id, r.slug, r.name, r.description, r.icon, r.sortOrder]
      );
    }
  }

  // ── Chat messages ─────────────────────────────────────────────────
  async getChatMessages(roomId: string, limit = 80): Promise<(ChatMessage & { user: Pick<ChatUser, "id" | "name" | "city"> })[]> {
    const res = await pool.query(
      `SELECT m.*, u.name AS user_name, u.city AS user_city
       FROM chat_messages m
       LEFT JOIN chat_users u ON u.id = m.user_id
       WHERE m.room_id = $1 AND m.deleted_at IS NULL
       ORDER BY m.created_at ASC
       LIMIT $2`,
      [roomId, limit]
    );
    return res.rows.map(rowToChatMessage);
  }

  async createChatMessage(data: InsertChatMessage): Promise<ChatMessage & { user: Pick<ChatUser, "id" | "name" | "city"> }> {
    const res = await pool.query(
      `INSERT INTO chat_messages (id, room_id, user_id, text, created_at)
       VALUES ($1,$2,$3,$4,NOW()) RETURNING *`,
      [randomUUID(), data.roomId, data.userId, data.text]
    );
    const row = res.rows[0];
    const user = await this.getChatUserById(data.userId);
    return {
      id: row.id, roomId: row.room_id, userId: row.user_id, text: row.text,
      deletedAt: null, createdAt: new Date(row.created_at),
      user: { id: data.userId, name: user?.name ?? "Удалённый", city: user?.city ?? "" },
    };
  }

  async deleteChatMessage(messageId: string): Promise<void> {
    await pool.query("UPDATE chat_messages SET deleted_at = NOW() WHERE id = $1", [messageId]);
  }
}

export const storage = new DbStorage();
