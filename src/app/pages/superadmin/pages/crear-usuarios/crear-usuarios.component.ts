import { Component, OnInit, ViewChild } from '@angular/core';
 import { UsuarioRol } from 'src/app/models/UsuarioRol';
 import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Fenix } from 'src/app/models/Fenix';
import { FenixService } from 'src/app/services/fenix.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
 import { UsuariorolService } from 'src/app/services/usuariorol.service';
import { catchError, tap, throwError } from 'rxjs';
import { Usuario2 } from 'src/app/models/Usuario2';
import { Persona2 } from 'src/app/models/Persona2';
import { SelectItem } from 'primeng/api';
import { PrimeIcons, MenuItem } from 'primeng/api';
        
let ELEMENT_DATA: Fenix[] = [];

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  // Datos para la tabla
  // Datos para la tabla
  people = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
    { id: 4, name: 'Alice Johnson', age: 28 },
    { id: 5, name: 'Michael Brown', age: 35 },
    { id: 6, name: 'Sarah Davis', age: 32 },
    { id: 7, name: 'Chris Wilson', age: 39 },
    { id: 8, name: 'Emma White', age: 27 },
    { id: 9, name: 'James Lee', age: 33 },
    { id: 10, name: 'Olivia Taylor', age: 29 },
    { id: 11, name: 'William Turner', age: 37 },
    { id: 12, name: 'Sophia Jackson', age: 24 },
    { id: 13, name: 'Ethan Harris', age: 31 },
    { id: 14, name: 'Ava Martin', age: 26 },
    { id: 15, name: 'Alexander Thompson', age: 34 },
    { id: 16, name: 'Isabella Martinez', age: 21 },
    { id: 17, name: 'Michael Robinson', age: 38 },
    { id: 18, name: 'Mia Clark', age: 23 },
    { id: 19, name: 'Daniel Lewis', age: 36 },
    { id: 20, name: 'Grace Hall', age: 22 },
    { id: 21, name: 'Henry Allen', age: 39 },
    { id: 22, name: 'Laura Lee', age: 29 },
    { id: 23, name: 'William Turner', age: 37 }
  ];
  selectedUser: any; // Usuario seleccionado para editar
  displayEditDialog = false; // Variable para mostrar/ocultar el diálogo de edición
 

  // Datos para el dropdown
  cities: SelectItem[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Los Angeles', value: 'LA' },
    { label: 'Chicago', value: 'CHI' }
  ];
  showEditDialog(user: any) {
    this.selectedUser = { ...user }; // Clonar el usuario seleccionado para editar
    this.displayEditDialog = true; // Mostrar el diálogo de edición
  }

  hideEditDialog() {
    this.displayEditDialog = false; // Ocultar el diálogo de edición
  }
  saveChanges() {
    // Lógica para guardar los cambios en el usuario
    console.log('Guardar cambios:', this.selectedUser);
    this.displayEditDialog = false; // Ocultar el diálogo de edición después de guardar
  }

  deleteUser(person: any) {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario:', person);
  }

  usuarioGuardar = new Usuario2();

  fenix: Fenix = new Fenix();

  listaPersonas: Persona2[] = [];

  listaUsuarios: any[] = [];
  filterPost = '';
  personaSele = new Persona2();
  usuariosEdit = new UsuarioRol();
  usuariosEditGuar = new UsuarioRol();
  selectedRol: any;

  roles = [
    { rolId: 1, rolNombre: 'ADMIN' },
    { rolId: 2, rolNombre: 'SUPERADMIN' },
    { rolId: 3, rolNombre: 'RESPONSABLE' },
    { rolId: 4, rolNombre: 'AUTORIDAD' },
  ];
  public usuario = {
    username: '',
    password: ''
  }
  public rol = 0;
  formulario: FormGroup;
  dataSource2 = new MatTableDataSource<Usuario2>();
  columnasUsuario: string[] = ['id', 'nombre', 'usuario', 'rol', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild('modal') modal: any;
  constructor(
    private personaService: PersonaService,
    private usuariosService: UsuarioService,
    private userService: UserService,
    private fenix_service: FenixService,
    private formBuilder: FormBuilder,
    private usuariorolservice: UsuariorolService
  ) {
    this.formulario = this.formBuilder.group({
      username: { value: '', disabled: true },
      password: ['', Validators.required],
      rol: ['', this.validateRol]
    });
  }



  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;

  }
  ngOnInit(): void {

    this.personaService.getPersonas().subscribe(
      listaPerso => this.listaPersonas = listaPerso);


    this.Listado();
  }


  Listado() {
    this.usuariorolservice.getusuarios().subscribe(
      (listaAsig: any[]) => {
        this.listaUsuarios = listaAsig;
        this.dataSource2.data = this.listaUsuarios;
        console.log(listaAsig)
      }
    );


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


  public seleccionar2(element: any) {
    this.personaSele = element;
    this.usuarioGuardar.username = this.personaSele.cedula;
    this.usuarioGuardar.persona.id_persona = this.personaSele.id_persona;
  }




  limpiarFormulario() {
    //this.usuarioGuardar = new Usuario2;
    //this.selectedRol = null;
    // this.rol=0;
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
    this.rol = this.formulario.value.rol;
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






  cerrarModal() {
    this.formulario.reset();
    this.formulario.markAsPristine();
  }




  validateRol(control: FormControl) {
    const selectedRol = control.value;
    if (!selectedRol || selectedRol === 0) {
      return {
        required: true
      };
    }
    return null;
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

  EditarUsuari(usuariossssss: any): void {
    this.usuariosEdit = usuariossssss
  }


  compareRoles(role1: any, role2: any): boolean {
    return role1 && role2 ? role1.rolNombre === role2.rolNombre : role1 === role2;
  }

  Actualizar(usuariosdit: UsuarioRol) {
    if (usuariosdit.rol.rolId == 0) {
      usuariosdit.rol = this.usuariosEdit.rol;
    }
    if (usuariosdit.usuario.password == "") {
      usuariosdit.usuario.password = this.usuariosEdit.usuario.password
    }
    usuariosdit.usuarioRolId = this.usuariosEdit.usuarioRolId;
    console.log(usuariosdit)
    Swal.fire({
      title: '¿Desea modificar los campos?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariorolservice.actualizar(usuariosdit.usuarioRolId, usuariosdit)
          .subscribe((response: any) => {
            Swal.fire(
              'Usuario Modificado!',
              'El usuario ha sido modificado éxitosamente',
              'success'
            );
            this.Listado();
            this.usuariosEdit=new UsuarioRol();
            this.usuariosEditGuar=new UsuarioRol();
          });
      } else{
        Swal.fire('Se ha cancelado la operación', '', 'info')
      }
    })


  }
}
