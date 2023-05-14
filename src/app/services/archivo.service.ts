import { HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  baserrl= environment.baserUrl;

  constructor(private http: HttpClient) { }

  cargar(file: File): Observable<HttpEvent<any>> {
    const fo: FormData = new FormData();
    fo.append('file', file);
    const req = new HttpRequest('POST', `${this.baserrl}/archivo/upload`, fo, {
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
