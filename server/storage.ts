import { type User, type InsertUser, type AttendanceDocument, type InsertAttendanceDocument } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, attendanceDocuments } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAttendanceDocument(doc: InsertAttendanceDocument): Promise<AttendanceDocument>;
  getAttendanceDocumentsByStudent(studentId: string): Promise<AttendanceDocument[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private attendanceDocuments: Map<string, AttendanceDocument>;

  constructor() {
    this.users = new Map();
    this.attendanceDocuments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, department: insertUser.department ?? null };
    this.users.set(id, user);
    return user;
  }

  async createAttendanceDocument(insertDoc: InsertAttendanceDocument): Promise<AttendanceDocument> {
    const id = randomUUID();
    const doc: AttendanceDocument = { ...insertDoc, id, uploadedAt: new Date() };
    this.attendanceDocuments.set(id, doc);
    return doc;
  }

  async getAttendanceDocumentsByStudent(studentId: string): Promise<AttendanceDocument[]> {
    return Array.from(this.attendanceDocuments.values()).filter(doc => doc.studentId === studentId);
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
      department: insertUser.department ?? null,
    }).returning();
    return result[0];
  }

  async createAttendanceDocument(insertDoc: InsertAttendanceDocument): Promise<AttendanceDocument> {
    const result = await db.insert(attendanceDocuments).values(insertDoc).returning();
    return result[0];
  }

  async getAttendanceDocumentsByStudent(studentId: string): Promise<AttendanceDocument[]> {
    return await db.select().from(attendanceDocuments).where(eq(attendanceDocuments.studentId, studentId));
  }

  async validatePassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export const storage = new MemStorage();
