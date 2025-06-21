'use client';

import useSWR from 'swr';
import type { Persona } from '@/lib/db/schema';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('Ocurrió un error al obtener los datos.');
    // Adjuntar más info al error
    try {
      (error as any).info = await res.json();
    } catch (e) {
      // No hacer nada si el body no es JSON
    }
    (error as any).status = res.status;
    throw error;
  }
  return res.json();
};

export function usePersonas() {
  const { data, error, isLoading, mutate } = useSWR<Persona[]>(
    '/api/personas',
    fetcher,
  );

  return {
    personas: data,
    error,
    isLoading,
    mutate,
  };
}
