
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { tipoPersonaType } from '@/lib/types';
import { persona, type Persona } from '@/lib/db/schema';
import { auth } from '@/app/(auth)/auth';
import { getTimezoneOffset } from 'date-fns-tz';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function Insert({
  nombreRazonSocial,
  rfc,
  tipoPersona,
}: {
  nombreRazonSocial: string;
  rfc: string;
  tipoPersona: tipoPersonaType;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('No se encontró la sesión del usuario.');
    }
    const createdBy = session.user.id;

    const timeZone = 'America/Mexico_City';
    const now = new Date();
    const createdAt = new Date(now.getTime() + getTimezoneOffset(timeZone, now));

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
    return {
      success: false,
      message: `Ocurrió un error al insertar la persona: ${error}`,
      data: [],
    };
  }
}
