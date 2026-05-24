import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";

// =========================
// USERS TABLE
// =========================
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("image_url").notNull(),
  credits: integer("credits").default(3),
});

// =========================
// AI GENERATED IMAGE TABLE
// =========================
export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: serial("id").primaryKey(),

  roomType: varchar("room_type").notNull(),
  designType: varchar("design_type").notNull(),

  orgImage: varchar("org_image").notNull(),
  aiImage: varchar("ai_image").notNull(),

  userEmail: varchar("user_email"),
});