import { Injectable } from '@angular/core';
import { detalleEvaluacion } from '../models/DetalleEvaluacion';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DetalleEvaluacionService {

  evaluacionObj: detalleEvaluacion[] = [];

  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }


  create(r:detalleEvaluacion):Observable<detalleEvaluacion>{
    return this.http.post<detalleEvaluacion>( `${baserUrl}/api/detalle_evaluacion/crear`, r
    );
  }

   //Metodo para listar
 
   getDetalle():Observable<detalleEvaluacion[]>{
    return this.http.get<detalleEvaluacion[]>(`${baserUrl}/api/evidencia/listarRechazada`);
  }
  
}
