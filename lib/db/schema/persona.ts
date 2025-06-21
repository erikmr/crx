import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import timestamps from './columns.helpers';

export const persona = pgTable('Personas', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  nombreRazonSocial: varchar('nombre_razon_social', { length: 200 }),
  rfc: varchar('rfc', { length: 13 }),
  tipoPersona: varchar('tipo_persona', { enum: ['fisica', 'moral'] })
    .notNull()
    .default('fisica'),
  ...timestamps,
});

export type Persona = InferSelectModel<typeof persona>;
