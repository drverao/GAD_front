import { Usuario2 } from "../services/Usuario2";

export class Notificacion{
    id:number=0;
    fecha!: Date;
    rol:string="";
    mensaje:string="";
    visto:boolean= false;
    usuario:number=0;

}