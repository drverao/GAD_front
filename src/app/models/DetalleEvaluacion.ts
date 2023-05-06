import { Usuario2 } from '../services/Usuario2';
import { Evidencia } from './Evidencia';

export class detalleEvaluacion {
    id_detalle_evaluacion: number = 0;
    estado: string = '';
    observacion: string = '';
    fecha: Date = new Date(); // Valor inicial asignado
    visible: string = '';
    usuario: number = 0;
    evidencia: number = 0;
  }
  