import { timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';
// columns.helpers.ts
const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => user.id),
  updatedAt: timestamp('updated_at'),
  updatedBy: uuid('updated_by').references(() => user.id),
  deletedAt: timestamp('deleted_at'),
  deletedBy: uuid('deleted_by').references(() => user.id),
};

export default timestamps;
