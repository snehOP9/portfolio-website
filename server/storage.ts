import { db } from "./db";
import {
  messages,
  type InsertMessage,
  type Message
} from "@shared/schema";

export interface IStorage {
  createMessage(msg: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(msg: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(msg).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
