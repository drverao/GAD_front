import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario2 } from 'src/app/services/Usuario2';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Persona2 } from 'src/app/services/Persona2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  listaPersonas: Persona2[] = [];

  listaUsuarios: Usuario2[] = [];
  filterPost = '';
  filterPost2 = '';
  filterPost3 = '';
  personaSele = new Persona2();
  usuarioGuardar = new Usuario2();
  usuariosEdit = new Usuario2();
  usuariosEditGuar = new Usuario2();
  dataSource2 = new MatTableDataSource<Persona2>();
  columnas: string[] = [
    'id',
    'cedula',
    'nombre',
    'apellidos',
    'correo',
    'actions',
  ];

  roles = [
    { id: 1, nombre: 'ADMINISTRADOR' },
    { id: 2, nombre: 'SÚPERADMINISTRADOR' },
    { id: 3, nombre: 'RESPONSABLE' },
    { id: 4, nombre: 'AUTORIDAD' },
  ];

  public rol = 0;

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;
  }

  constructor(
    private personaService: PersonaService,
    private usuariosService: UsuarioService
  ) {}
  ngOnInit(): void {
    this.personaService.getPersonas().subscribe((listaPerso) => {
      this.dataSource2.data = listaPerso;
    });

    this.usuariosService.getUsuarios().subscribe(
      (listaUsua) => (this.listaUsuarios = listaUsua),

      (error) => console.log('Error al obtener usuarios', error)
    );
  }

  Listado() {
    this.usuariosService
      .getUsuarios()
      .subscribe((listaUsua) => (this.listaUsuarios = listaUsua));
  }

  public seleccionar2(element: any) {
    this.personaSele = element;
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.persona = this.personaSele.id_persona;
  }

  EditarUsuari(usuariossssss: Usuario2): void {
    localStorage.setItem('id', usuariossssss.id.toString());
    this.usuariosEdit = usuariossssss;
    this.Editar();
  }

  Editar() {
    let id = localStorage.getItem('id');
    this.usuariosService.getUsuarioId(Number(id)).subscribe((data) => {
      this.usuariosEditGuar = data;
    });
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
        this.usuariosService
          .eliminarUsuario(id_usuario)
          .subscribe((res) =>
            this.usuariosService
              .getUsuarios()
              .subscribe((listausua) => (this.listaUsuarios = listausua))
          );
        Swal.fire('Borrado!', 'El usuario ha sido borrado.', 'success');
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
        this.usuariosService
          .updateUsuario(usuariosdit)
          .subscribe((data) =>
            Swal.fire(
              'Usuario Modificado!',
              'El usuario ha sido modificado éxitosamente',
              'success'
            )
          );
      } else if (result.isDenied) {
        Swal.fire('Ningun campo modificado', '', 'info');
      }
    });
  }
}
