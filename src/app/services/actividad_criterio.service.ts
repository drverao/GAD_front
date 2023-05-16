import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadesCriterio } from '../pages/responsable/actividades_criterio/actividades_criterio';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ActividadCriterioService {


  constructor( private http: HttpClient ) { }


  get(): Observable<ActividadesCriterio[]> {
    const url = `${baserUrl}/api/criterio/listar`;
    return this.http.get<ActividadesCriterio[]>(url);
  }

}
