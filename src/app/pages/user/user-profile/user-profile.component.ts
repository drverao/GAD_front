import { Component, OnInit } from '@angular/core';
import { Usuario2 } from 'src/app/services/Usuario2';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  rol: any = null;

  usuariosEditGuar = new Usuario2();
  constructor(public login: LoginService,
    private usuariosService: UsuarioService,
  ) { }
  ngOnInit() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
    this.rol = this.login.getUserRole();
  }

  Actualizar(usuariosdit: Usuario2) {
    console.log(usuariosdit)
    usuariosdit.id = this.user.id;
    console.log(usuariosdit)
    this.user.password = usuariosdit.password;
    Swal.fire({
      title: 'Esta seguro de cambiar su contraseña?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.actualizar(usuariosdit.id, usuariosdit)
          .subscribe((response: any) => {
            Swal.fire({
              title: 'La contraseña ha sido modificada con exito, sera enviado al login',
              confirmButtonText: 'Ok',
              icon: 'info',
            }).then((result) => {
              if (result.isConfirmed) {

                this.login.logout();
                location.replace('/login');
              }
            })
          });
      } else {
        Swal.fire('Se ha cancelado la operación', '', 'info')
      }
    })


  }
}
