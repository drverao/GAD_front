import { Archivo } from './../../../models/Archivo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { NgForm } from '@angular/forms';
import { event } from 'jquery';
import { EmailServiceService } from 'src/app/services/email-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Persona3 } from 'src/app/services/Persona3';
import { PersonaService } from 'src/app/services/persona.service';
@Component({
  selector: 'app-obcervaciones',
  templateUrl: './obcervaciones.component.html',
  styleUrls: ['./obcervaciones.component.css']
})
export class ObcervacionesComponent implements OnInit {


  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;
  sent: boolean = false;
  toUser: string = "";
  subject: string = "";
  message: string = " El archivo";
  personas!: Persona3[];
  arch!: Archivo[];
  constructor(private archivo: ArchivoService,
    private _snackBar: MatSnackBar,
    private perservice3: PersonaService,
    private emailService: EmailServiceService) { }
  ngOnInit(): void {
    this.listar();
  }
  searchTerm: string = '';


  listar() {
    console.log(this.personas)
    this.perservice3.listarcorreos().subscribe(
      (data: Persona3[]) => {
        this.personas = data;
      },
      (error) => {
        console.error(error);
      }
    );
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
