import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": '',
  }

  constructor(private _snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      // this._snack.open('El username de usuario es requerido !!', 'Aceptar')
      alert("El username de usuario es requerido !!");
      return;
    }

    else if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      // this._snack.open('La password es requerida !!', 'Aceptar')
      alert("La password es requerida !!")
      return;
    } else (

      this.loginService.generateToken(this.loginData).subscribe(
        (data: any) => {
          console.log(data);
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            console.log(user);

            if (this.loginService.getUserRole() == 'ADMIN') {
              //dashboard admin
              //window.location.href = '/admin';
              this.router.navigate(['admin']);
              location.replace('/admin');
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'RESPONSABLE') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['actividad']);
              location.replace('/actividad');
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'SUPERADMIN') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              location.replace('/user-dashboard');
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'AUTORIDAD') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              location.replace('/user-dashboard');
              this.loginService.loginStatusSubjec.next(true);
              window.location.reload();
            }
            else {
              this.loginService.logout();
            }
          })
        }, (error) => {
          console.log(error);
          alert("Detalles inválidos , vuelva a intentar !!");
          // this.open_snackBar('Detalles inválidos , vuelva a intentar !!', 'Aceptar')
        }
      )
    )
  }

  open_snackBar(message: string, action: string) {
    this._snack.dismiss();
    this._snack.open(message, action);
  }
}
