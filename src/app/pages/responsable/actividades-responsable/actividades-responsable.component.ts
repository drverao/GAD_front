import { Actividades } from './../../../services/actividades';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActividadService } from 'src/app/services/actividad.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actividades-responsable',
  templateUrl: './actividades-responsable.component.html',
  styleUrls: ['./actividades-responsable.component.css']
})
export class ActividadesResponsableComponent implements OnInit {
  searchText = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public actividad = new Actividades();
  Actividades: any[] = [];
  guardadoExitoso: boolean = false;
  frmActividades: FormGroup;


  constructor(
    private services: ActividadService,
    private fb: FormBuilder,
  ) {
    this.frmActividades = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.listar();
  }

  editDatos(acti: Actividades) {
    // this.crite.id_criterio = criterio.id_criterio
    //this.actividad.nombre = acti.nombre
    //this.actividad.descripcion = acti.descripcion
    this.actividad = acti;
    this.frmActividades = new FormGroup({
      nombre: new FormControl(acti.nombre),
      descripcion: new FormControl(acti.descripcion)

    });
  }

  guardar() {
    this.actividad = this.frmActividades.value;
    this.services.crear(this.actividad)
      .subscribe(
        (response) => {
          console.log('creado con éxito:', response);
          this.guardadoExitoso = true;
          this.listar();
        },
        (error) => {
          console.error('Error al crear:', error);
        }
      );

  }

  listar(): void {
    this.services.get().subscribe(
      (data: any[]) => {
        this.Actividades = data;
      },
      (error: any) => {
        console.error('Error al listar:', error);
      }
    );
  }
  eliminar(act: any) {
    this.services.eliminar(act).subscribe(
      (response) => {
        this.listar()
      }
    );

  }
  limpiarFormulario() {
    this.frmActividades.reset();
    this.actividad = new Actividades;
  }

  actualizar() {
    this.actividad.nombre = this.frmActividades.value.nombre;
    this.actividad.descripcion = this.frmActividades.value.descripcion;
    this.actividad.fecha_inicio = this.frmActividades.value.fecha_inicio;
    this.actividad.fecha_fin = this.frmActividades.value.fecha_fin;
    this.services.update(this.actividad.id_actividad, this.actividad)
      .subscribe(response => {
        this.actividad = new Actividades();
        this.listar();
      });
  }
  

}
