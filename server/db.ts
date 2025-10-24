import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Portfolio queries
export async function getProjects(userId?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { projects } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  
  let query = db.select().from(projects);
  if (userId) {
    query = query.where(eq(projects.userId, userId)) as any;
  }
  
  return query.orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const { projects } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProject(project: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { projects } = await import("../drizzle/schema");
  await db.insert(projects).values(project);
  return project;
}

export async function updateProject(id: string, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { projects } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { projects } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.delete(projects).where(eq(projects.id, id));
}

// Profile queries
export async function getProfile(userId: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const { profile } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const result = await db.select().from(profile).where(eq(profile.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertProfile(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { profile } = await import("../drizzle/schema");
  
  await db.insert(profile).values(data).onDuplicateKeyUpdate({
    set: data,
  });
}

// Experience queries
export async function getExperiences(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { experiences } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  
  return db.select().from(experiences).where(eq(experiences.userId, userId)).orderBy(desc(experiences.startDate));
}

export async function createExperience(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { experiences } = await import("../drizzle/schema");
  await db.insert(experiences).values(data);
}

export async function updateExperience(id: string, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { experiences } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.update(experiences).set(data).where(eq(experiences.id, id));
}

export async function deleteExperience(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { experiences } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.delete(experiences).where(eq(experiences.id, id));
}

// Education queries
export async function getEducation(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { education } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  
  return db.select().from(education).where(eq(education.userId, userId)).orderBy(desc(education.startDate));
}

export async function createEducation(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { education } = await import("../drizzle/schema");
  await db.insert(education).values(data);
}

export async function updateEducation(id: string, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { education } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.update(education).set(data).where(eq(education.id, id));
}

export async function deleteEducation(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { education } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.delete(education).where(eq(education.id, id));
}

// Skills queries
export async function getSkills(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { skills } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  return db.select().from(skills).where(eq(skills.userId, userId));
}

export async function createSkill(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { skills } = await import("../drizzle/schema");
  await db.insert(skills).values(data);
}

export async function deleteSkill(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { skills } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.delete(skills).where(eq(skills.id, id));
}

// Get first user (portfolio owner)
export async function getOwner() {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
