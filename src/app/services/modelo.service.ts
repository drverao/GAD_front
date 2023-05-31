import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, catchError } from "rxjs";
import { Modelo } from "../models/Modelo";
import baserUrl from "./helper";

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

  //@GetMapping("/listarModeloExcepto/{id}")
  public listarModeloExcepto(id: any): Observable<Modelo[]> {
    return this.http
      .get(`${this.url}/listarModeloExcepto/${id}`)
      .pipe(map((response) => response as Modelo[]));
  }

  // @PutMapping("/eliminarlogic/{id}")
  public eliminarlogic(id: any): Observable<any> {
    return this.http.put(`${this.url}/eliminarlogic/${id}`, id);
  }

  
  getModeMaximo(): Observable<Modelo> {
    return this.http.get<any>(`${baserUrl}/api/modelo/listarMax`)
  }
}
