export interface DactiloscopiaModel {
    TIPO_REGISTRO: string,
    CLAVE_LUGAR: string,
    ANIO: string,
    CONTROL: string,
    FECHA_RECIBIDO: Date,
    FECHA_ENTREGADO: Date,
    FCH_REG: Date,
    FCH_UAC: Date,
    USUARIO: string
    DACTILOSCOPIA_AFIS: AFISModel[],
    DACTILOSCOPIA_NID: NIDModel[]
  }

export interface NIDModel {
  TIPO_REGISTRO: string,
  CLAVE_LUGAR: string,
  ANIO: string,
  CONTROL: string,
  NID: string,
  NOMBRE: string,
  PATERNO: string,
  MATERNO: string,
  FCH_REG: Date,
  FCH_UAC: Date,
  USUARIO: string
}

export interface AFISModel {
  TIPO_REGISTRO: string,
  CLAVE_LUGAR: string,
  ANIO: string,
  CONTROL: string,
  NCP_AFIS: string,
  NCP_RESULTADO: string,
  FCH_REG: Date,
  FCH_UAC: Date,
  USUARIO: string
}