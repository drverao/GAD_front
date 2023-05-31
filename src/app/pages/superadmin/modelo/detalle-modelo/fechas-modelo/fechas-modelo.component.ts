import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Modelo } from 'src/app/models/Modelo';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fechas-modelo',
  templateUrl: './fechas-modelo.component.html',
  styleUrls: ['./fechas-modelo.component.css']
})
export class FechasModeloComponent implements OnInit {

  constructor(private dilogRef: MatDialogRef<FechasModeloComponent>,
    private modeloService: ModeloService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.modelo = this.data.data;
    console.log(this.modelo);
  }

  modelo: Modelo = new Modelo();

  cerrar() {

    this.modelo.fecha_final_act = new Date(this.convertirFecha(this.modelo.fecha_final_act));
    this.modelo.fecha_inicio = new Date(this.convertirFecha(this.modelo.fecha_inicio));
    this.modelo.fecha_fin = new Date(this.convertirFecha(this.modelo.fecha_fin));
    console.log(this.modelo.fecha_final_act);
    if (this.modelo.fecha_final_act < this.modelo.fecha_fin && this.modelo.fecha_final_act > this.modelo.fecha_inicio) {
      this.modeloService.actualizar(this.modelo).subscribe(result => {
        console.log(result);
        this.dilogRef.close({ event: 'Success' });
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha de finalización de actividades del modelo debe estar entre la fecha de inicio y la fecha de finalización del modelo',
      })
    }
  }

  //metodo que devuelva una fecha formateada a este formato 2021-06-30T05:00:00.000+00:00
  convertirFecha(fecha: any) {
    let fechaFormato = moment(fecha).format('YYYY-MM-DDTHH:mm:ss.SSS+00:00');
    return fechaFormato;
  }

}
