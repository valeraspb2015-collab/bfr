import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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
  additionalInfo: text("additional_info"),
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
