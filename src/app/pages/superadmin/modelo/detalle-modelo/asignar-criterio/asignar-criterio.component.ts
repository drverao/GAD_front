import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsignacionCriterioService } from 'src/app/services/asignacion-criterio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DetalleModeloComponent } from '../detalle-modelo.component';
import { Asignacion_Criterios } from 'src/app/models/Asignacion-Criterios';
import { Notificacion } from 'src/app/models/Notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-criterio',
  templateUrl: './asignar-criterio.component.html',
  styleUrls: ['./asignar-criterio.component.css']
})
export class AsignarCriterioComponent implements OnInit {

  datasource: any;
  valorSeleccionado: number = 0;
  lista: any[] = [];
  noti = new Notificacion();
  user: any = null;
  idusuario: any = null;
  nombre: any = null;

  constructor(public login: LoginService, private notificationService: NotificacionService, private usuarioService: UsuarioService, private asignacionCriterio: AsignacionCriterioService, public dialogRef: MatDialogRef<DetalleModeloComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.usuarioService.listarAdminDatos().subscribe(data => {
      this.datasource = data;
      console.log(this.datasource);
    });
    console.log(this.data.id);
    this.asignacionCriterio.listarAsignacion_AdminPorUsuario(this.data.id).subscribe(result => {
      if (result == null) {
        return;
      }
      this.lista.push(result);
      this.valorSeleccionado = this.lista[0].usuario.id;
      console.log(this.lista[0].usuario.id);
    });

  }
  //
  notificaruser() {
    this.noti.fecha = new Date();
    this.noti.rol = "";
    this.noti.mensaje = this.user.persona.primer_nombre + " " + this.user.persona.primer_apellido + " te ha asignado el criterio " + this.nombre;
    this.noti.visto = false;
    this.noti.usuario = this.idusuario;
    console.log("El nombre es " + this.nombre)
    this.notificationService.crear(this.noti).subscribe(
      (data: Notificacion) => {
        this.noti = data;
        console.log('Notificacion guardada');
      },
      (error: any) => {
        console.error('No se pudo guardar la notificación', error);
      }
    );
  }
  //objeto Asignacion_Criterios
  asignacion: any
  guardar() {
    console.log(this.valorSeleccionado);

    this.asignacionCriterio.listarAsignacion_AdminPorUsuarioCriterio(this.data.id, this.valorSeleccionado).subscribe(result => {
      if (result == null) {
        this.crearAsignacion();
        return;
      }

      this.asignacion = result;
      console.log(this.asignacion);
      this.asignacion.visible = true;
      this.asignacionCriterio.updateAsignacion_Admin(this.asignacion.id_asignacion, this.asignacion).subscribe(data => {
        console.log(data);
        this.dialogRef.close({ data: 'Succes' });
      });
    });

    this.idusuario = this.valorSeleccionado;
    this.nombre = this.data.nombre;
    console.log("iduser" + this.idusuario);
    this.notificaruser();

  }

  crearAsignacion() {
    this.asignacion = new Asignacion_Criterios();
    this.asignacion.usuario.id = this.valorSeleccionado;
    this.asignacion.criterio.id_criterio = this.data.id;
    this.asignacion.visible = true;
    console.log(this.asignacion);
    this.asignacionCriterio.createAsignacion_Admin(this.asignacion).subscribe(data => {
      console.log(data);
      this.dialogRef.close({ data: 'Succes' });
    });
  }
}
