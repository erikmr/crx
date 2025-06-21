// import {
//   and,
//   asc,
//   count,
//   desc,
//   eq,
//   gt,
//   gte,
//   inArray,
//   lt,
//   type SQL,
// } from 'drizzle-orm';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import { tipoPersonaType } from '@/lib/types';
// import { ChatSDKError } from '@/lib/errors';

// // biome-ignore lint: Forbidden non-null assertion.
// const client = postgres(process.env.POSTGRES_URL!);
// const db = drizzle(client);

// import { persona } from '@/lib/db/schema';
// import { Persona } from '@/domain/personas/Persona';
// import { IPersonaRepository } from '@/domain/personas/IPersona';

// export class PersonaDrizzleRepository implements IPersonaRepository {
//   async guardar({
//     nombreRazonSocial,
//     rfc,
//     tipoPersona,
//     createdAt,
//     createdBy,
//   }: {
//     nombreRazonSocial: string;
//     rfc: string;
//     tipoPersona: tipoPersonaType;
//     createdAt: Date;
//     createdBy: string;
//   }) {
//     console.log('Guardando persona PersonaDrizzleRepository:', {
//       nombreRazonSocial,
//       rfc,
//       tipoPersona,
//       createdAt,
//       createdBy,
//     });

//     try {
//       return await db.insert(persona).values({
//         nombreRazonSocial,
//         rfc,
//         tipoPersona,
//         createdAt,
//         createdBy,
//       });
//     } catch (error) {
//       throw new ChatSDKError('bad_request:database', 'Failed to save chat');
//     }
//   }

//   async insert(persona: Persona): Promise<void> {
//     throw new Error('Método insert no implementado');
//   }

//   async update(persona: Persona): Promise<void> {
//     throw new Error('Método update no implementado');
//   }

//   async delete(id: string): Promise<void> {
//     throw new Error('Método delete no implementado');
//   }

//   async getById(id: string): Promise<Persona | null> {
//     throw new Error('Método getById no implementado');
//   }

//   async getAll(): Promise<Persona[]> {
//     throw new Error('Método getAll no implementado');
//   }
// }
