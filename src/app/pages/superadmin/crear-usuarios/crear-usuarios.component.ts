import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/services/Persona';
import { UsuarioRol } from 'src/app/services/UsuarioRol';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Usuario2 } from 'src/app/services/Usuario2';
import { Fenix } from 'src/app/models/Fenix';
import { FenixService } from 'src/app/services/fenix.service';
import { Persona2 } from 'src/app/services/Persona2';

let ELEMENT_DATA: Fenix[] = [];

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {

  usuarioGuardar = new Usuario2();

  fenix: Fenix = new Fenix();

  listaPersonas: Persona2[] = [];

  listaUsuarios: Usuario2[] = [];
  filterPost = '';
  filterPost2 = '';
  filterPost3 = '';
  personaSele = new Persona2();
  usuariosEdit = new Usuario2();
  usuariosEditGuar = new Usuario2();

  roles = [
    { id: 1, nombre: 'ADMINISTRADOR' },
    { id: 2, nombre: 'SÚPERADMINISTRADOR' },
    { id: 3, nombre: 'RESPONSABLE' },
    { id: 4, nombre: 'AUTORIDAD' },
  ];

  public usuario = {
    username: '',
    password: ''
  }
  public rol = 0;




  constructor(
    private personaService: PersonaService,
    private usuariosService: UsuarioService,
    private userService: UserService,
    private fenix_service: FenixService
  ) { }
  ngOnInit(): void {

    this.personaService.getPersonas().subscribe(
      listaPerso => this.listaPersonas = listaPerso);

    this.usuariosService.getUsuarios().subscribe(
      listaUsua => this.listaUsuarios = listaUsua,

      error => console.log('Error al obtener usuarios', error)
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

  Listado() {
    this.usuariosService
      .getUsuarios()
      .subscribe((listaUsua) => (this.listaUsuarios = listaUsua));
  }

  public seleccionar2(element: any) {
    this.personaSele = element;
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.persona.id_persona = this.personaSele.id_persona;
  }

  EditarUsuari(usuariossssss: Usuario2): void {
    localStorage.setItem("id", usuariossssss.id.toString());
    this.usuariosEdit = usuariossssss
    this.Editar();

  }

  Editar() {

    let id = localStorage.getItem("id");
    this.usuariosService.getUsuarioId(Number(id))
      .subscribe(data => {
        this.usuariosEditGuar = data;
      })


  }


  GuardarUsuario() {
    if (
      this.usuarioGuardar.username == '' ||
      this.usuarioGuardar.username == null ||
      this.usuarioGuardar.password == '' ||
      this.usuarioGuardar.password == null
    ) {
      Swal.fire('Campos Vacios', 'Porfavor llene todos los campos', 'warning');
      return;
    }

    //consumir para crrar persona
    this.personaService.createPersona(this.personaSele).subscribe(
      (data) => {
        console.log(data);
        this.usuarioGuardar.username = data.cedula;
        this.usuarioGuardar.persona = data;
        this.usuariosService.createUsuario(this.usuarioGuardar, this.rol).subscribe(
          (data) => {
            Swal.fire(
              'Usuario Registrado!',
              'El usuario ha sido registrado éxitosamente',
              'success'
            );

            this.Listado();
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



  }

  eliminar(id_usuario: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(id_usuario).subscribe(
          res => this.usuariosService.getUsuarios().subscribe(
            listausua => this.listaUsuarios = listausua
          )
        );
        Swal.fire(
          'Borrado!',
          'Su archivo ha sido borrado.',
          'success'
        )
      }
    });
  }

  Actualizar(usuariosdit: Usuario2) {
    Swal.fire({
      title: '¿Desea modificar los campos?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.updateUsuario(usuariosdit)
          .subscribe(data =>
            Swal.fire(
              'Usuario Modificado!',
              'El usuario ha sido modificado éxitosamente',
              'success'
            ))
      } else if (result.isDenied) {
        Swal.fire('Ningun campo modificado', '', 'info')
      }
    })


  }
}
