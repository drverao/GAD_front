import { Evidencia } from 'src/app/models/Evidencia';
export class Actividades {
    id_actividad!: number;
    nombre!: string;
    descripcion!: string;
    fecha_inicio!: string;
    fecha_fin!: string;
  evidencia:Evidencia|null=null;

}
