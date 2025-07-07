import { tool } from 'ai';
import { z } from 'zod';
import { Persona } from '@/lib/domains/personas/Persona';
export const crearPersona = tool({
  description: 'Crea una persona',
  parameters: z.object({
    nombreRazonSocial: z.string(),
    rfc: z.string(),
    tipoPersona: z.enum(['fisica', 'moral']),
  }),
  execute: async ({ nombreRazonSocial, rfc, tipoPersona }) => {
    console.log("nombreRazonSocial: ", nombreRazonSocial)
    console.log("rfc: ", rfc)
    console.log("tipoPersona: ", tipoPersona)
    const nuevaPersona = new Persona({
      nombreRazonSocial,
      rfc,
      tipoPersona,
    });
    const result = await nuevaPersona.insert();
    return result;
  },
});
