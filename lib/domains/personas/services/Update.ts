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

export async function Update({
  id,
  nombreRazonSocial,
  rfc,
  tipoPersona,
}: {
  id: string;
  nombreRazonSocial: string;
  rfc: string;
  tipoPersona: tipoPersonaType;
}): Promise<{ success: boolean; message: string; data: Persona[] }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'No se encontró la sesión del usuario.',
        data: [],
      };
    }
    const updatedBy = session.user.id;

    const dataToUpdate: { [key: string]: any } = {};
    const timeZone = 'America/Mexico_City';
    const now = new Date();
    const updatedAt = new Date(now.getTime() + getTimezoneOffset(timeZone, now));

    // Construir el objeto de actualización solo con las propiedades que tienen valor
    if (nombreRazonSocial) {
      dataToUpdate.nombreRazonSocial = nombreRazonSocial;
    }
    if (rfc) {
      dataToUpdate.rfc = rfc;
    }
    if (tipoPersona) {
      dataToUpdate.tipoPersona = tipoPersona;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return {
        success: false,
        message: 'No se proporcionaron datos para actualizar.',
        data: [],
      };
    }

    // Siempre se actualizan los campos de auditoría
    dataToUpdate.updatedAt = updatedAt;
    dataToUpdate.updatedBy = updatedBy;

    const updatedPersonas = await db
      .update(persona)
      .set(dataToUpdate)
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
    return {
      success: false,
      message: `Ocurrió un error al actualizar la persona: ${error}`,
      data: [],
    };
  }
}
