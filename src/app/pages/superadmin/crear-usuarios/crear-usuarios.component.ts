import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/services/Persona';
import { Usuario2 } from 'src/app/services/Usuario2';
import { UsuarioRol } from 'src/app/services/UsuarioRol';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  listaPersonas: Persona[]=[];

  listaUsuarios: Usuario2[]=[];
  filterPost = '';
  filterPost2 = '';
  filterPost3 = '';
  personaSele = new Persona();
  usuariosEdit = new Usuario2();
  usuariosEditGuar = new Usuario2();
roles = [
    {id: 1, nombre: 'ADMINISTRADOR'},
    {id: 2, nombre: 'SÚPER ADMINISTRADOR'},
    {id: 3, nombre: 'RESPONSABLE'},
    {id: 4, nombre: 'AUTORIDAD'},

  ];


  public usuario = {
    username : '',
    password : ''
  }
  public rol=0;




  constructor(
    private personaService:PersonaService,
    private usuariosService:UsuarioService,
    private userService:UserService
    ) {}
  ngOnInit(): void {
   
    this.personaService.getPersonas().subscribe(
      listaPerso=>this. listaPersonas=listaPerso );
  
      this.usuariosService.getUsuarios().subscribe(
        listaUsua => this.listaUsuarios = listaUsua,

        error => console.log('Error al obtener usuarios', error)
      );

  }

  Listado()
  {
    this.usuariosService.getUsuarios().subscribe(
     listaUsua=>this. listaUsuarios=listaUsua );
  }
  

  seleccionar(persona:Persona): void {
    localStorage.setItem("id",persona.id_persona.toString());
    console.log(persona.id_persona)
    this. personaSele= persona;
    this.usuario.username= this.personaSele.cedula;
  }


  EditarUsuari(usuariossssss: Usuario2): void {
    localStorage.setItem("id", usuariossssss.id.toString());
    this. usuariosEdit = usuariossssss
    this.Editar();
  
  }


  Editar() {

    let id = localStorage.getItem("id");
    this.usuariosService.getUsuarioId(Number(id))
    .subscribe(data=>{
      this. usuariosEditGuar = data;
    })


  }
  

  GuardarUsuario(){
    if(this.usuario.username == '' || this.usuario.username == null){
      Swal.fire(
        'Campos Vacios',
        'Porfavor llene todos los campos',
        'warning'
      )
      return;
    }
    this.userService.añadirUsuario(this.usuario, this.rol).subscribe(
      (data) => {
        Swal.fire(
          'Usuario Registrado!',
          'El usuario ha sido registrado éxitosamente',
          'success');
      },(error) => 
      {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar usuario',
          text: 'Error al registrar!',
          footer: '<a href=""></a>'
        })
      }
    )
  }

  eliminar(id_usuario: number) {

    Swal.fire({
      title: '¿Esta seguro de eliminar este usuario?',
      text: "No podrá revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
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
    })

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
    .subscribe(data=>  
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
