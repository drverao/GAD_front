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
  seleccionarro: string= "Seleccione un rol";
  personaSele = new Persona();
  usua : Usuario2 = new Usuario2();
  usuaRol : UsuarioRol = new UsuarioRol ();
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
    private snack:MatSnackBar,
    private userService:UserService
    ) {}
  ngOnInit(): void {
   
    this.personaService.getPersonas().subscribe(
      listaPerso=>this. listaPersonas=listaPerso );
  

      this.usuariosService.getUsuarios().subscribe(
          listaUsua=>this. listaUsuarios=listaUsua );

    console.log('Dataaaaaaaaaaaaaaa');
    //console.log(this. listaRoles);
     this.usuaRol.usuario = this.usua.id;

  }



  seleccionar(persona:Persona): void {
    localStorage.setItem("id",persona.id_persona.toString());
    console.log(persona.id_persona)
    this. personaSele= persona;
    console.log(this.personaSele);
    this.usua.username = this.personaSele.cedula;

  }


  guardarUsuario( usuaRol: UsuarioRol, usuario:Usuario2){

   /*
      this.usuariosService.create(usuario)
    .subscribe(data=> 
      Swal.fire({
        title: 'Usuarios Guardado éxitosamente',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#63B68B",
      }))*/
    
     this.usuariosService.añadirUsuario( usuario, usuaRol).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        },(error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
            duration : 3000
          });
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
        //COLOCAR EL CODIGO A EJECUTAR
        this.usuariosService.eliminarUsuario(id_usuario).subscribe(
          res => this.usuariosService.getUsuarios().subscribe(
            listausua => this.listaUsuarios = listausua
          )
        );
        //FIN DEL CODIGO A EJECUTAR
        Swal.fire(
          'Borrado!',
          'Su archivo ha sido borrado.',
          'success'
        )
      }
    })

  }


}
