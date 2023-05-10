import { Component } from '@angular/core';
import { ActividadService } from 'src/app/services/actividad.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Actividades } from 'src/app/services/actividades';
@Component({
  selector: 'app-actividad-autoridad',
  templateUrl: './actividad-autoridad.component.html',
  styleUrls: ['./actividad-autoridad.component.css']
})
export class ActividadAutoridadComponent {
  constructor(private services: ActividadService, private router: Router,
    private fb: FormBuilder) { }
    searchTerm: string = '';
    public actividades: Actividades[] = [];
    public actividad = new Actividades();
    filteredActividades: Actividades[] | undefined;
  ngOnInit(): void {
    this.get();
  }

  get() {
    this.services.get().subscribe((actividades) => {
      this.actividades = actividades;
      this.filterActividades(); // <-- Actualización aquí
    });
//    this.services.get()
  ///(())    .subscribe(response => this.actividades = response);
  }

  filterActividades() {
    this.filteredActividades = this.actividades.filter(
      (actividad) =>
        actividad.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        actividad.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
