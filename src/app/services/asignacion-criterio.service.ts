import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { usuario } from './Usuario';
import baserUrl from './helper';
import { Criterio } from '../models/Criterio';
import { Asignacion_Criterios } from '../models/Asignacion-Criterios';

@Injectable({
  providedIn: 'root'
})
export class AsignacionCriterioService {

  constructor(private httpClient: HttpClient) { }

   //LISTAR RESPONSABLE
  public listarUsuario(): Observable<usuario[]> {
    return this.httpClient.get(`${baserUrl}/usuarios/listarResponsable`).
      pipe(map((response) => response as usuario[]));
  }

  //LISTAR CRITERIOS
  public listarCriterios(): Observable<Criterio[]> {
    return this.httpClient.get(`${baserUrl}/api/criterio/listar`).
      pipe(map((response) => response as Criterio[]));
  }

  //GUARDAR ASIGNACION
  public createAsigna(asigna:Asignacion_Criterios): Observable<Asignacion_Criterios> {
    return this.httpClient.post<Asignacion_Criterios>(`${baserUrl}/api/asignacion_admin/crear`, asigna);
  }

  //LISTAR ASIGNACION
  public listarAsignarResponsable(): Observable<Asignacion_Criterios[]> {
    return this.httpClient.get(`${baserUrl}/api/asignacion_admin/listar`).
      pipe(map((response) => response as Asignacion_Criterios[]));
  }

  //EDITAR ASIGNACION
  public updateAsigna(asigna: Asignacion_Criterios) {
    console.log(asigna.id_asignacion);
    return this.httpClient.put<Asignacion_Criterios>(`${baserUrl}/api/asignacion_admin/actualizar/` + asigna.id_asignacion, asigna);
  }

  //ELIMINAR ASIGNACION
  public deleteAsigna(asigna: Asignacion_Criterios) {
    return this.httpClient.delete<Asignacion_Criterios>(`${baserUrl}/api/asignacion_admin/eliminar/` + asigna.id_asignacion);
  }

  //BUSCAR POR ID
  public getAsignacionId(id: number): Observable<Asignacion_Criterios> {
    return this.httpClient.get<Asignacion_Criterios>(`${baserUrl}/api/asignacion_admin/buscar/` + id);
  }
}
