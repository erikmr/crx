import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { persona, type Persona } from '@/lib/db/schema';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function GetById({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const foundPersonas = await db
      .select()
      .from(persona)
      .where(eq(persona.id, id));

    if (foundPersonas.length === 0) {
      return {
        success: false,
        message: 'No se encontró la persona.',
        data: [],
      };
    }

    return {
      success: true,
      message: 'Persona encontrada.',
      data: foundPersonas,
    };
  } catch (error) {
    return {
      success: false,
      message: `Ocurrió un error al obtener la persona: ${error}`,
      data: [],
    };
  }
}
