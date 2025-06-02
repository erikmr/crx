import { pgEnum } from 'drizzle-orm/pg-core';

export const tipoPersona = pgEnum('tipo_persona', [
  'persona_fisica',
  'persona_moral',
]);
