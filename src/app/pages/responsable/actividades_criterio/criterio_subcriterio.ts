import { SubcriterioIndicadores } from "./subcriterio_indicadores";

export class CriterioSubcriterio {
    id_subcriterio!: number;
    id_criterio!: number;
    nombre!: string;
    descripcion!: string;
    lista_indicadores!: SubcriterioIndicadores[];


}