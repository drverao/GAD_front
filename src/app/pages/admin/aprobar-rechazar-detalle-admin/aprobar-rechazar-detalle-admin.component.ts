import { Component, OnInit } from '@angular/core';
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

  columnasDetalle: string[] = [
    'id_evidencia',
    'nombre',
    'enlace',
    'descripcion',
    'estado',
    'observaciones',
    'actions',
  ];

  dataSource3 = new MatTableDataSource<detalleEvaluacion>();

  panelOpenState = false;
  isSending = false;
  spinnerValue = 0;
  spinnerInterval: any;
  maxTime: number = 30; // Definir el tiempo máximo en segundos
  mostrarbotonDetalle = false;

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
  listadodetalleEval: detalleEvaluacion[] = [];
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
    this.detalleEvi.evidencia.id_evidencia = this.evidencia.id_evidencia;
    this.detalleEvi.usuario.id = this.user.id;

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

  MostrarBotonDetalleEvalucaion() {
    this.mostrarbotonDetalle = true;


    this.detalleEvaluaService.getDetalleEvi(this.user.id, this.evidencia.id_evidencia)
    .subscribe(
      (detalles) => {
        this.listadodetalleEval = detalles;
        console.log('datosssssss aqui ');
        console.log(this.listadodetalleEval);
        this.dataSource3.data = this.listadodetalleEval;
        console.log(this.dataSource3.data);
      },
      (error) => {
        console.log(error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  


/*
    this.detalleEvaluaService
      .getDetalleEvi(this.user.id, this.evidencia.id_evidencia)
      .subscribe(
        (detalles) => {
          this.listadodetalleEval = detalles;
          console.log('datosssssss aqui ');
          console.log(this.listadodetalleEval);

          this.dataSource3.data = this.listadodetalleEval;
          console.log(this.dataSource3.data);
        },
        (error) => {
          // manejar el error
        }
      );*/
  }




  OcultarbotonDetalleEvalucaion() {
    this.mostrarbotonDetalle = false;
  }

  enviar() {
    const startTime = new Date(); // Obtener hora actual antes de enviar el correo
    this.isSending = true;
    this.spinnerInterval = setInterval(() => {
      const endTime = new Date(); // Obtener hora actual cada segundo mientras se envía el correo
      const timeDiff = (endTime.getTime() - startTime.getTime()) / 1000; // Calcular diferencia de tiempo en segundos
      this.spinnerValue = Math.round((timeDiff / this.maxTime) * 100); // Calcular porcentaje del tiempo máximo y actualizar valor del spinner
      if (timeDiff >= this.maxTime) {
        // Si se alcanza el tiempo máximo, detener el spinner
        clearInterval(this.spinnerInterval);
      }
    }, 1000);

    this.emailService
      .sendEmail([this.toUser], this.subject, this.message)
      .subscribe(
        (response) => {
          clearInterval(this.spinnerInterval); // Detener el spinner al completar el envío
          this.isSending = false;
          const endTime = new Date(); // Obtener hora actual después de enviar el correo
          const timeDiff = (endTime.getTime() - startTime.getTime()) / 1000; // Calcular diferencia de tiempo en segundos
          console.log(
            'Email sent successfully! Time taken:',
            timeDiff,
            'seconds'
          );
          console.log('Email sent successfully!');
          Swal.fire({
            title: 'El correo se ha enviado con éxito',
            timer: 2000,
            timerProgressBar: true,
            width: '20%',
            customClass: 'custom-alert',
            position: 'top-end',
            iconHtml:
              '<span class="custom-icon"><i class="fas fa-check-circle" style="color: green;" ></i></span>',

            showConfirmButton: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
        },
        (error) => {
          clearInterval(this.spinnerInterval); // Detener el spinner si ocurre un error
          this.isSending = false;

          Swal.fire({
            title: 'No se pudo enviar el correo electrónico',
            timer: 2000,
            width: '20%',
            customClass: 'custom-alert my-custom-swal',
            timerProgressBar: true,
            position: 'top-end',
            iconHtml:
              '<span class="custom-icon" ><i class="fas fa-times-circle" style="color: red;" ></i></span>',

            showConfirmButton: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          console.error('Error sending email:', error);
        }
      );
  }
}
