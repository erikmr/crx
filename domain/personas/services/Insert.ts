import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { tipoPersonaType } from '@/lib/types';
import { ChatSDKError } from '@/lib/errors';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

import { persona } from '@/lib/db/schema';
export async function Insert({
  nombreRazonSocial,
  rfc,
  tipoPersona,
  createdAt,
  createdBy,
}: {
  nombreRazonSocial: string;
  rfc: string;
  tipoPersona: tipoPersonaType;
  createdAt: Date;
  createdBy: string;
}): Promise<{ id: string }> {
  try {
    const existingPersona = await db
      .select({ id: persona.id })
      .from(persona)
      .where(eq(persona.rfc, rfc));

    if (existingPersona.length > 0) {
      return { id: '0' };
      // throw new ChatSDKError(
      //   'bad_request:personas',
      //   'La persona con el RFC proporcionado ya existe.',
      // );
    }

    const result = await db
      .insert(persona)
      .values({
        nombreRazonSocial,
        rfc,
        tipoPersona,
        createdAt,
        createdBy,
      })
      .returning({ id: persona.id });

    return result[0];
  } catch (error) {
    if (error instanceof ChatSDKError) {
      throw error;
    }
    // Log the original error for debugging purposes
    console.error('Error inserting persona:', error);
    throw new ChatSDKError(
      'bad_request:database',
      'Ocurrió un error al intentar guardar la persona.',
    );
  }
}
