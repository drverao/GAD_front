import { Subcriterio } from "./Subcriterio";

export class Indicador{
    id_indicadores: number=0;
    nombre:string="";
    descripcion:string="";
    peso:number=0;
    tipo:string="";
    estandar:number=0;
    subcriterio: Subcriterio | null = null;
    visible:boolean = true;
}