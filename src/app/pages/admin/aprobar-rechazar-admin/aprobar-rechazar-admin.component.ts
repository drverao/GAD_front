import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { detalleEvaluacion } from 'src/app/models/DetalleEvaluacion';
import { Evidencia } from 'src/app/models/Evidencia';
import { DetalleEvaluacionService } from 'src/app/services/detalle-evaluacion.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobar-rechazar-admin',
  templateUrl: './aprobar-rechazar-admin.component.html',
  styleUrls: ['./aprobar-rechazar-admin.component.css'],
})
export class AprobarRechazarAdminComponent implements OnInit {
  columnas: string[] = [
    'id_evidencia',
    'enlace',
    'nombre',
    'actions',
  ];
  dataSource2 = new MatTableDataSource<Evidencia>();
  evidenciaSele = new Evidencia();
  filterPost = '';
  detalleEvi: detalleEvaluacion = new detalleEvaluacion();
  fechaActual: Date = new Date();
  fechaFormateada: string = this.fechaActual.toLocaleDateString('es-ES');
  estadoEvi="";
  listaEvidencias : Evidencia[]=[];
  limpiar=""
  isLoggedIn = false;
  user: any = null;
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;
  }

  constructor(
    private evidenciaService: EvidenciaService,
    private detalleEvaluaService: DetalleEvaluacionService,
    public login:LoginService
  ) {}

  ngOnInit(): void {

    this.evidenciaService.getEvidencias().subscribe((listaEvi) => {
      this.dataSource2.data = listaEvi;
 
    });


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


  listar(): void {
    this.evidenciaService.getEvidencias().subscribe(
      (data: any[]) => {
        this.dataSource2.data = data;
      },
      (error: any) => {
        console.error('Error al listar ', error);
      }
    );
  
  }


  seleccionar(element: any) {
    this.evidenciaSele = element;
    this.detalleEvi.evidencia=this.evidenciaSele.id_evidencia;
    this.detalleEvi.usuario=this.user.id;
    console.log(' INDICADORRRRRRRR');

    console.log(    this.evidenciaSele.indicador
      )
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filtro.trim().toLowerCase();
  }

  Aprobado(){
    Swal.fire({
       icon: 'success',
      title: 'La evidencia ha sido aprobada',
      showConfirmButton: false,
      timer: 1500
    })
  
    this.estadoEvi="Evidencia Aprobada";
    this.detalleEvi.estado=true
  }
  
  Rechazado(){
    Swal.fire({
      icon: 'error',
      title: 'La evidencia ha sido rechazada.',
    })
    this.estadoEvi="Evidencia Rechazada";
  this.detalleEvi.estado=false
    
  }


Guardar(){

if(this.detalleEvi.estado !=null && this.detalleEvi.observacion!=null 
   &&  this.detalleEvi.observacion!="" )
this.detalleEvaluaService.create(this.detalleEvi)
.subscribe(data=> 
  Swal.fire(
    'Guardado con éxito!',
    'Observaciones guardado con éxito',
    'success'))


else{
 
  Swal.fire(
    'No agregó ninguna observación',
    'Porfavor agregue alguna',
    'warning'
  )


}

}

Limpiar(){
this.limpiar="";

}

}
