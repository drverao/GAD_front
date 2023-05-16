import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcriterioIndicadores } from '../pages/responsable/actividades_criterio/subcriterio_indicadores';

import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubcriterioIndicadoresService {


  constructor( private http: HttpClient ) { }

  getIndicadorPorSubcriterio(idSubcriterio: number): Observable<SubcriterioIndicadores[]> {
    const url = `${baserUrl}/api/indicadores/listar/${idSubcriterio}`; // Ajusta la URL según tu API
    return this.http.get<SubcriterioIndicadores[]>(url);
  }
  

  getIndicador(): Observable<SubcriterioIndicadores[]> {
    const url = `${baserUrl}/api/indicadores/listar`;
    return this.http.get<SubcriterioIndicadores[]>(url);
  }

}
