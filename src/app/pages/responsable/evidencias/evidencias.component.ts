import { Archivo } from './../../../models/Archivo';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ActividadService } from 'src/app/services/actividad.service';
import { Evidencia } from 'src/app/models/Evidencia';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { Indicador } from 'src/app/models/Indicador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/services/actividades';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css'],
})
export class EvidenciasResponComponent implements OnInit {
  mensaje = '';
  progressInfo = [];
  filename = '';
  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;
  evidencias: any[] = [];
  Archivos: any[] = [];
  Actividades: any[] = [];
aRCHI!:Archivo[];
  //archivo
  //descripcion: string = "";


  filearchivo!: File;
  progreso: number = 0;
public archivos=new Archivo();
  formulario: FormGroup;
  archivoSeleccionado!: File;
  user: any = null;
  isLoggedIn = false;
  searchText = '';
  
  constructor(private archivo: ArchivoService,
     private _snackBar: MatSnackBar,
     private services: ActividadService,
     public login:LoginService,

     private evidenciaservice: EvidenciaService,
     private fb: FormBuilder,
     private router: Router
     ) {

    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
    });


  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.filearchivo = file;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.filearchivo = event.target.files[0];
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  activ: Actividades = new Actividades();
archi:Archivo=new Archivo()
  ngOnInit(): void {
    const data = history.state.data;
    this.activ = data;
    if (this.activ == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }

    const datos = history.state.data;
    this.archi = data;
    if (this.archi == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

      }
    )
    this.listar();
  }


  seleccionarArchivo(evento: any) {
    this.archivoSeleccionado = evento.target.files[0];
  }
descripcion:string="";


  mostra() {
    this.fileInfos = this.archivo.listar();
  }

  listar(): void {
    this.archivo.geteviasig(this.user.username).subscribe(data => {
      this.aRCHI = data;
  });
  }
//eliminadoo de la carpeta
  eliminar(filename: string) {
    this.archivo.borrar(filename).subscribe(res => {
      this.fileInfos = this.archivo.listar();
    })
  }
elim(nom:string,id:any){
this.eliminar(nom);
console.log(id);
this.eliminarlog(id);

}
  onUpload(): void {
    this.archivo.cargar(this.filearchivo, this.descripcion, this.activ.id_actividad).subscribe(
      event => {
        console.log('Archivo subido:');
        // Lógica adicional después de subir el archivo
        Swal.fire({
          title: '¡Éxito!',
          text: 'El archivo se ha subido correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.listar();
      },
      error => {
        console.error('Error al subir el archivo:', error);
        // Lógica adicional para manejar el error
        Swal.fire({
          title: '¡Error!',
          text: 'Nombre del archivo repetido',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  eliminarlog(act: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.archivo.eliminar(act).subscribe(
          (response) => {
            this.listar();
            Swal.fire({
              title: 'Eliminado',
              text: 'El registro ha sido eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          },
          (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire({
              title: 'Error al eliminar',
              text: 'Ocurrió un error al eliminar el registro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
      }
    });
  }

}
