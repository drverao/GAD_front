import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Evidencia } from './Evidencia';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaService {
  private listar:string="http://localhost:5000/api/evidencia/listar";
  evidenciaObj: Evidencia[] = [];
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  
   //Metodo para listar
   getEvidencias(): Observable<Evidencia[]> {
    return this.http
      .get(this.listar)
      .pipe(map((response) => response as Evidencia[]));
  }
}
