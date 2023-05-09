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
        return this.http.get(this.url + '/cedula/' + cedula).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    //metodo para obtener docentes por primer_apellido
    public getDocenteByPrimerApellido(primer_apellido: string): Observable<any> {
        return this.http.get(this.url + '/p-apellido/' + primer_apellido).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    //metodo para obtener docentes por segundo_apellido
    public getDocenteBySegundoApellido(segundo_apellido: string): Observable<any> {
        return this.http.get(this.url + '/s-apellido/' + segundo_apellido).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    //metodo para obtener docentes por primer_apellido y segundo_apellido
    public getDocenteByPrimerApellidoAndSegundoApellido(primer_apellido: string, segundo_apellido: string): Observable<any> {
        return this.http.get(this.url + '/apellidos/' + primer_apellido + '/' + segundo_apellido).pipe(
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

}

