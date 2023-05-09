import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, catchError } from "rxjs";
import { Modelo } from "../models/Modelo";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:5000/api/modelo';

  //metodo para crear un modelo
  public createModelo(modelo: Modelo): Observable<any> {
    return this.http.post(this.url + '/crear', modelo).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  //metodo para listar los  modelos de backend
  public listarModelo(): Observable<Modelo[]> {
    return this.http
      .get(this.url + '/listar')
      .pipe(map((response) => response as Modelo[]));
  }
  getModeloById(id_modelo: number): Observable<Modelo> {

    return this.http.get<Modelo>(this.url + '/buscar/' + id_modelo);
  }
}
