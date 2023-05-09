import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'jquery';


@Component({
  selector: 'app-obcervaciones',
  templateUrl: './obcervaciones.component.html',
  styleUrls: ['./obcervaciones.component.css']
})
export class ObcervacionesComponent implements OnInit{
  mensaje = '';
  progressInfo = [];
  filename = '';
  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;

  constructor(private archivo: ArchivoService,  private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fileInfos = this.archivo.listar();
  }

  
}
