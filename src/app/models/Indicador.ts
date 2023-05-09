import { Subcriterio } from "./Subcriterio";

export class Indicador{
    id_indicador: number=0;
    nombre:string="";
    descripcion:string="";
    peso:number=0;
    tipo:string="";
    subcriterio?: Subcriterio;
    visible:boolean = true;
}