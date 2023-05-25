import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from './actividades';
import baserUrl from './helper';
import { Observacion } from '../models/Observacion';
import { Observacion2 } from '../models/Observaciones2';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

private actividalista:string='http://localhost:5000/api/actividad'
  constructor( private http: HttpClient ) { }



  search(nombre: string): Observable<Actividades[]> {
    const url = `${baserUrl}/api/actividad/buscar/?nombre=${nombre}`;
    return this.http.get<Actividades[]>(url);
  }

  get(): Observable<Actividades[]> {
    const url = `${baserUrl}/api/actividad/listarv`;
    return this.http.get<Actividades[]>(url);
  }

  crear(actividad: Actividades): Observable<Actividades> {
    return this.http.post<Actividades>(`${baserUrl}/api/actividad/crear`, actividad);
  }

 /* getOne(id: number): Observable<Actividades> {
    return this.http.get<Actividades>(this.url + id);
  }*/

  update(id: number, actividades: Actividades): Observable<any> {
    console.log(actividades)
    return this.http.put(`${baserUrl}/api/actividad/actualizar/${id}`, actividades);
  }


  eliminar(activi:any): Observable<any> {
    return this.http.put(`${baserUrl}/api/actividad/eliminarlogic/${activi.id_actividad}`,activi);
 }
 public geteviasig(user: String): Observable<Actividades[]> {
  return this.http.get<Actividades[]>(`${baserUrl}/api/actividad/buscarusuario/${user}`);
}

//Observacion
  //Metodo para crear
  createObservacion(r: Observacion2): Observable<Observacion2> {
    return this.http.post<Observacion2>(`${baserUrl}/api/observacion/crear`, r)
  }
  //listar observaciones por actividad
  public getObservacionByActi(id:number): Observable<Observacion2[]> {
    return this.http.get<Observacion2[]>(`${baserUrl}/api/observacion/buscarObserByActiv/`+id);

  }
  //eliminadologico
  eliminarObser(detalle: number): Observable<any> {
    console.log(detalle)
    return this.http.put(`${baserUrl}/api/observacion/eliminarlogic/${detalle}`, detalle);
  }
public getEviAsig(idEvi: number): Observable<Actividades[]> {
  return this.http.get<Actividades[]>(`${baserUrl}/api/actividad/buscarporEvide/${idEvi}`);
  
}
}
