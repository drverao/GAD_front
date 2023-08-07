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
import { Router } from '@angular/router';
import { element } from 'angular';
import { usuario } from 'src/app/models/Usuario';
import {  map } from 'rxjs/operators';


@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  selectedUser: any; // Usuario seleccionado para editar
  displayEditDialog = false; // Variable para mostrar/ocultar el diálogo de edición
  frmuser: FormGroup;

 usuarioGuardar = new Usuario2();

  fenix: Fenix = new Fenix();
  
  listaPersonas: Persona2[] = [];
 copialistaPersonas: Persona2[] = [];
 
  listauser:Usuario2[]=[];
  copialistauser:Usuario2[]=[];

  listaUsuarios: any[] = [];
  
  filterPost = '';
  public persona2p = new Persona2();

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
  // formulario: FormGroup;
  dataSource2 = new MatTableDataSource<Usuario2>();
  columnasUsuario: string[] = ['id', 'nombre', 'usuario', 'rol', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild('modal') modal: any;
formulario: any;
  constructor(
    private personaService: PersonaService,
    private usuariosService: UsuarioService,
    private userService: UserService,
    private fenix_service: FenixService,
    private formBuilder: FormBuilder,
    private usuariorolservice: UsuariorolService,
    private router: Router,
    private fb: FormBuilder
    
  

  ){
    this.frmuser = fb.group({
      cedula: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      celular: ['', Validators.pattern("^[0-9]*$")]
  
    });

 this.formulario = this.formBuilder.group({
   username: {value: '', disabled: true},
   password: ['', Validators.required],
   rol: ['', this.validateRol]
 });
  }



  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;

  }
  ngOnInit(): void {
this.listaper();
    this.listado();
  }
  listaper(): void {
    this.personaService.getPersonas().subscribe(
      (data: any[]) => {
        this.listaPersonas = data;
        this.copialistaPersonas = data;
      },
    );
  }
  listado(): void {
    this.usuariorolservice.getusuarios().subscribe(
      (data: any[]) => {
        this.listauser = data;
        this.copialistauser = data;
      },
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

 guardar() {
  this.persona2p = this.frmuser.value;
  const cedula = this.frmuser.get('cedula')?.value;

  if (!cedula) {
    console.error('El campo de cédula no ha sido inicializado correctamente.');
    return;
  }

  this.personaService.findByCedula(cedula).pipe(
    map((persona) => persona != null),
    tap((personaExiste) => {
      if (personaExiste) {
        Swal.fire('Cédula duplicada', 'Ya existe una persona con la misma cédula.', 'error');
      } else {
        this.personaService.createPersona(this.persona2p).subscribe(
          (response) => {
            console.log('Persona creada con éxito:', response);
            Swal.fire('Exitoso', 'Se ha completado el registro con éxito', 'success');
          },
          (error) => {
            console.error('Error al crear la persona:', error);
            Swal.fire('Error', 'Ha ocurrido un error', 'warning');
          }
        );
      }
    })
  ).subscribe();
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
    this.usuarioGuardar.username =this.personaSele.cedula;
   // this.usuarioGuardar.persona =ta2;

    console.log(this.usuarioGuardar)

    this.usuariosService.createUsuario(this.usuarioGuardar, this.rol).subscribe(
      () => {
        Swal.fire(
          'Usuario Registrado!',
          'El usuario ha sido registrado éxitosamente',
          'success'
        );
        this.listado();

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
        }else{
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
          this.listado();
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
            this.listado();
            this.usuariosEdit=new UsuarioRol();
            this.usuariosEditGuar=new UsuarioRol();
          });
      } else{
        Swal.fire('Se ha cancelado la operación', '', 'info')
      }
    })
  }
  editDatos(persona2: Persona2) {
    this.personaSele = persona2;
    this.frmuser= new FormGroup({
     cedula: new FormControl(persona2.cedula),
      primer_nombre: new FormControl(persona2.primer_nombre),
      segundo_nombre: new FormControl(persona2.segundo_nombre),
      primer_apellido:new FormControl(persona2.primer_apellido),
      segundo_apellido:new FormControl(persona2.segundo_apellido),
      correo:new FormControl(persona2.correo),
      direccion: new FormControl(persona2.direccion),
      celular: new FormControl(persona2.celular),
    });
  }

  actualizar() {
    this.personaSele.cedula = this.frmuser.value.cedula;
    this.personaSele.primer_nombre = this.frmuser.value.primer_nombre;
    this.personaSele.segundo_nombre = this.frmuser.value.segundo_nombre;
    this.personaSele.primer_apellido = this.frmuser.value.primer_apellido;
    this.personaSele.segundo_apellido = this.frmuser.value.segundo_apellido;
    this.personaSele.correo = this.frmuser.value.correo;
    this.personaSele.direccion = this.frmuser.value.direccion;
    this.personaSele.celular= this.frmuser.value.celular;
    this.personaService.actualizar(this.personaSele.id_persona, this.personaSele)
      .subscribe((response) => {
        this.personaSele = new Persona2();
        Swal.fire(
          'Operacion exitosa!',
          'El registro se actualizo con exito',
          'success'
        );
      });
  }
  buscar(even: any) {
    let bus = even.target.value;
    if (!bus) {
      this.listaPersonas = this.copialistaPersonas;
    } else {
      let pal = this.listaPersonas.filter(
        (per: any) =>
         per.primer_nombre.toLowerCase().includes(bus) ||
          per.primer_apellido.toLowerCase().includes(bus)
      );
      this.listaPersonas = pal;
    }
  }
  buscar2(even: any) {
    let bus = even.target.value;
    if (!bus) {
      this.listauser = this.copialistauser;
    } else {
      let pal = this.listauser.filter(
        (user: any) =>
          user.usuario.persona?.primer_nombre.toLowerCase().includes(bus) ||
          user.usuario.persona?.primer_apellido.toLowerCase().includes(bus)
      );
      this.listauser= pal;
    }
  }


}
