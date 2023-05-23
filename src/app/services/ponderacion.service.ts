import { Injectable } from '@angular/core';
import { Ponderacion } from '../models/Ponderacion';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, Observable, catchError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PonderacionService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:5000/api/ponderacion';

  //metodo para crear 
  public guardarPonderacion(ponderacion:Ponderacion): Observable<Ponderacion> {
    return this.http.post<Ponderacion>(this.url + '/crear',ponderacion);
  }

  public guardarPonderacionLista(ponderaciones: Ponderacion[]): Observable<Ponderacion[]> {
    return this.http.post<Ponderacion[]>(this.url + '/crearLista', ponderaciones);
  }
  
  //metodo para listar ponderacion
  public listarPonderacion(): Observable<Ponderacion[]> {
    return this.http
      .get(this.url + '/listar')
      .pipe(map((response) => response as Ponderacion[]));
  }
 

  //Listar por Id

  public getPonderacionById(id: number): Observable<Ponderacion> {

    return this.http.get<Ponderacion>(this.url + '/buscar/' + id);
  }

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar/${id}`, crite);
  }


  

}
