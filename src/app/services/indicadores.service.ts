import { map, Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Indicador } from '../models/Indicador';
import { HttpClient, HttpParams } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private indicadorLista: string = 'http://localhost:5000/api/indicadores/listar';
  private url: string = 'http://localhost:5000/api/indicadores';
  constructor(private http: HttpClient) { }

  public listarIndicador(): Observable<Indicador[]> {
    return this.http
      .get(this.indicadorLista)
      .pipe(map((response) => response as Indicador[]));
  }
  getIndicadors(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${baserUrl}/api/indicadores/listar`);
  }

  crear(r: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(`${baserUrl}/api/indicadores/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/indicadores/actualizar/${id}`, crite);
  }

  eliminar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/indicadores/eliminar/${id}`, crite);
  }

  //listar indicadores por subcriterio
  public listarIndicadorPorSubcriterio(id: any): Observable<Indicador[]> {
    return this.http
      .get(`${baserUrl}/api/indicadores/listarPorSubcriterio/${id}`)
      .pipe(map((response) => response as Indicador[]));
  }

  getIndicadorById(id_indicador: number): Observable<Indicador> {

    return this.http.get<Indicador>(this.url + '/buscar/' + id_indicador);
  }

  public indicadoresPorCriterios(ids: number[]): Observable<Indicador[]> {
    const params = new HttpParams().set('idCriterios', ids.join(','));
    const options = {
      params: params,
      responseType: 'json' as const
    };
    return this.http.get<Indicador[]>(`${baserUrl}/api/indicadores/indicadoresPorCriterios`, options);
  }

  public obtenerIndicadoresPorCriterio(id: any): Observable<Indicador[]> {
    return this.http
      .get(`${baserUrl}/api/indicadores/obtenerIndicadoresPorCriterio/${id}`)
      .pipe(map((response) => response as Indicador[]));
  }

  
}
