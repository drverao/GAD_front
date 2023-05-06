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
    'visible',
    'indicador_id_indicardores',
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

  
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;
  }

  constructor(
    private evidenciaService: EvidenciaService,
    private detalleEvaluaService: DetalleEvaluacionService,
  ) {}

  ngOnInit(): void {

    this.evidenciaService.getEvidencias().subscribe(
      listaEvi => {
        this.listaEvidencias = listaEvi;
        if (this.listaEvidencias.length === 0) {
          console.log("El listado de evidencias está vacío.");
        } else {
          console.log(`Hay ${this.listaEvidencias.length} evidencias en el listado.`);
        }
      }
    );
    
    
    console.log('DATOSSSSSSSSSSSSSSSSSSSSSSx222222222222222222');
      console.log(this.listaEvidencias)


    console.log('DATOSSSSSSSSSSSSSSSSSSSSSS');

    this.evidenciaService.getEvidencias().subscribe((listaEvi) => {
      this.dataSource2.data = listaEvi;
 
    });

  }

  seleccionar(element: any) {
    console.log('Paso datosss');
    this.evidenciaSele = element;
    console.log(this.evidenciaSele);
    this.detalleEvi.evidencia=this.evidenciaSele.id_evidencia;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filtro.trim().toLowerCase();
  }


Aprobado(){

  this.estadoEvi="Evidencia Aprobada";
  this.detalleEvi.estado="true"
}

Rechazado(){
  this.estadoEvi="Evidencia Rechazada";
this.detalleEvi.estado="false;"
  
}


  /*
Aprobar(element:any) {

  Swal.fire({
    title: '¿Esta seguro de eliminar esta Evidencia?',
    text: "No podrá revertirlo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.evidenciaService.eliminarEvidencia(id_evidencia).subscribe(
        res => this.evidenciaService.getEvidencias().subscribe(
          listaEvi => {
            this.dataSource2.data = listaEvi;
          }
        )
      );
       Swal.fire(
        'Borrado!',
        'Su archivo ha sido borrado.',
        'success'
      )
    }
  })

}*/
}
