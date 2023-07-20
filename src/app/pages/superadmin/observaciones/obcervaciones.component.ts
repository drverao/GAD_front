import { Archivo } from './../../../models/Archivo';
import { Component, OnInit,ViewChild} from '@angular/core';
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

import swal from 'sweetalert2';

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
    private subiarchivo:ArchivoService,
    private emailService: EmailServiceService) { }
  ngOnInit(): void {
    this.listar();
  }
  searchTerm: string = '';
correo:string ="";

mecorreo(coreo:any){
  
this.toUser=coreo;
}
  listar() {
    console.log(this.arch)
    this.subiarchivo.get().subscribe(
      (data: any) => {
        console.log(data);
        this.arch = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
notificar(id:any){
  console.log("este es el id "+id);
}
  enviar() {
    this.emailService.sendEmail([this.toUser], this.subject, this.message).subscribe(
      response => {
        console.log('Email sent successfully!');
        // mostrar mensaje con swal
        swal.fire({
          icon: 'success',
          title: '¡Correo electrónico enviado!',
          text: 'El correo electrónico se envió correctamente.'
        });
        this.limpiarCampos();
      },
      error => {
        console.error('Error sending email:', error);
        // mostrar mensaje con swal
        swal.fire({
          icon: 'error',
          title: 'Error al enviar correo electrónico',
          text: 'No se pudo enviar el correo electrónico.'
        });
      }
    );
  }

limpiarCampos() {
  this.toUser = '';
  this.subject = '';
  this.message = '';
}
@ViewChild('modal') modal: any;

closeModal() {
  this.modal.nativeElement.style.display = 'none';
}
}
