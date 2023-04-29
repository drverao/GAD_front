import { Injectable } from '@angular/core';
import { Criterio } from '../models/Criterio';
import {Observable, catchError, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  private url:string='http://localhost:8080/api/criterio';
  
  //private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getCriterios():Observable<Criterio[]>{
    return this.http.get<Criterio[]>(`${this.url}/listar`);
  }

  crear(criterio:Criterio):Observable<Criterio>{
    return this.http.post<Criterio>(this.url + '/crear', criterio).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: number, criterio:Criterio):Observable<any>{
    return this.http.put(`${this.url}/actualizar/${id}`, criterio);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/eliminar/${id}`, {});
  }
}
