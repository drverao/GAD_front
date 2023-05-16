import { Usuario2 } from "../services/Usuario2";

export class Notificacion{
    id:number=0;
    fecha:string="";
    id_usuario_env:number=0;
    mensaje:string="";
    visto:boolean= false;
    usuario:Usuario2|null=null;

}