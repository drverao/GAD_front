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

  //archivo
  //descripcion: string = "";


  filearchivo!: File;
  progreso: number = 0;
public archivos=new Archivo();
  formulario: FormGroup;
  archivoSeleccionado!: File;

  constructor(private archivo: ArchivoService,
     private _snackBar: MatSnackBar,
     private services: ActividadService,
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
  ngOnInit(): void {
    const data = history.state.data;
    this.activ = data;
    if (this.activ == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }
    //  this.mostra();
    this.listar();
    this.listarr();
  }


  seleccionarArchivo(evento: any) {
    this.archivoSeleccionado = evento.target.files[0];
  }
descripcion:string="";


/*onUpload(): void {
  this.archivos=this.formulario.value;
  this.archivos.acitvidad=this.activ;
    this.archivo.cargarArchivo(this.filearchivo, this.descripcion).subscribe(
    event => {
      console.log('Archivo subido:');
      // Lógica adicional después de subir el archivo
      Swal.fire({
        title: '¡Éxito!',
        text: 'El archivo se ha subido correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.listarr();
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


*/
  mostra() {
    this.fileInfos = this.archivo.listar();
  }

  //listar archivo de la tabla
  listarr(): void {
    this.archivo.get().subscribe(
      ar => {
        this.Archivos = ar;
      },
      error => {
        console.log(error);
      }
    );
  }

  // listar evidencia
  listar(): void {
    this.services.get().subscribe(
      (data: any[]) => {
        this.Actividades = data;
      },
      (error: any) => {
        console.error('Error al listar:', error);
      }
    );
  }

  eliminar(filename: string) {
    this.archivo.borrar(filename).subscribe(res => {
      this.openSnackBar('Archivo borrado con éxito', 'Cerrar');
      this.fileInfos = this.archivo.listar();
    })
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
        this.listarr();
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
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
