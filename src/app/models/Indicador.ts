import { Subcriterio } from "./Subcriterio";

export class Indicador {
    id_indicadores: number = 0;
    nombre: string = "";
    descripcion: string = "";
    peso: number = 0;
    estandar: number = 0;
    tipo: string = "";
    subcriterio: Subcriterio = new Subcriterio();
    visible: boolean = true;
}