import { Usuario2 } from '../services/Usuario2';
import { Evidencia } from './Evidencia';

export class detalleEvaluacion {
    id_detalle_evaluacion: number = 0;
    estado: boolean=true;
    observacion: string = '';
    fecha: Date = new Date(); 
    visible: string = '';
    usuario: Usuario2 | null = null;
    evidencia: number = 0;
  }
  