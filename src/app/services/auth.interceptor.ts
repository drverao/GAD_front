import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.loginService.getToken();
    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(authReq).pipe(
      tap(
        event => {  },
        error => {
          // token expirado, redirigir a la página de inicio de sesión
          this.loginService.logout();
          location.replace('/login');

          // if (error.status === 401 && error.error.error === "Unauthorized") {
          //   // el token ha expirado, cerrar sesión y redirigir a la página de inicio de sesión
          //   this.loginService.logout();
          //   location.replace('/login');
          // }
        }
      )
    );
  }

}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
