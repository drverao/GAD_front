import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';
import { UsuarioRol } from './UsuarioRol';

@Injectable({
  providedIn: 'root'
})
export class UsuariorolService {

  constructor(private http: HttpClient) { }

  getusuarios(): Observable<any[]> {
    return this.http.get<UsuarioRol[]>(`${baserUrl}/api/usuariorol/listarv`);
  }
}
