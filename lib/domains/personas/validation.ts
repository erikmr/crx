import { z } from 'zod';

export const personaSchema = z.object({
  nombreRazonSocial: z
    .string()
    .min(3, { message: 'El nombre o razón social debe tener al menos 3 caracteres.' })
    .max(200),
  rfc: z.string().length(13, { message: 'El RFC debe tener 13 caracteres.' }),
  tipoPersona: z.enum(['fisica', 'moral'], {
    required_error: 'Debe seleccionar un tipo de persona.',
  }),
});

export type PersonaFormValues = z.infer<typeof personaSchema>;
