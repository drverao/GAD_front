import { usuario } from "../services/Usuario";
import { Usuario2 } from "../services/Usuario2";


export class Modelo {
    id_modelo!: number;
    nombre!: string;
    fecha_inicio!: Date;
    fecha_fin!: Date;
    fecha_final_act!: Date;
    visible: boolean = true;
    usuario!: any;
}