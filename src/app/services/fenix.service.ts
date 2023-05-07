//servicio para obtener los datos de la api de fenix

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";



@Injectable
    ({
        providedIn: 'root'
    })
export class FenixService {
    constructor(private http: HttpClient) { }

    private url: string = 'http://localhost:5000/api/fenix';

    //metodo para obtener los datos de la api de fenix
    public getFenixData(): Observable<any> {
        return this.http.get(this.url + '/listar').pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    //metodo para obtener docentes por cedula
    public getDocenteByCedula(cedula: string): Observable<any> {
        return this.http.get(this.url + '/' + cedula).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    //metodo para obtener docentes por cedula primer_apellido y segundo_apellido
    public getDocenteByCedulaAndApellidos(cedula: string, apellido1: string, apellido2: string): Observable<any> {
        return this.http.get(this.url + '/' + cedula + '/' + apellido1 + '/' + apellido2).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

}

