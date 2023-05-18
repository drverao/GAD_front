import { Indicador } from "./Indicador";
import { Modelo } from "./Modelo";

export class Ponderacion {
    id_ponderacion !:number;
    fecha!:Date;
    porc_obtenido !: number;
    porc_utilidad_obtenida! : number;
    valor_obtenido! :number;
    visible:boolean=true;
    indicador: Indicador | null = null;
    modelo : Modelo| null = null;
    
}
