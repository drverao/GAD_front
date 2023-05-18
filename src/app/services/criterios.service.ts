import { Injectable } from '@angular/core';
import { Criterio } from '../models/Criterio';
import { map, Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from './helper';
import { Modelo } from '../models/Modelo';
import { Persona2 } from './Persona2';


@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  //private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  private criterioLista: string = 'http://localhost:5000/api/criterio/listar';
  constructor(private http: HttpClient) { }
  private url: string = 'http://localhost:5000/api/criterio';
  getCriterioById(id: number): Observable<Criterio> {

    return this.http.get<Criterio>(this.url + '/buscar/' + id);
  }

  getCriterios(): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${baserUrl}/api/criterio/listar`);
  }
  public listarCriterio(): Observable<Criterio[]> {
    return this.http
      .get(this.criterioLista)
      .pipe(map((response) => response as Criterio[]));
  }
  crear(r: Criterio): Observable<Criterio> {
    return this.http.post<Criterio>(`${baserUrl}/api/criterio/crear`, r
    );
  }

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/criterio/actualizar/${id}`, crite);
  }

  eliminar(crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/criterio/eliminar/${crite.id_criterio}`, crite);

  }

  getObtenerCriterio(): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${baserUrl}/api/criterio/listarcriteriosMode`);
  }

  getObtenerCriterio2(id: number): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${baserUrl}/api/criterio/listarcriteriosMId/` + id);
  }

  getObtenerIndicadores(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/api/indicadores/buscarindicador/` + id);

  }

  getModeMaximo(): Observable<Modelo> {
    return this.http.get<any>(`${baserUrl}/api/modelo/listarMax`)
  }

  getActividadAtrasada(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/api/actividad/listaratrasa`)
  }

  getObtenerPersonaId(id:number): Observable<Persona2> {
    return this.http.get<Persona2>(`${baserUrl}/api/persona/buscarpersonaId/`+id);

  }

  getActividadCumplida(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/api/actividad/listarCumpli`)
  }
  getCriteriosUltimoModelo(): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${baserUrl}/api/criterio/obtenerCriteriosUltimoModelo`);
  }


}
