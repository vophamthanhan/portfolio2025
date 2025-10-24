import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Portfolio projects table
export const projects = mysqlTable("projects", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  tags: text("tags"), // JSON array of tags
  category: varchar("category", { length: 100 }),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  sortOrder: varchar("sortOrder", { length: 10 }).default("0"),
  userId: varchar("userId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Profile/About section
export const profile = mysqlTable("profile", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull().unique(),
  fullName: varchar("fullName", { length: 255 }),
  title: varchar("title", { length: 255 }),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  profileImageUrl: text("profileImageUrl"),
  email: varchar("email", { length: 320 }),
  linkedin: varchar("linkedin", { length: 500 }),
  behance: varchar("behance", { length: 500 }),
  website: varchar("website", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = typeof profile.$inferInsert;

// Experience entries
export const experiences = mysqlTable("experiences", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  description: text("description"),
  startDate: varchar("startDate", { length: 50 }),
  endDate: varchar("endDate", { length: 50 }),
  current: mysqlEnum("current", ["yes", "no"]).default("no").notNull(),
  sortOrder: varchar("sortOrder", { length: 10 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = typeof experiences.$inferInsert;

// Education entries
export const education = mysqlTable("education", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  degree: varchar("degree", { length: 255 }).notNull(),
  field: varchar("field", { length: 255 }),
  startDate: varchar("startDate", { length: 50 }),
  endDate: varchar("endDate", { length: 50 }),
  sortOrder: varchar("sortOrder", { length: 10 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Education = typeof education.$inferSelect;
export type InsertEducation = typeof education.$inferInsert;

// Skills
export const skills = mysqlTable("skills", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }), // e.g., "hardskill", "softskill"
  sortOrder: varchar("sortOrder", { length: 10 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = typeof skills.$inferInsert;
