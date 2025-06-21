import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { tipoPersonaType } from '@/lib/types';
import { persona, type Persona } from '@/lib/db/schema';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function Update({
  id,
  nombreRazonSocial,
  rfc,
  tipoPersona,
  updatedAt,
  updatedBy,
}: {
  id: string;
  nombreRazonSocial: string;
  rfc: string;
  tipoPersona: tipoPersonaType;
  updatedAt: Date;
  updatedBy: string;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const updatedPersonas = await db
      .update(persona)
      .set({
        nombreRazonSocial,
        rfc,
        tipoPersona,
        updatedAt,
        updatedBy,
      })
      .where(eq(persona.id, id))
      .returning();

    if (updatedPersonas.length === 0) {
      return {
        success: false,
        message: 'No se encontró la persona para actualizar.',
        data: [],
      };
    }

    return {
      success: true,
      message: 'Persona actualizada con éxito.',
      data: updatedPersonas,
    };
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    return {
      success: false,
      message: 'Ocurrió un error al procesar la solicitud.',
      data: [],
    };
  }
}
