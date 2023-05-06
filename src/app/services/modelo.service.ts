import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map,Observable, catchError } from "rxjs";
import { Modelo } from "../models/Modelo";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:5000/api/modelo';
  private modeloLista: string = 'http://localhost:5000/api/modelo/listar';

  //metodo para crear un modelo
  public createModelo(modelo: Modelo): Observable<any> {
      return this.http.post(this.url + '/crear', modelo).pipe(
          catchError((error) => {
              console.error(error);
              throw error;
          })
      );
  }
   //metodo para listar los  modelos
  
  public listarModelo():Observable<Modelo[]>{
      return this.http
      .get(this.modeloLista)
      .pipe(map((response) => response as Modelo[]));
  }
}
