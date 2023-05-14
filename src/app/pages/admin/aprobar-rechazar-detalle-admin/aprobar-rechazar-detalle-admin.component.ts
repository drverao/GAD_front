import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { detalleEvaluacion } from 'src/app/models/DetalleEvaluacion';
import { Evidencia } from 'src/app/models/Evidencia';
import { ActividadService } from 'src/app/services/actividad.service';
import { Actividades } from 'src/app/services/actividades';
import { DetalleEvaluacionService } from 'src/app/services/detalle-evaluacion.service';
import { EmailServiceService } from 'src/app/services/email-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ArchivoService } from 'src/app/services/archivo.service';
import { Archivo } from 'src/app/models/Archivo';
import { LoginService } from 'src/app/services/login.service';
import { Usuario2 } from 'src/app/services/Usuario2';

@Component({
  selector: 'app-aprobar-rechazar-detalle-admin',
  templateUrl: './aprobar-rechazar-detalle-admin.component.html',
  styleUrls: ['./aprobar-rechazar-detalle-admin.component.css'],
})
export class AprobarRechazarDetalleAdminComponent implements OnInit {
  columnas: string[] = [
    'idactividad',
    'nombre',
    'descripcion',
    'fechainicio',
    'fechafin',
    'actions',
  ];

  columnasArchi: string[] = [
    'idArchivo',
    'nombreArchi',
    'descripcionArchi',
    'enlace',
  ];

  evidencia: Evidencia = new Evidencia();
  dataSource = new MatTableDataSource<Actividades>();
  dataSource2 = new MatTableDataSource<Archivo>();
  usuarioCorreo: Usuario2 = new Usuario2();
  issloading = true;
  isexist?: boolean;
  isLinear = true;
  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;
  sent: boolean = false;
  toUser: string = '';
  subject: string = '';
  message: string = '';
  mostrar = false;
  filterPost = '';
  detalleEvi: detalleEvaluacion = new detalleEvaluacion();
  fechaActual: Date = new Date();
  fechaFormateada: string = this.fechaActual.toLocaleDateString('es-ES');
  estadoEvi = '';
  limpiar = '';
  listadoActividad: Actividades[] = [];
  archivoSe: Archivo[] = [];
  nombreActividad = '';
  isLoggedIn = false;
  user: any = null;
  correoEnviar = '';
  constructor(
    private services: ActividadService,
    private router: Router,
    private detalleEvaluaService: DetalleEvaluacionService,
    private emailService: EmailServiceService,
    private _snackBar: MatSnackBar,
    private archivo: ArchivoService,
    public login: LoginService
  ) {}

  ngOnInit(): void {
    const data = history.state.data;
    const usuarioResponsable = history.state.usuarioEnviar;
    this.evidencia = data;
    this.usuarioCorreo = usuarioResponsable;
    //console.log('usuario correo');
   // console.log(this.usuarioCorreo);
    this.correoEnviar = this.usuarioCorreo.persona.correo;
   // console.log(this.correoEnviar);
    this.toUser = this.correoEnviar;

    if (this.evidencia == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }

    if (this.usuarioCorreo == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }

    this.listar();

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  acti!: Actividades[];

  listar(): void {
    this.services.getEviAsig(this.evidencia.id_evidencia).subscribe((data) => {
      this.listadoActividad = data;
      //console.log("datosasssssssssss")
      //  console.log(this.listadoActividad)
      //   console.log("Datossssssssssss")
      // console.log(this.acti)
      this.dataSource.data = this.listadoActividad;
    });
  }

  listarArchivo(element: any) {
    this.archivo.getarchivoActividad(element.id_actividad).subscribe((data) => {
      this.archivoSe = data;
      console.log('datos');
      console.log(this.archivoSe);

      this.dataSource2.data = this.archivoSe;
      /*
      if (data.length === 0) {
        console.log('La variable data está vacía');
      } else {
        console.log('La variable data contiene elementos');
      }*/
    });

    this.nombreActividad = element.nombre;
  }

  Aprobado() {
    Swal.fire({
      icon: 'success',
      title: 'La evidencia ha sido aprobada',
      showConfirmButton: false,
      timer: 1500,
    });
    this.mostrar = false;

    this.estadoEvi = 'Evidencia Aprobada';
    this.detalleEvi.estado = true;
    this.detalleEvi.observacion = 'Ninguna';
  }

  Rechazado() {
    Swal.fire({
      icon: 'error',
      title: 'La evidencia ha sido rechazada.',
    });
    this.estadoEvi = 'Evidencia Rechazada';
    this.detalleEvi.observacion = '';

    this.detalleEvi.estado = false;
    this.mostrar = !this.mostrar;
  }

  Guardar() {

    this.detalleEvi.evidencia.id_evidencia=this.evidencia.id_evidencia;
    this.detalleEvi.usuario.username=this.user.username;

    console.log('DATOSSSSSSSSSSSS');
    console.log(this.detalleEvi);

    if (
      this.detalleEvi.estado != null &&
      this.detalleEvi.observacion != null &&
      this.detalleEvi.observacion != ''
    )
      this.detalleEvaluaService
        .create(this.detalleEvi)
        .subscribe((data) =>
          Swal.fire(
            'Guardado con éxito!',
            'Observaciones guardado con éxito',
            'success'
          )
        );
    else {
      Swal.fire(
        'No agregó ninguna observación',
        'Porfavor agregue alguna',
        'warning'
      );
    }




  }

  Limpiar() {
    this.detalleEvi.observacion = '';
  }

  enviar() {
    this.emailService
      .sendEmail([this.toUser], this.subject, this.message)
      .subscribe(
        (response) => {
          console.log('Email sent successfully!');
          this.openSnackBar(
            'El correo electrónico se envió correctamente.',
            'Cerrar'
          );
        },
        (error) => {
          console.error('Error sending email:', error);
          this.openSnackBar(
            'No se pudo enviar el correo electrónico.',
            'Cerrar'
          );
        }
      );
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
