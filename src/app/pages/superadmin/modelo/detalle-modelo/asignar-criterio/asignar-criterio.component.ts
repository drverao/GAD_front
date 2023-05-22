import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsignacionCriterioService } from 'src/app/services/asignacion-criterio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DetalleModeloComponent } from '../detalle-modelo.component';
import { Asignacion_Criterios } from 'src/app/models/Asignacion-Criterios';

@Component({
  selector: 'app-asignar-criterio',
  templateUrl: './asignar-criterio.component.html',
  styleUrls: ['./asignar-criterio.component.css']
})
export class AsignarCriterioComponent implements OnInit {

  datasource: any;
  valorSeleccionado: number = 0;
  lista: any[] = [];

  constructor(private usuarioService: UsuarioService, private asignacionCriterio: AsignacionCriterioService, public dialogRef: MatDialogRef<DetalleModeloComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
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
      });
    });
  }

  crearAsignacion() {
    this.asignacion = new Asignacion_Criterios();
    this.asignacion.usuario.id = this.valorSeleccionado;
    this.asignacion.criterio.id_criterio = this.data.id;
    this.asignacion.visible = true;
    console.log(this.asignacion);
    this.asignacionCriterio.createAsignacion_Admin(this.asignacion).subscribe(data => {
      console.log(data);
    });
  }
}
