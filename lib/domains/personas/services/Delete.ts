import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { persona, type Persona } from '@/lib/db/schema';
import { auth } from '@/app/(auth)/auth';
import { getTimezoneOffset } from 'date-fns-tz';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function Delete({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('No se encontró la sesión del usuario.');
    }
    const deletedBy = session.user.id;

    const timeZone = 'America/Mexico_City';
    const now = new Date();
    const deletedAt = new Date(now.getTime() + getTimezoneOffset(timeZone, now));
    const isDeleted = true;

    // Soft delete: actualiza los campos deletedAt y deletedBy
    const deletedPersonas = await db
      .update(persona)
      .set({
        deletedAt,
        deletedBy,
        isDeleted,
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
    return {
      success: false,
      message: `Ocurrió un error al eliminar la persona: ${error}`,
      data: [],
    };
  }
}
