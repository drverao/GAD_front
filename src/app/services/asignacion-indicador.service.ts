//crea un servicio para asignacion indicador
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, catchError } from "rxjs";
import { AsignacionIndicador } from "../models/AsignacionIndicador";
import baserUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class AsignacionIndicadorService {
    //metodo para crear asignacion indicador
    constructor(private http: HttpClient) { }


    public createAsignacionIndicador(asignacionIndicador: AsignacionIndicador): Observable<any> {
        return this.http.post(`${baserUrl}/api/asignacion_indicador/crearAsignacion`, asignacionIndicador).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }
}