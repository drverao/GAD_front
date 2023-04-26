import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      // /api/usuario/crear`  /usuarios/
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }

}
