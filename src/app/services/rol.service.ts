
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Rol } from './Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private listar:string="http://localhost:5000/api/rol/listarRol";
  rolObj: Rol[] = [];
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }
  //Metodo para listar
  getRoles(): Observable<Rol[]> {
    return this.http
      .get(this.listar)
      .pipe(map((response) => response as Rol[]));
  }
}
