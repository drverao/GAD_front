export class Asigna_Evi{
    id_asignacion_evidencia:number=0;
    visible:boolean=true;
    evidencia!:Evidencia;
    usuario!: usuario;
}

interface Evidencia{
    id_evidencia: number ;
    enlace:String;
    nombre:String ;
    visible:boolean;
}

interface usuario{
    id: number;
    username: string ;
    pasword: string ;
    estado: string;
}