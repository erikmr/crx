import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import auditColumns from './auditColumns.helpers';

export const persona = pgTable('Personas', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  nombreRazonSocial: varchar('nombre_razon_social', { length: 200 }),
  rfc: varchar('rfc', { length: 13 }).unique(),
  tipoPersona: varchar('tipo_persona', { enum: ['fisica', 'moral'] })
    .notNull()
    .default('fisica'),
  ...auditColumns,
});

export type Persona = InferSelectModel<typeof persona>;
