import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { persona, type Persona } from '@/lib/db/schema';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function Delete({
  id,
  deletedAt,
  deletedBy,
}: {
  id: string;
  deletedAt: Date;
  deletedBy: string;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    // Soft delete: actualiza los campos deletedAt y deletedBy
    const deletedPersonas = await db
      .update(persona)
      .set({
        deletedAt,
        deletedBy,
      })
      .where(eq(persona.id, id))
      .returning();

    if (deletedPersonas.length === 0) {
      return {
        success: false,
        message: 'No se encontró la persona para eliminar.',
        data: [],
      };
    }

    return {
      success: true,
      message: 'Persona eliminada con éxito (soft delete).',
      data: deletedPersonas,
    };
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    return {
      success: false,
      message: 'Ocurrió un error al procesar la solicitud.',
      data: [],
    };
  }
}
