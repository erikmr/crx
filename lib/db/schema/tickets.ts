import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { user } from './user';

export const tickets = pgTable('tickets', {
  id_ticket: uuid('id_ticket').notNull().defaultRandom().primaryKey(),
  asunto: varchar('asunto', { length: 200 }).notNull(),
  descripcion: varchar('descripcion', { length: 400 }).notNull(),
  id_usuario_responsable: uuid('id_usuario_responsable').references(
    () => user.id,
  ),
});

export type Ticket = InferSelectModel<typeof tickets>;
