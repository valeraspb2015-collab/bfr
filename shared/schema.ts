import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const apartmentRequests = pgTable("apartment_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  budget: text("budget").notNull(),
  rooms: text("rooms").notNull(),
  moveInDate: text("move_in_date").notNull(),
  moveOutDate: text("move_out_date").notNull(),
  additionalInfo: text("additional_info"),
  messengerType: text("messenger_type").notNull(),
  messengerContact: text("messenger_contact").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertApartmentRequestSchema = createInsertSchema(apartmentRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertApartmentRequest = z.infer<typeof insertApartmentRequestSchema>;
export type ApartmentRequest = typeof apartmentRequests.$inferSelect;

export const ownerApplications = pgTable("owner_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  city: text("city").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  listingUrl: text("listing_url").notNull(),
  question: text("question"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOwnerApplicationSchema = createInsertSchema(ownerApplications).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertOwnerApplication = z.infer<typeof insertOwnerApplicationSchema>;
export type OwnerApplication = typeof ownerApplications.$inferSelect;

// ── COMMUNITY CHAT ──────────────────────────────────────────────────

export const chatUsers = pgTable("chat_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  city: text("city").notNull().default(""),
  passwordHash: text("password_hash").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  isApproved: boolean("is_approved").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatUserSchema = createInsertSchema(chatUsers).omit({
  id: true,
  isAdmin: true,
  isApproved: true,
  createdAt: true,
  passwordHash: true,
}).extend({
  password: z.string().min(6, "Минимум 6 символов"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(10, "Введите номер телефона"),
  name: z.string().min(2, "Введите имя"),
});

export type InsertChatUser = z.infer<typeof insertChatUserSchema>;
export type ChatUser = typeof chatUsers.$inferSelect;

export const chatRooms = pgTable("chat_rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").notNull().default("MessageSquare"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ChatRoom = typeof chatRooms.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").notNull(),
  userId: varchar("user_id").notNull(),
  text: text("text").notNull(),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  deletedAt: true,
  createdAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export * from "./models/chat";
