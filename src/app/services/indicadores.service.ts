import { map, Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Indicador } from '../models/Indicador';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private indicadorLista: string = 'http://localhost:5000/api/indicadores/listar';
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


  //consumir servicio de back obtenerIndicadoresPorCriterio
  public obtenerIndicadoresPorCriterio(id: any): Observable<Indicador[]> {
    return this.http
      .get(`${baserUrl}/api/indicadores/obtenerIndicadoresPorCriterio/${id}`)
      .pipe(map((response) => response as Indicador[]));
  }

  public ponderarIndicador(id: any, indicador: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/indicadores/ponderacion/${id}`, indicador);
  }

  getIndicadores(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${baserUrl}/api/indicadores/listar`);
  }

}
