import { map, Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subcriterio } from '../models/Subcriterio';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class SubcriteriosService {
  private subcriterioLista: string = 'http://165.227.197.169:5000/api/subcriterio/listar';
  constructor(private http: HttpClient) { }

  getSubcriterios(): Observable<Subcriterio[]> {
    return this.http.get<Subcriterio[]>(`${baserUrl}/api/subcriterio/listar`);
  }
  public listarSubcriterio(): Observable<Subcriterio[]> {
    return this.http
      .get(this.subcriterioLista)
      .pipe(map((response) => response as Subcriterio[]));
  }

  crear(r: Subcriterio): Observable<Subcriterio> {
    return this.http.post<Subcriterio>(`${baserUrl}/api/subcriterio/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/subcriterio/actualizar/${id}`, crite);
  }

  eliminar(crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/subcriterio/eliminar/${crite.id_subcriterio}`, crite);
  }

  //listar subcriterios por criterio
  public listarSubcriterioPorCriterio(id: any): Observable<Subcriterio[]> {
    return this.http
      .get(`${baserUrl}/api/subcriterio/listarPorCriterio/${id}`)
      .pipe(map((response) => response as Subcriterio[]));
  }

  public geSubcritebyId(id: any): Observable<Subcriterio[]> {
    return this.http
      .get(`${baserUrl}/api/subcriterio/buscar/${id}`)
      .pipe(map((response) => response as Subcriterio[]));
  }


}
