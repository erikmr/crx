'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  personaSchema,
  type PersonaFormValues,
} from '@/lib/domains/personas/validation';
import type { Persona } from '@/lib/db/schema';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PersonaFormProps {
  persona?: Persona;
  onSuccess: () => void;
}

export function PersonaForm({ persona, onSuccess }: PersonaFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!persona;

  const form = useForm<PersonaFormValues>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      nombreRazonSocial: persona?.nombreRazonSocial ?? '',
      rfc: persona?.rfc ?? '',
      tipoPersona: persona?.tipoPersona ?? 'fisica',
    },
  });

  async function onSubmit(values: PersonaFormValues) {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/personas/${persona.id}` : '/api/personas';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error.');
      }

      toast({
        title: 'Éxito',
        description: `Persona ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
      });
      onSuccess(); // Cierra el diálogo y refresca los datos
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombreRazonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre o Razón Social</FormLabel>
              <FormControl>
                <Input placeholder="John Doe S.A. de C.V." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rfc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RFC</FormLabel>
              <FormControl>
                <Input placeholder="XAXX010101000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipoPersona"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Persona</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fisica">Física</SelectItem>
                  <SelectItem value="moral">Moral</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Persona'}
        </Button>
      </form>
    </Form>
  );
}
