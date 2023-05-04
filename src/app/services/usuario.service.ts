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
  

  private listar:string='http://localhost:5000/usuarios/listar';
  private borrar: string = 'http://localhost:5000/usuarios';
  private edit: string = "http://localhost:5000/usuarios/actualizar";
  private buscar: string = "http://localhost:5000/usuarios/buscarUsua";

  usuarioObj: Usuario2[] = [];
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient, private httpClient: HttpClient) { }


   //Metodo para listar
   getUsuarios(): Observable<Usuario2[]> {
    return this.http
      .get(this.listar)
      .pipe(map((response) => response as Usuario2[]));
  }


      //Metodo para modificar
      updateUsuario(usuarioObj:Usuario2){
        return this.http.put<Usuario2>(this.edit+"/"+usuarioObj.id,usuarioObj);
      }
  public añadirUsuario(user: any, idRol: any) {
    return this.httpClient.post(`${baserUrl}/usuarios/crear/${idRol}`, user);
  }

 //Metodo para buscar
 getUsuarioId(id:number):Observable<Usuario2>{
  return this.http.get<Usuario2>(this.buscar+"/"+id);
}


  //Metodo para eliminar
  eliminarUsuario(id: any): Observable<Usuario2> {
    return this.http.delete<Usuario2>(this.borrar + '/' + id);
  }

}
