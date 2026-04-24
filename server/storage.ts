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

const DEFAULT_ROOMS: ChatRoom[] = [
  { id: "room-general", slug: "general", name: "Общий чат", description: "Общение всех хозяев", icon: "MessageSquare", sortOrder: 0, createdAt: new Date() },
  { id: "room-legal", slug: "legal", name: "Юридические вопросы", description: "Договоры, налоги, законы", icon: "Scale", sortOrder: 1, createdAt: new Date() },
  { id: "room-pricing", slug: "pricing", name: "Цены и сезон", description: "Ставки, скидки, сезонность", icon: "TrendingUp", sortOrder: 2, createdAt: new Date() },
  { id: "room-setup", slug: "setup", name: "Обустройство", description: "Ремонт, мебель, оснащение", icon: "Sofa", sortOrder: 3, createdAt: new Date() },
  { id: "room-news", slug: "news", name: "Новости BFR", description: "Обновления платформы", icon: "Bell", sortOrder: 4, createdAt: new Date() },
];

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private apartmentRequests: Map<string, ApartmentRequest> = new Map();
  private ownerApplications: Map<string, OwnerApplication> = new Map();
  private chatUsers: Map<string, ChatUser> = new Map();
  private chatRooms: Map<string, ChatRoom> = new Map();
  private chatMessages: Map<string, ChatMessage> = new Map();

  constructor() {
    DEFAULT_ROOMS.forEach(r => this.chatRooms.set(r.id, r));

    // seed admin user
    const adminId = randomUUID();
    this.chatUsers.set(adminId, {
      id: adminId,
      name: "Администратор BFR",
      email: "admin@bfr.su",
      phone: "+70000000000",
      city: "Москва",
      passwordHash: hashPassword("admin123"),
      isAdmin: true,
      isApproved: true,
      createdAt: new Date(),
    });
  }

  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createApartmentRequest(insertRequest: InsertApartmentRequest): Promise<ApartmentRequest> {
    const id = randomUUID();
    const request: ApartmentRequest = {
      ...insertRequest,
      id, status: "new", createdAt: new Date(),
      additionalInfo: insertRequest.additionalInfo ?? null,
    };
    this.apartmentRequests.set(id, request);
    return request;
  }
  async getApartmentRequests(): Promise<ApartmentRequest[]> {
    return Array.from(this.apartmentRequests.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createOwnerApplication(insertApplication: InsertOwnerApplication): Promise<OwnerApplication> {
    const id = randomUUID();
    const application: OwnerApplication = {
      ...insertApplication,
      id, status: "new", createdAt: new Date(),
      question: insertApplication.question ?? null,
    };
    this.ownerApplications.set(id, application);
    return application;
  }
  async getOwnerApplications(): Promise<OwnerApplication[]> {
    return Array.from(this.ownerApplications.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // ── Chat ─────────────────────────────────────────────────────────
  async getChatUserByEmail(email: string) {
    return Array.from(this.chatUsers.values()).find(u => u.email === email.toLowerCase());
  }
  async getChatUserById(id: string) { return this.chatUsers.get(id); }

  async createChatUser(data: InsertChatUser): Promise<ChatUser> {
    const existing = await this.getChatUserByEmail(data.email);
    if (existing) throw new Error("Пользователь с таким email уже зарегистрирован");
    const id = randomUUID();
    const user: ChatUser = {
      id,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      city: data.city ?? "",
      passwordHash: hashPassword(data.password),
      isAdmin: false,
      isApproved: true,
      createdAt: new Date(),
    };
    this.chatUsers.set(id, user);
    return user;
  }

  async getChatRooms(): Promise<ChatRoom[]> {
    return Array.from(this.chatRooms.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  private enrichMessage(msg: ChatMessage) {
    const user = this.chatUsers.get(msg.userId);
    return {
      ...msg,
      user: { id: msg.userId, name: user?.name ?? "Удалённый", city: user?.city ?? "" },
    };
  }

  async getChatMessages(roomId: string, limit = 80) {
    return Array.from(this.chatMessages.values())
      .filter(m => m.roomId === roomId && !m.deletedAt)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .slice(-limit)
      .map(m => this.enrichMessage(m));
  }

  async createChatMessage(data: InsertChatMessage) {
    const id = randomUUID();
    const msg: ChatMessage = { ...data, id, deletedAt: null, createdAt: new Date() };
    this.chatMessages.set(id, msg);
    return this.enrichMessage(msg);
  }

  async deleteChatMessage(messageId: string) {
    const msg = this.chatMessages.get(messageId);
    if (msg) this.chatMessages.set(messageId, { ...msg, deletedAt: new Date() });
  }

  async getChatUsers() {
    return Array.from(this.chatUsers.values()).map(({ id, name, email, city, isAdmin, createdAt }) => ({ id, name, email, city, isAdmin, createdAt }));
  }

  async banChatUser(userId: string) {
    const user = this.chatUsers.get(userId);
    if (user) this.chatUsers.set(userId, { ...user, isApproved: false });
  }
}

export const storage = new MemStorage();
