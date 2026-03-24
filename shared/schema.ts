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

export * from "./models/chat";
