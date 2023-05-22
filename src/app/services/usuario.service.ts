import { usuario } from './Usuario';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario2 } from './Usuario2';
import baserUrl from './helper';
import { UsuarioRol } from './UsuarioRol';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  usuarioObj: Usuario2[] = [];
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient, private httpClient: HttpClient) { }


    //Metodo para listar
  public  getUsuariosList(): Observable<Usuario2[]> {
    return this.httpClient.get(`${baserUrl}/usuarios/listarv`).
      pipe(map((response) => response as Usuario2[]));
  }

    //Metodo para editar

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/usuaarios/actualizar/${id}`, crite);
  }





    //Metodo para eliminar

    eliminarUsuarioLogic(detalle: number): Observable<any> {
      console.log(detalle)
      return this.http.put(`${baserUrl}/usuarios/eliminarlogic/${detalle}`, detalle);
  
    }

    //Metodo para crear

  public createUsuario(usuarioObj: Usuario2, idRol: any) {
    console.log(usuarioObj);
    return this.httpClient.post(`${baserUrl}/usuarios/crear/${idRol}`, usuarioObj);
  }



    //Metodo para buscar
  
    obtenerUsuario(username: string): Observable<boolean> {
      const url = `${baserUrl}/usuarios/buscar/${username}`;
      return this.http.get<boolean>(url);
    }

}
