import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit{
  menuItems?:any[];

  isLoggedIn = false;
  user:any = null;
  rol:any=null;
  ruta:any=null;

  constructor(private sidebarService:SidebarService, private router:Router,public login:LoginService) { 
    //this.menuItems = this.sidebarService.menu;
    //console.log(this.menuItems)

    this.isLoggedIn = this.login.isLoggedIn();
    // this.user = this.login.getUser();
    // this.rol = this.login.getUserRole();
    // this.login.loginStatusSubjec.asObservable().subscribe(
    //   data => {
    //     this.isLoggedIn = this.login.isLoggedIn();
    //     this.user = this.login.getUser();
    //     this.rol = this.login.getUserRole();
    //     // if (this.rol == 'ADMIN') {
    //     //   this.menuItems = this.sidebarService.menu;
    //     //   this.ruta='admin';
    //     // }
    //     // else if (this.rol == 'SUPERADMIN') {
    //     //   this.menuItems = this.sidebarService.menu2
    //     //   this.ruta='usuarios';
    //     // }
    //     // else if (this.rol == 'RESPONSABLE') {
    //     //   this.menuItems = this.sidebarService.menu3
    //     //   this.ruta='actividad'; 
    //     // }
    //     // else if (this.rol == 'AUTORIDAD') {
    //     //   this.menuItems = this.sidebarService.menu4
    //     //   this.ruta='consulta';
    //     // }
    //     this.cargar();
    //     console.log(this.rol);
    //   }
   // )

    
  }

  
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.rol = this.login.getUserRole();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        this.rol = this.login.getUserRole();
        if (this.rol == 'ADMIN') {
          this.menuItems = this.sidebarService.menu;
          this.ruta='admin';
        }
        else if (this.rol == 'SUPERADMIN') {
          this.menuItems = this.sidebarService.menu2
          this.ruta='usuarios';
        }
        else if (this.rol == 'RESPONSABLE') {
          this.menuItems = this.sidebarService.menu3
          this.ruta='actividad'; 
        }
        else if (this.rol == 'AUTORIDAD') {
          this.menuItems = this.sidebarService.menu4
          this.ruta='consulta';
        }
        console.log(this.rol);
      }
    )
  }

  

  logout(){
    this.router.navigateByUrl('/login');
  }

  cargar(){
    this.rol = this.login.getUserRole();
        if (this.rol == 'ADMIN') {
          this.menuItems = this.sidebarService.menu;
          this.ruta='admin';
        }
        else if (this.rol == 'SUPERADMIN') {
          this.menuItems = this.sidebarService.menu2
          this.ruta='usuarios';
        }
        else if (this.rol == 'RESPONSABLE') {
          this.menuItems = this.sidebarService.menu3
          this.ruta='actividad'; 
        }
        else if (this.rol == 'AUTORIDAD') {
          this.menuItems = this.sidebarService.menu4
          this.ruta='consulta';
        }
        console.log(this.rol);
  }
}
