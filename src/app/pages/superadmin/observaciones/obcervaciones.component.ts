import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/services/archivo.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'jquery';
import { EmailServiceService } from 'src/app/services/email-service.service';
import { email } from 'src/app/services/email';

@Component({
  selector: 'app-obcervaciones',
  templateUrl: './obcervaciones.component.html',
  styleUrls: ['./obcervaciones.component.css']
})
export class ObcervacionesComponent implements OnInit{
  fileInfos: Observable<any> | undefined;
  selectedFiles: FileList | undefined;
  email: email = new email();
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
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }
}
