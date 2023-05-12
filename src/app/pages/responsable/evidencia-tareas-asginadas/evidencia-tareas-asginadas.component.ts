import { Component, ViewChild } from '@angular/core';
import { Asigna_Evi } from 'src/app/models/Asignacion-Evidencia';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleEvaluacionService } from 'src/app/services/detalle-evaluacion.service';
import { AsignaEvidenciaService } from 'src/app/services/asigna-evidencia.service';
import { LoginService } from 'src/app/services/login.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { Evidencia } from 'src/app/models/Evidencia';
@Component({
  selector: 'app-evidencia-tareas-asginadas',
  templateUrl: './evidencia-tareas-asginadas.component.html',
  styleUrls: ['./evidencia-tareas-asginadas.component.css']
})
export class EvidenciaTareasAsginadasComponent {
  columnas: string[] = [
    'id_evidencia',
    'nombre',
    'descripcion',
    'actions',
  ];
  dataSource = new MatTableDataSource<Asigna_Evi>();
  listaEvidencias : Evidencia[]=[];
  isLoggedIn = false;
  user: any = null;
  listaAsigEvi: Asigna_Evi[]=[];
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }
  constructor(
    private asignaService: AsignaEvidenciaService,
    public login:LoginService,
    private evidenciaService: EvidenciaService,
  ) {}
  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
      console.log("aqqui iiiiiiiiiiiiiiii")

/*
      this.evidenciaService.getAsignacionUsuario(this.user.username).subscribe(
        listaIndi => {
          if (listaIndi.length === 0) {
            console.log('La lista de evidencias está vacía');
          } else {
            console.log('La lista de evidencias contiene elementos');
            this.listaEvidencias = listaIndi;
          }
        }
      );*/
      
  

  


      
      this.asignaService.getAsignacionUsuario(this.user.username).subscribe(
        response => {
          if (Array.isArray(response)) {
            this. listaEvidencias = response;
            if (this.listaAsigEvi.length === 0) {
              console.log('El array está vacío');
            } else {
              console.log('El array tiene elementos');
            }
          } else {
            console.log('La respuesta no es un array');
          }
        }
      );
      


      /*
    this.asignaService.getAsignacionUsuario(this.user.username).subscribe(
      listaIndi => {
        this.listaAsigEvi = listaIndi;
        if (this.listaAsigEvi.length === 0) {
          console.log('El array está vacío');
        } else {
          console.log('El array tiene elementos');
        }
      }
    );*/
    

    /*
    this.asignaService.getAsignacionUsuario(this.user.username).subscribe(
      listaIndi=> this. listaAsigEvi = listaIndi

      );*/
   
/*
    this.asignaService.getAsignacionUsuario(this.user.username).subscribe((listaEvi) => {
      this.dataSource.data = listaEvi;
      console.log(listaEvi)

    });*/
  }












  
}
