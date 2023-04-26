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

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('El username de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    else if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La passwordseña es requerida !!', 'Aceptar', {
        duration: 3000
      })
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
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'RESPONSABLE') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['actividad']);
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'SUPERADMIN') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'AUTORIDAD') {
              //user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            }
            else {
              this.loginService.logout();
            }
          })
        }, (error) => {
          console.log(error);
          this.snack.open('Detalles inválidos , vuelva a intentar !!', 'Aceptar', {
            duration: 3000
          })
        }
      )
    )
  }
}
