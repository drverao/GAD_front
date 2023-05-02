import { Subcriterio } from "./Subcriterio";

export class Indicador{
    id_indicadores: number=0;
    nombre:string="";
    descripcion:string="";
    subcriterio: Subcriterio | null = null;
}