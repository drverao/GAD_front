import { Component, ViewChild } from '@angular/core';
import { Actividades } from '../../../services/actividades';
import { ActividadService } from 'src/app/services/actividad.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {

  @ViewChild('materiaModalRef') materiaModalRef: any;

  public actividades: Actividades[] = [];
  public actividad = new Actividades();

  editActividad(actividad: Actividades) {
    this.actividad.id_actividad = actividad.id_actividad
    this.actividad.nombre = actividad.nombre
    this.actividad.descripcion = actividad.descripcion
    this.actividad.fecha_inicio = actividad.fecha_inicio
    this.actividad.fecha_fin = actividad.fecha_fin
    this.materiaModalRef.nativeElement.querySelector('[name="nombre"]').value = actividad.nombre;
    this.materiaModalRef.nativeElement.querySelector('[name="descripcion"]').value = actividad.descripcion;
    this.materiaModalRef.nativeElement.querySelector('[name="fecha_inicio"]').value = actividad.fecha_inicio;
    this.materiaModalRef.nativeElement.querySelector('[name="fecha_fin"]').value = actividad.fecha_fin;
  }

  constructor(private services: ActividadService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.services.get()
      .subscribe(response => this.actividades = response);
  }

  deleteRecord(id: number) {
    console.log('Se ha hecho clic en Delete')
    this.services.deleteMyRecord(id)
      .subscribe(() => {
        this.actividades = this.actividades.filter(record => record.id_actividad !== id);
      });
  }
  create() {
    let fechaInicio = new Date(this.actividad.fecha_inicio + 'T00:00:00-05:00');
    let fechaFin = new Date(this.actividad.fecha_fin + 'T00:00:00-05:00');

    // Sumar un día a la fecha de inicio

    // Sumar un día a la fecha de fin

    this.actividad.fecha_inicio = fechaInicio.toISOString();
    this.actividad.fecha_fin = fechaFin.toISOString();

    this.services.create(this.actividad).subscribe(response => {
      this.get();
    });
  }



  update() {
    console.log('actividad: ', this.actividad); // <-- Agregar línea de depuración
    let fechaInicio = new Date(this.actividad.fecha_inicio + 'T00:00:00-05:00');
    let fechaFin = new Date(this.actividad.fecha_fin + 'T00:00:00-05:00');

    // Sumar un día a la fecha de inicio

    // Sumar un día a la fecha de fin

    this.actividad.fecha_inicio = fechaInicio.toISOString();
    this.actividad.fecha_fin = fechaFin.toISOString();
    this.services.update(this.actividad.id_actividad, this.actividad)
      .subscribe(response => {
        console.log('response: ', response); // <-- Agregar línea de depuración
        this.actividad = response; // <-- Actualizar la variable actividad con la respuesta del servicio
        this.get();
      }, error => {
        console.log('error: ', error); // <-- Agregar línea de depuración
      });
  }

  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.services.search(inputValue)
      .subscribe(response => {
        this.actividades = response;
        console.log(response)
      });
  }



}
