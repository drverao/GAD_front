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

    public actividades: Actividades[] = [];
    public actividad = new Actividades();


  ngOnInit(): void {
    this.get();
  }

  get() {
    this.services.get()
      .subscribe(response => this.actividades = response);
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
