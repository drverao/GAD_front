import { NotificacionService } from 'src/app/services/notificacion.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/Notificacion';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DatePipe]
})
export class NavbarComponent implements OnInit {
  numNotificacionesSinLeer: number = 0;
  showNotificationsModal = false;
  isLoggedIn = false;
  user:any = null;
  noti=new Notificacion();
  notificaciones: Notificacion[] = [];

  constructor(public login:LoginService, private notificationService:NotificacionService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    );
    
    this.listarnot(this.user.id)
  }

  listarnot(id:any){
    
    this.notificationService.getNotificaciones(id)
    .subscribe((data: Notificacion[]) => {
      this.notificaciones = data;
      this.numNotificacionesSinLeer = this.notificaciones.filter(n => !n.visto).length;
    },
      (error:any)=>{
        console.error('No se pudo listar las notificaciones')
      }
    );
  }

  public logout(){
    this.login.logout();
    location.replace('/login');
  }

  perfil(){
    location.replace('/admin');
  }
  
  openNotifications(id:any) {
    this.listarnot(id);
 
  // Marcar todas las notificaciones como "vistas" o "leídas"
  this.notificaciones.forEach((n) => {
    if (!n.visto) {
      n.visto = true;
      // Actualizar el estado de la notificación en el servidor
      this.notificationService.actualizar(n.id).subscribe(() => {
        console.log(`Notificación ${n.id} actualizada`);
      });
    }
  });

  // Actualizar el contador de notificaciones sin leer
  this.numNotificacionesSinLeer = 0;
  }

  closeNotifications(){
    this.showNotificationsModal = false;
  }

  toggleNotifications() {
    this.showNotificationsModal = !this.showNotificationsModal;
  }
  
}
