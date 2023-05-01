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
  [x: string]: any;

  private listar:string="http://localhost:5000/usuarios/listar";
  private guardar:string="http://localhost:8080/api/savU";
  private guardar2:string="  http://localhost:5000/usuarios/crear";
  private borrar: string = 'http://localhost:5000/usuarios';

  usuarioObj: Usuario2[] = [];
  usuario2Obj: UsuarioRol[] = [];
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient, private httpClient: HttpClient) { }


   //Metodo para listar
   getUsuarios(): Observable<Usuario2[]> {
    return this.http
      .get(this.listar)
      .pipe(map((response) => response as Usuario2[]));
  }


  //Metodo para guardar
  create(usuarioObj: Usuario2):Observable<Usuario2>{
    return this.http.post<Usuario2>(this.guardar, usuarioObj,{headers:this.httpHeaders})
  }

  
  public añadirUsuario( usuarioObj: Usuario2, idRol: any) {
    return this.httpClient.post(`${baserUrl}/usuarios/crear/${idRol}`,usuarioObj);
  }

  //Metodo para eliminar
  eliminarUsuario(id: any): Observable<Usuario2> {
    return this.http.delete<Usuario2>(this.borrar + '/' + id);
  }

}
