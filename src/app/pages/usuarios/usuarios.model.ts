export class usuario {
    Id?: number;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Usuario1: string;
    Password: string;
    Observaciones: string;
    CveEmpleado: string;
    // IdTipoUsuario: number;
    EsActivo: boolean;
    // IdDeposito: number;
    Rol: number;
    // UsuarioRol: [];
    IdUsuarioRegistro: number;
    FechaRegistro: Date;
    IdUsuarioModificacion: number;
    FechaModificacion: Date;
    Foto: string;
    Type: string;
    salt: [];
    CorreoElectronico: string;
    Celular: number;
    clave_lugar: string;
}


export class Roles {
  Id: number;
  Rol: string;
}





