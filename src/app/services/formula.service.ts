import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formulas } from '../models/Formulas';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  constructor(private http: HttpClient) { }

  getFormulas():Observable<Formulas[]>{
    return this.http.get<Formulas[]>(`${baserUrl}/api/formula/listar`);
  }

  crear(formu:Formulas):Observable<Formulas>{
    return this.http.post<Formulas>( `${baserUrl}/api/formula/crear`, formu);
  }

  actualizar(id: any, crite:any):Observable<any>{
    return this.http.put(`${baserUrl}/api/formula/actualizar/${id}`, crite);
  }

  eliminar(crite:any): Observable<any> {
     return this.http.put(`${baserUrl}/api/formula/eliminar/${crite.id_criterio}`,crite);
  }
}
