import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { usuario } from './Usuario';
import { map, Observable } from 'rxjs';
import { Criterio } from '../models/Criterio';
import { asigna_R } from '../models/Asigna-Responsable';


@Injectable({
  providedIn: 'root'
})
export class AsignacionResponsableService {

  constructor(private httpClient: HttpClient) { }

  //LISTAR RESPONSABLE
  public listarUsuario(): Observable<usuario[]> {
    return this.httpClient.get(`${baserUrl}/usuarios/listar`).
      pipe(map((response) => response as usuario[]));
  }

  //LISTAR CRITERIOS
  public listarCriterios(): Observable<Criterio[]> {
    return this.httpClient.get(`${baserUrl}/api/criterio/listar`).
      pipe(map((response) => response as Criterio[]));
  }

  //GUARDAR ASIGNACION
  public createAsigna(asigna: asigna_R): Observable<asigna_R> {
    return this.httpClient.post<asigna_R>(`${baserUrl}/api/asignacion_admin/crear`, asigna);
  }

  //LISTAR ASIGNACION
  public listarAsignarResponsable(): Observable<asigna_R[]> {
    return this.httpClient.get(`${baserUrl}/api/asignacion_admin/listar`).
      pipe(map((response) => response as asigna_R[]));
  }

  //EDITAR ASIGNACION
  public updateAsigna(asigna: asigna_R) {
    console.log(asigna.id_asignacion);
    return this.httpClient.put<asigna_R>(`${baserUrl}/api/asignacion_admin/actualizar/` + asigna.id_asignacion, asigna);
  }

  //ELIMINAR ASIGNACION
  public deleteAsigna(asigna: asigna_R) {
    return this.httpClient.delete<asigna_R>(`${baserUrl}/api/asignacion_admin/eliminar/` + asigna.id_asignacion);
  }

  //BUSCAR POR ID
  public getAsignacionId(id: number): Observable<asigna_R> {
    return this.httpClient.get<asigna_R>(`${baserUrl}/api/asignacion_admin/buscar/` + id);
  }
}
