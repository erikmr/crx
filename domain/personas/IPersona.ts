// eslint-disable-next-line import/no-unresolved
import { Persona } from '@/domain/personas/Persona';

export interface IPersonaRepository {
  insert(persona: Persona): Promise<void>;
  update(persona: Persona): Promise<void>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Persona | null>;
  getAll(): Promise<Persona[]>;
}
