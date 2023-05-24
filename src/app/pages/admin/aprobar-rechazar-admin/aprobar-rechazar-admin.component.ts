import { Component, ElementRef, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/models/Evidencia';
import { Usuario2 } from 'src/app/services/Usuario2';
import { EmailServiceService } from 'src/app/services/email-service.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Tooltip } from 'bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aprobar-rechazar-admin',
  templateUrl: './aprobar-rechazar-admin.component.html',
  styleUrls: ['./aprobar-rechazar-admin.component.css'],
})
export class AprobarRechazarAdminComponent implements OnInit {
  columnas: string[] = ['id', 'descripcion', 'actions'];

  dataSource = new MatTableDataSource<Evidencia>();
  mostrarBoton = false;
  idUsuario: number = 0;
  usuarioResponsable: Usuario2[] = [];
  usuarioSeleccionado: Usuario2 = new Usuario2();
  evidencias!: Evidencia[];
  filterPost = '';
  isSending = false;
  spinnerValue = 0;
  spinnerInterval: any;
  mostrar = false;
  maxTime: number = 30;
  sent: boolean = false;
  toUser: string = '';
  subject: string = '';
  message: string = '';
  isLoggedIn = false;
  user: any = null;
  rol: any = null;
  fechaActual: Date = new Date();
  fechaFormateada: string = this.fechaActual.toLocaleDateString('es-ES');
  correoEnviar = '';
  estadoEvi = 'PENDIENTE';
  public evid = new Evidencia();
  evidenciaModificar: any;
  disableVerDetalles: boolean = false;
  disableEvaluar: boolean = false;
  observacion = '';
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;



  constructor(
    private evidenciaService: EvidenciaService,
    private router: Router,
    private emailService: EmailServiceService,
    public login: LoginService,
  ) {
  
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;

  }



  ngOnInit(): void {
    this.listaResponsable();

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  


  onSelectionChange(event: MatSelectionListChange) {
    this.usuarioSeleccionado = event.options[0].value;
    localStorage.setItem('idUsuario', this.usuarioSeleccionado.id.toString());
    localStorage.setItem(
      'nombres',
      this.usuarioSeleccionado.persona.primer_nombre +
        ' ' +
        this.usuarioSeleccionado.persona.primer_apellido
    );
    this.evidenciaService
      .geteviasig(this.usuarioSeleccionado.username)
      .subscribe((data) => {
        this.evidencias = data;
        this.dataSource.data = this.evidencias;
      });

    console.log(this.evidencias);
    this.mostrarBoton = true;
    this.correoEnviar = this.usuarioSeleccionado.persona.correo;
    this.toUser = this.correoEnviar;
  }

  listaResponsable() {
    this.evidenciaService.listarUsuario().subscribe((data) => {
      const usuariosFiltrados = data.filter(
        (usuario, index, self) =>
          index === self.findIndex((u) => u.id === usuario.id)
      );
      this.usuarioResponsable = usuariosFiltrados;
    });
  }

  verDetalles(evidencia: any) {
    if (evidencia.estado === 'pendiente') {
      this.disableVerDetalles = true;
      Swal.fire({
        title: 'Alerta',
        text: 'No se puede ver los detalles de esta tarea mientras  no sea evaluada ',
        icon: 'warning',
      });
    } else {
      console.log(evidencia);
      this.router.navigate(['/detalleAprobarRechazar'], {
        state: { data: evidencia, usuarioEnviar: this.usuarioSeleccionado },
      });
    }
  }

  Aprobado() {
    Swal.fire({
      icon: 'success',
      title: 'La tarea ha sido aprobada',
      showConfirmButton: false,
      timer: 1500,
    });
    this.mostrar = false;
    this.estadoEvi = 'Aprobada';
    this.observacion = 'N/A';
    //   this.tareaseleccionada.estado='aprobada'
  }

  Rechazado() {
    Swal.fire({
      icon: 'error',
      title: 'La tarea ha sido rechazada.',
    });
    this.estadoEvi = 'Rechazada';
    //this.tareaseleccionada.estado='rechazada'
    this.mostrar = !this.mostrar;
    this.observacion = '';
  }


 

  seleccionarTarea(element: any) {
      this.evid = element;
    

  }


  mostrarAlerta(element: any): void {

  }
  

  Limpiar() {
    this.mostrar=false
        this.evid = new Evidencia;
        this.estadoEvi = '';
        this.subject="";
        this.observacion = "";
    this.message=""
      }
    

  LimpiarModal() {
    this.mostrar=false
        this.evid = new Evidencia;
        this.estadoEvi = '';
        this.subject="";
        this.observacion = "";
    this.message=""
      }
    



  getColorByEstado(estado: string): string {
    if (estado === 'pendiente') {
      return 'rgba(255, 242, 170)';
    } else if (estado === 'Aprobada') {
      return 'rgba(96, 179, 114)';
    } else if (estado === 'Rechazada') {
      return 'rgba(253, 79, 56)';
    } else {
      return '';
    }
  }

  ModificarTarea() {
    if (this.observacion == '' || this.observacion == null) {
      Swal.fire({
        title: 'Alerta',
        text: 'Porfavor agregue alguna observación',
        icon: 'warning',
      });
    } else {
      this.evid.estado = this.estadoEvi;

      this.evidenciaService
        .actualizar(this.evid.id_evidencia, this.evid)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Registro  exitoso!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(response);
          },
          (error: any) => {
            Swal.fire({
              title: '¡Error al guardar!',
              text: 'Hubo un error al guardar la tarea.',
              icon: 'error',
              confirmButtonText: 'OK',
            });

            console.log(error);
          }
        );
    }
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
