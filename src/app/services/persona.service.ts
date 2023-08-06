import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, forkJoin } from 'rxjs';
import { Persona2 } from './../models/Persona2';
import { Persona } from '../models/Persona';
import { Persona3 } from './../models/Persona3';
import { Usuario2 } from './../models/Usuario2';

import baserUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  personaObj: Persona[] = [];
  constructor(private http: HttpClient) { }


  //Metodo para listar
  getPersonas(): Observable<Persona2[]> {
    return this.http
      .get(`${baserUrl}/api/persona/listar`)
      .pipe(map((response) => response as Persona2[]));
  }


  
  public createUsuarioAndPersona(usuarioObj: Usuario2, idRol: any, persona: Persona2): Observable<any> {
    const createUsuario$ = this.createUsuario(usuarioObj, idRol);
    const createPersona$ = this.createPersona(persona);

    return forkJoin([createUsuario$, createPersona$]).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  public createUsuario(usuarioObj: Usuario2, idRol: any): Observable<any> {
    console.log(usuarioObj);
    return this.http.post(`${baserUrl}/usuarios/crear/${idRol}`, usuarioObj);
  }

  //metodo para crear una persona
  public createPersona(persona: Persona2): Observable<any> {
    return this.http.post(`${baserUrl}/api/persona/crear`, persona).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  listarcorreos():Observable<Persona3[]>{
    return this.http.get<Persona3[]>(`${baserUrl}/api/persona/listarcoorreos`);
  }




  comprobarPersonaRegistrada(username: string): Observable<boolean> {
    const url = `${baserUrl}/api/persona/buscarpersona/${username}`;
    return this.http.get<Persona2>(url).pipe(
      map(persona => !!persona), 
      catchError(error => {
        console.error('Error al comprobar persona registrada', error);
        return throwError(error);
      })
    );
  }

  findByCedula(cedula: string): Observable<Persona2> {
    const url = `${baserUrl}/api/persona/findByCedula/${cedula}`;
    return this.http.get<Persona2>(url);
  }

  actualizar(id: any, crite: any): Observable<any> {
    return this.http.put(`${baserUrl}/api/persona/actualizar/${id}`, crite);
  }

}
