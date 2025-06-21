import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { tipoPersonaType } from '@/lib/types';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

import { persona, type Persona } from '@/lib/db/schema';
// import { Persona } from '@/domain/personas/Persona';
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
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const existingPersonas = await db
      .select()
      .from(persona)
      .where(eq(persona.rfc, rfc));

    if (existingPersonas.length > 0) {
      return {
        success: false,
        message: 'La persona con el RFC proporcionado ya existe.',
        data: existingPersonas,
      };
    }

    const newPersonas = await db
      .insert(persona)
      .values({
        nombreRazonSocial,
        rfc,
        tipoPersona,
        createdAt,
        createdBy,
      })
      .returning();

    return {
      success: true,
      message: 'Persona creada con éxito.',
      data: newPersonas,
    };
  } catch (error) {
    console.error('Error al insertar persona:', error);
    return {
      success: false,
      message: 'Ocurrió un error al procesar la solicitud.',
      data: [],
    };
  }
}
