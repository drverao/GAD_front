import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

let id_criterio: number;
@Injectable({
    providedIn: "root"
})
export class SharedDataService {
    private datosSubject = new BehaviorSubject<any[]>([]);
    datos$ = this.datosSubject.asObservable();

    agregarDatos(datos: any[]) {
        const nuevosDatos = [...datos];
        this.datosSubject.next(nuevosDatos);
    }

    agregarIdCriterio(id: number) {
        id_criterio = id;
        console.log(id_criterio);
    }

    obtenerIdCriterio() {
        return id_criterio;
    }
}