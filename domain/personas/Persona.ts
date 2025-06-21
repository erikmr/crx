export class Persona {
  constructor(
    public readonly id: string,
    public nombreRazonSocial: string,
    public rfc: string,
    public tipoPersona: string,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date,
    public createdBy: string,
    public updatedBy: string,
    public deletedBy: string,
  ) {}
}
