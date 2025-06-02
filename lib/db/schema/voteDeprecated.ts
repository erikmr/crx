import { pgTable, uuid, boolean, primaryKey } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { chat } from './chat';
import { messageDeprecated } from './messageDeprecated';

export const voteDeprecated = pgTable(
  'Vote',
  {
    chatId: uuid('chatId')
      .notNull()
      .references(() => chat.id),
    messageId: uuid('messageId')
      .notNull()
      .references(() => messageDeprecated.id),
    isUpvoted: boolean('isUpvoted').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type VoteDeprecated = InferSelectModel<typeof voteDeprecated>;
