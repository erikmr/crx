import { Insert } from './services/Insert';
import { tipoPersonaType } from '@/lib/types';

export class Persona {
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
  constructor(params: {
    nombreRazonSocial: string;
    rfc: string;
    tipoPersona: tipoPersonaType;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    createdBy: string;
    updatedBy: string | null;
    deletedBy: string | null;
  });
  constructor(params?: {
    nombreRazonSocial: string;
    rfc: string;
    tipoPersona: tipoPersonaType;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    createdBy: string;
    updatedBy: string | null;
    deletedBy: string | null;
  }) {
    if (params) {
      this.nombreRazonSocial = params.nombreRazonSocial;
      this.rfc = params.rfc;
      this.tipoPersona = params.tipoPersona;
      this.createdAt = params.createdAt;
      this.updatedAt = params.updatedAt;
      this.deletedAt = params.deletedAt;
      this.createdBy = params.createdBy;
      this.updatedBy = params.updatedBy;
      this.deletedBy = params.deletedBy;
    } else {
      this.nombreRazonSocial = '';
      this.rfc = '';
      this.tipoPersona = 'fisica';
      this.createdAt = new Date();
      this.updatedAt = null;
      this.deletedAt = null;
      this.createdBy = '';
      this.updatedBy = null;
      this.deletedBy = null;
    }
  }

  async insert() {
    return await Insert({
      nombreRazonSocial: this.nombreRazonSocial,
      rfc: this.rfc,
      tipoPersona: this.tipoPersona,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    });
  }
}
