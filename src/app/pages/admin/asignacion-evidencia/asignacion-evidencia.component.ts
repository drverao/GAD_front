import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap, throwError } from 'rxjs';
import { Asigna_Evi } from 'src/app/models/Asignacion-Evidencia';
import { Evidencia } from 'src/app/models/Evidencia';
import { Fenix } from 'src/app/models/Fenix';
import { Notificacion } from 'src/app/models/Notificacion';
import { Persona2 } from 'src/app/services/Persona2';
import { Rol } from 'src/app/services/Rol';
import { Usuario2 } from 'src/app/services/Usuario2';
import { AsignaEvidenciaService } from 'src/app/services/asigna-evidencia.service';
import { AsignacionResponsableService } from 'src/app/services/asignacion-responsable.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { FenixService } from 'src/app/services/fenix.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
let ELEMENT_DATA: Fenix[] = [];
@Component({
  selector: 'app-asignacion-evidencia',
  templateUrl: './asignacion-evidencia.component.html',
  styleUrls: ['./asignacion-evidencia.component.css']
})
export class AsignacionEvidenciaComponent implements OnInit {
  columnas: string[] = ['id', 'nombre', 'usuario', 'actions'];
  columnasEvidencia: string[] = ['idevi', 'descripcion', 'actions'];
  columnasEvidenciaAsignacion: string[] = ['idasigna', 'usuario', 'descripcion', 'actions'];

  usuarioGuardar = new Usuario2();
  dataSource2 = new MatTableDataSource<Usuario2>();
  dataSource3 = new MatTableDataSource<Evidencia>();
  dataSource4 = new MatTableDataSource<Asigna_Evi>();
  fenix: Fenix = new Fenix();
  listaPersonas: Persona2[] = [];
  listaUsuarios: Usuario2[] = [];
  listaUsuariosResponsables: Usuario2[] = [];
  listaEvidencias: Evidencia[] = [];

  listaAsignaEvidencias: Asigna_Evi[] = [];
  filterPost = '';
  personaSele = new Persona2();
  evidenciaSele = new Evidencia();
  usuarioSele = new Usuario2();
  usuariosEdit = new Usuario2();
  usuariosEditGuar = new Usuario2();
  asignacion = new Asigna_Evi();
  formulario: FormGroup;
  roles = [
    { rolId: 3, rolNombre: 'RESPONSABLE' },
  ];
  public rol = 0;
  mostrarbotonDetalle = false;
  @ViewChild('paginator') paginator?: MatPaginator;
  @ViewChild('paginator2') paginator2?: MatPaginator;
  @ViewChild('paginator3') paginator3?: MatPaginator;
  isLoggedIn = false;
  user: any = null;
  //
  noti=new Notificacion();
  idusuario:any=null;
  nombre:any=null;
  nombreasignado:any=null;
  ngAfterViewInit() {
     // Usuarios
     this.dataSource2.paginator = this.paginator|| null
     // Evidencias
     this.dataSource3.paginator = this.paginator2|| null
     // Asignaciones
     this.dataSource4.paginator = this.paginator3|| null


    this.listar();

    this.Listado();
  }

  constructor(
    private personaService: PersonaService,
    private usuariosService: UsuarioService,
    private fenix_service: FenixService,
    private responsableService: AsignacionResponsableService,
    private evidenciaService: EvidenciaService,
    private asignarEvidenciaService: AsignaEvidenciaService,
    private formBuilder: FormBuilder,
    public login: LoginService,
    private notificationService:NotificacionService
  ) {
    this.formulario = this.formBuilder.group({
      username: { value: '', disabled: true },
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

      }
    )

    this.personaService.getPersonas().subscribe(
      listaPerso => this.listaPersonas = listaPerso);


    this.listar();

    this.Listado();


  }

  notificar() {
    this.noti.fecha = new Date();
    this.noti.rol = "SUPERADMIN";
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha asignado la evidencia " + this.nombreasignado
    +" a "+this.nombre;
    this.noti.visto = false;
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
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" te ha asignado la evidencia " + this.nombreasignado;
    this.noti.visto = false;
    this.noti.usuario =  this.idusuario;

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
    this.noti.mensaje = this.user.persona.primer_nombre+" "+this.user.persona.primer_apellido+" ha asignado la evidencia " + this.nombreasignado
    +" a "+this.nombre;
    this.noti.visto = false;
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

  displayedColumns: string[] = [
    'cedula',
    'primer_apellido',
    'segundo_apellido',
    'primer_nombre',
    'segundo_nombre',
    'celular',
    'acciones'];

  dataSource = ELEMENT_DATA;


  //consumir servicio de fenix para obtener datos de la persona por cedula
  public consultarPorCedula() {
    if (this.fenix.cedula == null || this.fenix.cedula == '') {
      Swal.fire('Error', 'Debe ingresar una cedula', 'error');
      return;
    }
    console.log('si entra');
    this.fenix_service.getDocenteByCedula(this.fenix.cedula).subscribe(
      (result) => {
        this.dataSource = result;
        console.log(this.dataSource);
      }
    )
  }

  //consumir servicio de fenix para obtener datos de la persona por primer_apellido
  public consultarPorApellido() {
    if (this.fenix.primer_apellido == null || this.fenix.primer_apellido == '') {
      Swal.fire('Error', 'Debe ingresar un apellido', 'error');
      return;
    }
    this.fenix_service.getDocenteByPrimerApellido(this.fenix.primer_apellido).subscribe(
      (result) => {
        this.dataSource = result;
      }
    )
  }

  //consumir servicio de fenix para obtener datos de la persona por segundo_apellido
  public consultarPorSegundoApellido() {
    if (this.fenix.segundo_apellido == null || this.fenix.segundo_apellido == '') {
      Swal.fire('Error', 'Debe ingresar un apellido', 'error');
      return;
    }
    this.fenix_service.getDocenteBySegundoApellido(this.fenix.segundo_apellido).subscribe(
      (result) => {
        this.dataSource = result;
      }
    )
  }
  //metodo para obtener docentes por primer_apellido y segundo_apellido
  public consultarPorPrimerApellidoAndSegundoApellido() {
    if ((this.fenix.primer_apellido == null || this.fenix.primer_apellido == '') && (this.fenix.segundo_apellido == null || this.fenix.segundo_apellido == '')) {
      Swal.fire('Error', 'Debe ingresar un apellido', 'error');
      return;
    }
    this.fenix_service.getDocenteByPrimerApellidoAndSegundoApellido(this.fenix.primer_apellido, this.fenix.segundo_apellido).subscribe(
      (result) => {
        this.dataSource = result;
      }
    )
  }


  //crear un metodo que una los servicios de cedula, primer_apellido y segundo_apellido
  public consultar() {
    if (this.fenix.cedula != null && this.fenix.cedula != '') {
      this.consultarPorCedula();
    } else if ((this.fenix.primer_apellido != null && this.fenix.primer_apellido != '') && (this.fenix.segundo_apellido != null && this.fenix.segundo_apellido != '')) {
      console.log('si entra');
      this.consultarPorPrimerApellidoAndSegundoApellido();
    } else if (this.fenix.primer_apellido != null && this.fenix.primer_apellido != '') {
      this.consultarPorApellido();
    } else if (this.fenix.segundo_apellido != null && this.fenix.segundo_apellido != '') {
      this.consultarPorSegundoApellido();
    } else {
      Swal.fire('Error', 'Debe ingresar un valor a buscar', 'error');
      return;
    }
  }




  aplicarFiltro() {
    if (this.filterPost) {
      const lowerCaseFilter = this.filterPost.toLowerCase();
      this.dataSource2.data = this.dataSource2.data.filter((item: any) => {
        return JSON.stringify(item).toLowerCase().includes(lowerCaseFilter);
      });
    } else {
      // Restaurar los datos originales si no hay filtro aplicado
      this.dataSource2.data = this.listaUsuarios;;
    }
  }




  public seleccionar(element: any) {

    this.personaSele.cedula = element.cedula;
    this.personaSele.primer_apellido = element.primer_apellido;
    this.personaSele.segundo_apellido = element.segundo_apellido;
    this.personaSele.primer_nombre = element.primer_nombre;
    this.personaSele.segundo_nombre = element.segundo_nombre;
    this.personaSele.celular = element.celular;
    this.personaSele.correo = element.correo;
    this.personaSele.direccion = element.direccion;
    console.log(this.personaSele);
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.persona = this.personaSele;
  }





  public seleccionarUsuario(element: any) {
    this.usuarioSele.id = element.id;
    this.usuarioSele.username = element.username;
    this.usuarioSele.password = element.password
    this.usuarioSele.persona.primer_nombre = element.persona.primer_nombre;
    this.usuarioSele.persona.primer_apellido = element.persona.primer_apellido;

  }

  public AsignaUsuario(element: any) {
    this.asignacion.evidencia.id_evidencia = element.id_evidencia;
    this.nombreasignado=element.descripcion;
    this.asignacion.usuario.id = this.usuarioSele.id
    console.log(this.asignacion)
    this.asignarEvidenciaService.createAsigna(this.asignacion)
      .subscribe(
        (response) => {

          this.listar();
          this.Listado();
          
          this.nombre=this.usuarioSele.persona.primer_nombre+" "+this.usuarioSele.persona.primer_apellido;
          this.idusuario=this.usuarioSele.id;
          console.log("Nombre asignado "+this.nombreasignado+ " Nombre "+this.nombre+" id: "+this.idusuario);
          this.notificar();
          this.notificaradmin();
          this.notificaruser();
          Swal.fire(
            'Exitoso',
            'Se ha completado la asignación con exito',
            'success'
          )
        },
        (error) => {
          console.error('Error al asignar usuario', error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error',
            'warning'
          )
        }
      );



  }


  MostrarBotonDetalleEvalucaion() {
    this.mostrarbotonDetalle = true;
    this.ListarAsignacion();
  }
  OcultarbotonDetalleEvalucaion() {
    this.mostrarbotonDetalle = false;
  }


  ListarAsignacion() {
    this.asignarEvidenciaService.listarAsignarEvi().subscribe(
      listaAsig => {
        this.listaAsignaEvidencias = listaAsig;
        this.dataSource4.data = this.listaAsignaEvidencias;

      }
    );


  }

  Listado() {
    this.responsableService.listarUsuarioAdmin().subscribe(
      listaUsua => {
        this.listaUsuariosResponsables = listaUsua;
        this.dataSource2.data = this.listaUsuariosResponsables;
        console.log(this.listaUsuariosResponsables);
      }
    );
  }


  public seleccionar2(element: any) {
    this.personaSele = element;
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.persona.id_persona = this.personaSele.id_persona;
  }

  EditarUsuari(usuariossssss: Usuario2): void {
    this.usuariosEdit = usuariossssss
  }


  limpiarFormulario() {
  }



  registrarUsuario() {
    console.log(this.usuarioGuardar)
    this.personaService.findByCedula(this.personaSele.cedula).subscribe(
      (data2: Persona2) => {
        if (!data2) { // Si no se encuentra ningún resultado
          this.personaService.createPersona(this.personaSele).subscribe(
            (data) => {
              console.log(data);
              this.usuarioGuardar.username = data.cedula;
              this.usuarioGuardar.persona = data;
              this.crearUsuario();
            },
            (error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'No se pudo registrar persona',
                text: 'Error al registrar!',
                footer: '<a href=""></a>',
              });
            }
          );
        } else {
          // Aquí puedes agregar código adicional para manejar el caso cuando se encuentra una persona con la misma cédula
          this.usuarioGuardar.username = data2.cedula;
          this.usuarioGuardar.persona = data2;
          this.crearUsuario();
        }
      },
      (error: any) => {
        console.error('Error al listar los indicadors:', error);
      }
    );
  }
  crearUsuario() {
    
    console.log(this.usuarioGuardar)
    this.usuariosService.createUsuario(this.usuarioGuardar, this.rol).subscribe(
      () => {
        Swal.fire(
          'Usuario Registrado!',
          'El usuario ha sido registrado éxitosamente',
          'success'
        );
        this.Listado();

        this.formulario.reset();
        this.formulario.markAsPristine();
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar usuario',
          text: 'Error al registrar!',
          footer: '<a href=""></a>',
        });
      }
    );
  }



  guardarUsuario() {
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.password = this.formulario.value.password;
    this.rol = 3;
    console.log(this.usuarioGuardar.username)
    console.log(this.usuarioGuardar.password)
    console.log(this.rol)
    if (!this.usuarioGuardar.username || !this.usuarioGuardar.password || !this.rol) {
      Swal.fire('Campos Vacios', 'Por favor llene todos los campos', 'warning');
      return;
    }

    this.usuariosService.obtenerUsuario(this.usuarioGuardar.username).pipe(
      tap((existeUsuario: boolean) => {
        if (existeUsuario) {
          Swal.fire('Usuario existente', 'El usuario ya está registrado', 'warning');
        } else {
          this.registrarUsuario();
        }
      }),
      catchError((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al comprobar usuario',
          text: 'Error al comprobar la existencia del usuario',
          footer: '<a href=""></a>',
        });
        return throwError(error);
      })
    ).subscribe();
  }











  eliminar(element: any) {
    const id = element.id;

    Swal.fire({
      title: 'Desea eliminarlo?',
      text: "No podrá revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarioLogic(id).subscribe((response) => {
          this.Listado();
        });

        Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
      }
    });
  }



  eliminarAsignacion(element: any) {
    const id = element.id_asignacion_evidencia;

    Swal.fire({
      title: 'Desea eliminarlo?',
      text: "No podrá revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignarEvidenciaService.eliminarAsignaLogic(id).subscribe((response) => {

          this.ListarAsignacion()
        });

        Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
      }
    });
  }

  Actualizar(usuariosdit: Usuario2) {
    usuariosdit.id=this.usuariosEdit.id;
    Swal.fire({
      title: '¿Desea modificar los campos?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.actualizar(usuariosdit.id, usuariosdit)
        .subscribe((response: any) => {
          Swal.fire(
            'Usuario Modificado!',
            'El usuario ha sido modificado éxitosamente',
            'success'
          );
          this.Listado();
          this.usuariosEdit=new Usuario2();
          this.usuariosEditGuar=new Usuario2();
        });
    } else{
      Swal.fire('Se ha cancelado la operación', '', 'info')
    }
    })


  }

  listar() {
    this.evidenciaService.getEvidenciasAdmin(this.user.id).subscribe(
      listaEvi => {
        this.listaEvidencias = listaEvi; // Asignar la lista directamente
        this.dataSource3.data = this.listaEvidencias;
        console.log(this.listaEvidencias);
      }
    );
  }









}
