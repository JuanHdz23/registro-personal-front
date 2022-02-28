export class Usuario {
  constructor(
    public Nombre: string,
    public ApellidoPaterno: string,
    public ApellidoMaterno: string,
    public Usuario: string,
    public Observaciones: string,
    public CveEmpleado: number,
    public EsActivo: boolean,
    public Rol: number,
    public FechaRegistro: Date,
    public Id?: number,
    public Password?: string
  ) { }
}
