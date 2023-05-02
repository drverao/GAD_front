import {Observable, catchError, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { Indicador } from '../models/Indicador';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(private http: HttpClient) { }

  getIndicadors():Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${baserUrl}/api/indicadores/listar`);
  }

  crear(r:Indicador):Observable<Indicador>{
    return this.http.post<Indicador>( `${baserUrl}/api/indicadores/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: any, crite:any):Observable<any>{
    return this.http.put(`${baserUrl}/api/indicadores/actualizar/${id}`, crite);
  }

  eliminar(id: any, crite:any): Observable<any> {
     return this.http.put(`${baserUrl}/api/indicadores/eliminar/${id}`, crite);
  }
}
