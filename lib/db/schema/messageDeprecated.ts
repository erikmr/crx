import { pgTable, uuid, varchar, json, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { chat } from './chat';

export const messageDeprecated = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  content: json('content').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export type MessageDeprecated = InferSelectModel<typeof messageDeprecated>;
