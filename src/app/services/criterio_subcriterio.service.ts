import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadesCriterio } from '../pages/responsable/actividades_criterio/actividades_criterio';
import { CriterioSubcriterio } from '../pages/responsable/actividades_criterio/criterio_subcriterio';

import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CriterioSubcriterioService {


  constructor( private http: HttpClient ) { }

  getSubcriterio(): Observable<CriterioSubcriterio[]> {
    const url = `${baserUrl}/api/subcriterio/listar`; // Se agrega el ID del criterio a la URL
    return this.http.get<CriterioSubcriterio[]>(url);
  }
  

}
