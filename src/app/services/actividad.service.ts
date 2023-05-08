import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from './actividades';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {


  constructor( private http: HttpClient ) { }



  search(nombre: string): Observable<Actividades[]> {
    const url = `${baserUrl}/api/actividad/buscar/?nombre=${nombre}`;
    return this.http.get<Actividades[]>(url);
  }

  get(): Observable<Actividades[]> {
    const url = `${baserUrl}/api/actividad/listar`;
    return this.http.get<Actividades[]>(url);
  }

  create(actividad: Actividades): Observable<Actividades> {
    return this.http.post<Actividades>(`${baserUrl}/api/actividad/crear`, actividad);
  }

 /* getOne(id: number): Observable<Actividades> {
    return this.http.get<Actividades>(this.url + id);
  }*/

  update(id: number, actividades: Actividades): Observable<any> {
    return this.http.put(`${baserUrl}/api/actividad/actualizar/${id}`, actividades);
  }

  deleteMyRecord(id: number): Observable<any> {
    return this.http.delete(`${baserUrl}/api/actividad/eliminar/${id}`);
  }

}
