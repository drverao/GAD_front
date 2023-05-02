import {Observable, catchError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { Subcriterio } from '../models/Subcriterio';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class SubcriteriosService {

  constructor(private http: HttpClient) { }

  getSubcriterios():Observable<Subcriterio[]>{
    return this.http.get<Subcriterio[]>(`${baserUrl}/api/subcriterio/listar`);
  }

  crear(r:Subcriterio):Observable<Subcriterio>{
    return this.http.post<Subcriterio>( `${baserUrl}/api/subcriterio/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: any, crite:any):Observable<any>{
    return this.http.put(`${baserUrl}/api/subcriterio/actualizar/${id}`, crite);
  }

  eliminar(id: any): Observable<Subcriterio> {
     return this.http.delete<Subcriterio>(`${baserUrl}/api/subcriterio/eliminar/${id}`);
  }
}
