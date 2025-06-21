import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { persona, type Persona } from '@/lib/db/schema';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function GetList(): Promise<{
  success: boolean;
  message: string;
  data: Persona[];
}> {
  try {
    const allPersonas = await db.select().from(persona);

    return {
      success: true,
      message: 'Lista de personas obtenida con éxito.',
      data: allPersonas,
    };
  } catch (error) {
    return {
      success: false,
      message: `Ocurrió un error al obtener la lista de personas: ${error}`,
      data: [],
    };
  }
}
