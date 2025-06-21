import * as services from './services';
import { tipoPersonaType } from '@/lib/types';
import type { Persona as PersonaType } from '@/lib/db/schema';

export class Persona {
  public id: string; // Se agrega el ID para poder usarlo en update y delete
  public nombreRazonSocial: string;
  public rfc: string;
  public tipoPersona: tipoPersonaType;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;
  public createdBy: string;
  public updatedBy: string | null;
  public deletedBy: string | null;

  constructor();
  constructor(params: Partial<PersonaType>);
  constructor(params?: Partial<PersonaType>) {
    this.id = params?.id ?? '';
    this.nombreRazonSocial = params?.nombreRazonSocial ?? '';
    this.rfc = params?.rfc ?? '';
    this.tipoPersona = params?.tipoPersona ?? 'fisica';
    this.createdAt = params?.createdAt ?? new Date();
    this.updatedAt = params?.updatedAt ?? null;
    this.deletedAt = params?.deletedAt ?? null;
    this.createdBy = params?.createdBy ?? '';
    this.updatedBy = params?.updatedBy ?? null;
    this.deletedBy = params?.deletedBy ?? null;
  }

  async insert() {
    const result = await services.Insert({
      nombreRazonSocial: this.nombreRazonSocial,
      rfc: this.rfc,
      tipoPersona: this.tipoPersona,
    });

    if (result.success && result.data.length > 0) {
      this.id = result.data[0].id; // Asignar el ID a la instancia actual
    }
    return result;
  }

  async update() {
    return await services.Update({
      id: this.id,
      nombreRazonSocial: this.nombreRazonSocial,
      rfc: this.rfc,
      tipoPersona: this.tipoPersona,
    });
  }

  async delete() {
    if (!this.id) {
      throw new Error(
        'La instancia de Persona debe tener un ID para poder eliminarse.',
      );
    }
    return await services.Delete({ id: this.id });
  }

  static async getById(id: string) {
    return await services.GetById({ id });
  }

  static async getList() {
    return await services.GetList();
  }
}
