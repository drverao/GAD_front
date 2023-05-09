import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Evidencia } from '../models/Evidencia';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaService {
  evidenciaObj: Evidencia[] = [];
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  
   //Metodo para listar
 
  getEvidencias():Observable<Evidencia[]>{
    return this.http.get<Evidencia[]>(`${baserUrl}/api/evidencia/listar`);
  }
  

  eliminarEvidencia(evi:any): Observable<any> {
    return this.http.put(`${baserUrl}/api/evidencia/eliminar /${evi.id_evidenciao}`,evi);
 }

      // Método para buscar un indicador por su ID
      getEvidenciaIndi(id: number): Observable<Evidencia> {
        return this.http.get<Evidencia>(`${baserUrl}/api/listarIndica/${id}`);
      }
}
