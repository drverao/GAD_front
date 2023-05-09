import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

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
}