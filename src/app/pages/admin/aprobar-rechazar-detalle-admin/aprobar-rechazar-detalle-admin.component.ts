import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { Notificacion } from 'src/app/models/Notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';

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
    'iddetalle',
    'evi',
    'observacion',
    'estado',
    'fecha',
    'usua',
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
  noti=new Notificacion();
  idusuario:any=null;
  nombre:any=null;
  correoEnviar = '';
  estadoEviModi = 'false';
  detalleSeleccionado: detalleEvaluacion = new detalleEvaluacion();

  constructor(
    private services: ActividadService,
    private router: Router,
    private detalleEvaluaService: DetalleEvaluacionService,
    private emailService: EmailServiceService,
    private archivo: ArchivoService,
    public login: LoginService,
    private notificationService:NotificacionService
  ) {}

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }
  ngOnInit(): void {
    const data = history.state.data;
    const usuarioResponsable = history.state.usuarioEnviar;
    this.evidencia = data;
    this.usuarioCorreo = usuarioResponsable;
    this.correoEnviar = this.usuarioCorreo.persona.correo;
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

  //
  notificarrechazo() {
    this.noti.fecha = new Date();
    this.noti.rol = "SUPERADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha rechazado la evidencia " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.usuario =  0;

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

  notificarrechazouser() {
    this.noti.fecha = new Date();
    this.noti.rol = "";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha rechazado tu evidencia " + this.detalleEvi.evidencia.nombre;
    this.noti.visto = false;
    this.noti.usuario =  this.detalleEvi.usuario.id ;

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
  
  notificarrechazoadmin() {
    this.noti.fecha = new Date();
    this.noti.rol = "ADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha rechazado la evidencia " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.visto = false;
    this.noti.usuario = 0;

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
  //
  notificaraprobacion() {
    this.noti.fecha = new Date();
    this.noti.rol = "SUPERADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha aprobado la evidencia " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.usuario =  0;

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

  notificaraprobacionuser() {
    this.noti.fecha = new Date();
    this.noti.rol = "";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" aprobo tu evidencia " + this.detalleEvi.evidencia.nombre;
    this.noti.visto = false;
    this.noti.usuario =  this.detalleEvi.usuario.id ;

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
  
  notificaraprobacionadmin() {
    this.noti.fecha = new Date();
    this.noti.rol = "ADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha aprobado la evidencia " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.visto = false;
    this.noti.usuario = 0;

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
  //
  notificar() {
    this.noti.fecha = new Date();
    this.noti.rol = "SUPERADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha agregado una observacion para " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.usuario =  0;

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

  notificaruser() {
    this.noti.fecha = new Date();
    this.noti.rol = "";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" agrego una observación a tu evidencia " + this.detalleEvi.evidencia.nombre;
    this.noti.visto = false;
    this.noti.usuario =  this.detalleEvi.usuario.id ;

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
  
  notificaradmin() {
    this.noti.fecha = new Date();
    this.noti.rol = "ADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha agregado una observacion para " + this.detalleEvi.evidencia.nombre
    +" de "+this.detalleEvi.usuario.persona.primer_nombre+" "+this.detalleEvi.usuario.persona.primer_apellido;
    this.noti.visto = false;
    this.noti.usuario = 0;

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
  //
  listar(): void {
    this.services.getEviAsig(this.evidencia.id_evidencia).subscribe((data) => {
      this.listadoActividad = data;
      
      this.dataSource.data = this.listadoActividad;
    });
  }

  listarArchivo(element: any) {
    this.archivo.getarchivoActividad(element.id_actividad).subscribe((data) => {
      this.archivoSe = data;
      this.dataSource2.data = this.archivoSe;
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
    this.detalleEvi.observacion = 'Ninguna';
    this.notificaraprobacion();
    this.notificaraprobacionadmin();
    this.notificaraprobacionuser();
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
    this.notificarrechazo();
    this.notificarrechazoadmin();
    this.notificarrechazouser();
  }

  Guardar() {
    this.detalleEvi.evidencia.id_evidencia = this.evidencia.id_evidencia;
    this.detalleEvi.usuario.id = this.user.id;
    if (
      this.detalleEvi.estado != null &&
      this.detalleEvi.observacion != null &&
      this.detalleEvi.observacion != ''
    ) {
      this.detalleEvaluaService
        .create(this.detalleEvi)
        .subscribe((data) =>
          Swal.fire(
            'Guardado con éxito!',
            'Observaciones guardado con éxito',
            'success'
          )
        );
      this.notificar();
      this.notificaradmin();
      this.notificaruser();
      this.ListarDetalle();
    } else {
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
    this.ListarDetalle();
  }

  ListarDetalle() {
    this.detalleEvaluaService
      .getDetalleEvi(this.evidencia.id_evidencia, this.user.id)
      .subscribe(
        (detalles) => {
          this.listadodetalleEval = detalles;
          if (detalles.length > 0) {
            this.dataSource3.data = detalles;
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  OcultarbotonDetalleEvalucaion() {
    this.mostrarbotonDetalle = false;
  }

  Editar(element: any) {
   // console.log('elemento seleccionado:', element);
    element=this.detalleSeleccionado;

    console.log("Datossssssssssss")
    console.log(this.detalleSeleccionado)
  }

  actualizar() {
    this.detalleSeleccionado.usuario.id = this.user.id;
    this.detalleSeleccionado.evidencia.id_evidencia =
      this.evidencia.id_evidencia;
    console.log(this.detalleSeleccionado);
    if (
      this.detalleSeleccionado.fecha != null &&
      this.detalleSeleccionado.observacion != '' &&
      this.detalleSeleccionado.estado != null
    ) {
      this.detalleEvaluaService
        .actualizar(
          this.detalleSeleccionado.id_detalle_evaluacion,
          this.detalleSeleccionado
        )
        .subscribe((response) => {
          this.detalleSeleccionado = new detalleEvaluacion();
          Swal.fire(
            'Guardado con éxito!',
            'Observaciones guardado con éxito',
            'success'
          );
        });
    } else {
      Swal.fire(
        'Existen campos vacios',
        'Porfavor llene todos los campos',
        'warning'
      );
    }
  }
  Eliminar(element: any) {
    const id = element.id_detalle_evaluacion;

    Swal.fire({
      title: 'Desea eliminarlo?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleEvaluaService.eliminar(id).subscribe((response) => {
          this.ListarDetalle();
        });

        Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
      }
    });
  }

  Aprobado2() {
    Swal.fire({
      icon: 'success',
      title: 'La evidencia ha sido aprobada',
      showConfirmButton: false,
      timer: 1500,
    });
    this.estadoEviModi = 'Evidencia Aprobada';
    this.detalleSeleccionado.estado = true;
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
