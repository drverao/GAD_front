import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { NgForm } from '@angular/forms';
import { event } from 'jquery';
import { EmailServiceService } from 'src/app/services/email-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-obcervaciones',
  templateUrl: './obcervaciones.component.html',
  styleUrls: ['./obcervaciones.component.css']
})
export class ObcervacionesComponent implements OnInit{


  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;
  sent: boolean = false;
  toUser: string="";
  subject: string="";
  message: string=" El archivo";
 
  constructor(private archivo: ArchivoService,  private _snackBar: MatSnackBar,private emailService: EmailServiceService) {}
  ngOnInit(): void {
    this.fileInfos = this.archivo.listar();
  }
  searchTerm: string = '';

  filterFiles(fileList: any[]) {
    return fileList.filter(file => {
      return file.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }


  enviar() {
    this.emailService.sendEmail([this.toUser], this.subject, this.message).subscribe(
      response => {
        console.log('Email sent successfully!');
        this.openSnackBar('El correo electrónico se envió correctamente.', 'Cerrar');
      },
      error => {
        console.error('Error sending email:', error);
        this.openSnackBar('No se pudo enviar el correo electrónico.', 'Cerrar');
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
