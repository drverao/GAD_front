import { HttpRequest, HttpEventType } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actividades } from './actividades';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  baserrl= environment.baserUrl;

  constructor(private http: HttpClient) { }
  cargar(file: File, descripcion: string, id_evidencia: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('descripcion', descripcion);
    formData.append('id_evidencia', id_evidencia.toString());
    const req = new HttpRequest('POST', `${this.baserrl}/archivo/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  listar(){
    return this.http.get(`${this.baserrl}/archivo/listar`);
  }
  borrar(filename:string){
    return this.http.get(`${this.baserrl}/archivo/borrar/${filename}`);
}
}
