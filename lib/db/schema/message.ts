import { pgTable, uuid, varchar, json, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { chat } from './chat';

export const message = pgTable('Message_v2', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  parts: json('parts').notNull(),
  attachments: json('attachments').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;
