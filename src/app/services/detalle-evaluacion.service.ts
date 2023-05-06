import { Injectable } from '@angular/core';
import { detalleEvaluacion } from '../models/DetalleEvaluacion';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleEvaluacionService {
  private guardar:string=" http://localhost:5000/api/detalle_evaluacion/crear";
  private listar:string="http://localhost:5000/api/detalle_evaluacion/listar ";
  private borrar: string = 'http://localhost:5000/api/detalle_evaluacion/eliminar';
  private buscar:string="http://localhost:5000/api/detalle_evaluacion/buscar";
  private edit:string="http://localhost:5000/api/detalle_evaluacion/actualizar  ";

  evaluacionObj: detalleEvaluacion[] = [];

  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }


  
  //Metodo para guardar
  create(detalleEvObj: detalleEvaluacion ):Observable<detalleEvaluacion>{
    return this.http.post<detalleEvaluacion>(this.guardar, detalleEvObj,{headers:this.httpHeaders})
  }

}
