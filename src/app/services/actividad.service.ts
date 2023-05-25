import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from './actividades';
import baserUrl from './helper';

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


public getEviAsig(idEvi: number): Observable<Actividades[]> {
  return this.http.get<Actividades[]>(`${baserUrl}/api/actividad/buscarporEvide/${idEvi}`);
}

public getActByUsua(idUsua: number): Observable<Actividades[]> {
  return this.http.get<Actividades[]>(`${baserUrl}/api/actividad/buscarByUsuario/${idUsua}`);
}


}
