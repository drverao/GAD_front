
export class Actividad {
    id_actividad!: number;
    nombre!: string;
    descripcion!: string;
    fecha_inicio!: string;
    fecha_fin!: string;
    usuario!:usuario;
}

interface usuario {

    id: number ;
    username: string ;
    pasword: string ;
    estado: string ;
  
  }