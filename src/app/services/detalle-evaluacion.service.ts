import { Injectable } from '@angular/core';
import { detalleEvaluacion } from '../models/DetalleEvaluacion';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleEvaluacionService {


  constructor(private http:HttpClient) { }

  create(r: detalleEvaluacion): Observable<detalleEvaluacion> {
    return this.http.post<detalleEvaluacion>(`${baserUrl}/api/detalle_evaluacion/crear`, r).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

   //Metodo para listar
 
   getDetalle():Observable<detalleEvaluacion[]>{
    return this.http.get<detalleEvaluacion[]>(`${baserUrl}/api/evidencia/listarRechazada`);
  }
  /*
  getDetalleEvi(idUsua: number, idEvi: number): Observable<detalleEvaluacion[]>{
    return this.http.get<detalleEvaluacion[]>(`${baserUrl}/api/evidencia/listarporEviRecha/${idUsua}/${idEvi}`);
  }*/

  getDetalleEvi(idUsua: number, idEvi: number): Observable<detalleEvaluacion[]>{
    return this.http.get<detalleEvaluacion[]>(`${baserUrl}/api/evidencia/listarporEviRecha/${idUsua}/${idEvi}`)
      .pipe(
        catchError(error => {
          console.log('Error:', error);
          return throwError('Hubo un error al obtener los detalles de evaluación');
        })
      );
  }

  
}
