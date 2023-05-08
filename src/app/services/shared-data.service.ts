import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SharedDataService {
    listaIndicadores: any[] = [];

    constructor() { }

    actualizarEstadoDialogoA(nuevoEstado: any) {
        this.listaIndicadores = nuevoEstado;
    }

    actualizarEstadoDialogoB(nuevoEstado: any) {
        this.listaIndicadores = nuevoEstado;
    }
}