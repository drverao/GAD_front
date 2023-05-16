import { Evidencia } from 'src/app/models/Evidencia';
import { Archivo } from './../../../models/Archivo';
import { Actividades } from './../../../services/actividades';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActividadService } from 'src/app/services/actividad.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

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

  isLoggedIn = false;
  user: any = null;
  constructor(
    private services: ActividadService,
    private fb: FormBuilder,
    private router: Router,
    public login:LoginService,

    ) {
    this.frmActividades = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]

    })
  }
 evi:Evidencia =new Evidencia();
  ngOnInit(): void {

    const data = history.state.data;
    this.evi = data;
    if (this.evi == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

      }
    )




    this.listar();
  }

  guardar() {
    this.actividad = this.frmActividades.value;
    this.actividad.evidencia=this.evi;
    this.actividad.usuario=this.user.id;
    this.services.crear(this.actividad)
      .subscribe(
        (response) => {
          console.log('creado con éxito:', response);
          this.guardadoExitoso = true;
          this.listar();
          Swal.fire({
            title: 'Guardado con éxito',
            text: 'La actividad ha sido guardada satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        (error) => {
          console.error('Error al crear:', error);
          Swal.fire({
            title: 'Error al guardar',
            text: 'Ocurrió un error al guardar la actividad',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
  }
  editDatos(acti: Actividades) {
    this.actividad = acti;
    this.frmActividades = new FormGroup({
      nombre: new FormControl(acti.nombre),
      descripcion: new FormControl(acti.descripcion),
      fecha_inicio:new FormControl(acti.fecha_inicio),
      fecha_fin: new FormControl(acti.fecha_fin)
    });
  }

  listar(): void {
    this.services.geteviasig(this.user.username).subscribe(data => {
      this.Actividades = data;
    });
  }
  eliminar(act: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.services.eliminar(act).subscribe(
          (response) => {
            this.listar();
            Swal.fire({
              title: 'Eliminado',
              text: 'El registro ha sido eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          },
          (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire({
              title: 'Error al eliminar',
              text: 'Ocurrió un error al eliminar el registro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
      }
    });
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
        Swal.fire('Operacion exitosa!', 'El registro se actualizo con exito', 'success')
      });
  }
 archivo: Archivo=new Archivo();

  verDetalles(archivos: any) {
    this.router.navigate(['/evidenciaResponsable'], { state: { data: archivos} });
  }

}
