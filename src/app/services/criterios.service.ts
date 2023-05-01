import { Injectable } from '@angular/core';
import { Criterio } from '../models/Criterio';
import {Observable, catchError, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  
  //private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getCriterios():Observable<Criterio[]>{
    return this.http.get<Criterio[]>(`${baserUrl}/api/criterio/listar`);
  }

  crear(r:Criterio):Observable<Criterio>{
    return this.http.post<Criterio>( `${baserUrl}/api/criterio/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: any, crite:any):Observable<any>{
    return this.http.put(`${baserUrl}/api/criterio/actualizar/${id}`, crite);
  }

  eliminar(id: any): Observable<Criterio> {
     return this.http.delete<Criterio>(`${baserUrl}/api/criterio/eliminar/${id}`);
  }
}