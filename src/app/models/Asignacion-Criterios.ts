export class Asignacion_Criterios{
    id_asignacion:number=0;
    usuario?: usuario ;
    criterio?: Criterio ;
    visible:boolean=true;
}

interface usuario{
    id: number;
    username: string ;
    pasword: string ;
    estado: string;
}

interface Criterio{

    id_criterio: number;
    nombre:string;
    descripcion:string;
    peso:number;
    estado:string;
}