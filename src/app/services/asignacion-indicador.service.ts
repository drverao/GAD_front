//crea un servicio para asignacion indicador
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import baserUrl from './helper';
import { AsignacionIndicador } from "../models/AsignacionIndicador";

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

    //servio para listar asignacion indicador por id modelo
    public getAsignacionIndicadorByIdModelo(idModelo: number): Observable<any> {
        return this.http.get(`${baserUrl}/api/asignacion_indicador/listarAsignacion/${idModelo}`).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

}