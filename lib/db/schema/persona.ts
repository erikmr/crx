import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

export const persona = pgTable('Persona', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  nombreRazonSocial: varchar('nombreRazonSocial', { length: 200 }),
  rfc: varchar('rfc', { length: 13 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Persona = InferSelectModel<typeof persona>;
