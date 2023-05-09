import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'jquery';
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

  constructor(private archivo: ArchivoService,  private _snackBar: MatSnackBar) {}

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit(): void {
    this.fileInfos = this.archivo.listar();
  }

eliminar(filename:string){
  this.archivo.borrar(filename).subscribe(res=>{
    this.openSnackBar('Archivo borrado con éxito', 'Cerrar');
    this.fileInfos=this.archivo.listar();
  })
}

  subirArchivo(): void {
    const input = document.getElementById('archivo') as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.archivo.cargar(file).subscribe(
        (event) => {
          console.log(event); // mostrar el progreso de la carga
          this.fileInput.nativeElement.value = ''; // Limpiar el input
          this.openSnackBar('Archivo subido con éxito', 'Cerrar');

        },
        (error) => {
          console.log(error); // mostrar el error si ocurre
          this.openSnackBar('Error al subir el archivo puede que ya este cargado', 'Cerrar');
        }
      );
    }
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
