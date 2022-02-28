export interface IndiciosModel {
  INDICIO: string,
  RESULTADOS: IndiciosResultadosModel[],
  ID: number
}

export interface IndiciosResultadosModel {
  RESULTADO: string,
  PRUEBA: string
}

export interface IndiciosQuimicaModel {
  TIPO_REGISTRO: string,
  CLAVE_LUGAR: string,
  ANIO: string,
  CONTROL: string,
  ID: number,
  REGISTRO: string,
  INDICIO: string,
  FECHA_RECIBIDO: Date,
  FECHA_ENTREGADO: Date,
  RESULTADO_HEMATOLOGIA: number,
  RESULTADO_HEMATOLOGIA_CANTIDAD: string,
  RESULTADO_ID_SUSTANCIA: number,
  RESULTADO_ID_SUSTANCIA_CANTIDAD: string,
  RESULTADO_IQF: number,
  RESULTADO_IQF_CANTIDAD: string
  RESULTADO_MUESTRA_SUPERFICIE: number,
  RESULTADO_MUESTRA_SUPERFICIE_CANTIDAD: string,
  RESULTADO_RAF: number,
  RESULTADO_RAF_CANTIDAD: string,
  RESULTADO_SEMINOLOGICO: number,
  RESULTADO_SEMINOLOGICO_CANTIDAD: string,
  RESULTADO_WALKER: number,
  RESULTADO_WALKER_CANTIDAD: string,
  RESULTADO_OTRO: number,
  RESULTADO_OTRO_ESPECIFIQUE: string,
  RESULTADO_OTRO_CANTIDAD: string,
  DICTAMEN: string,
  FCH_REG: Date,
  FCH_UAC: Date,
  USUARIO: string
}
