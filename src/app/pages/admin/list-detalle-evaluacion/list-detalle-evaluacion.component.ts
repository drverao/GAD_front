import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { detalleEvaluacion } from 'src/app/models/DetalleEvaluacion';
import { DetalleEvaluacionService } from 'src/app/services/detalle-evaluacion.service';

@Component({
  selector: 'app-list-detalle-evaluacion',
  templateUrl: './list-detalle-evaluacion.component.html',
  styleUrls: ['./list-detalle-evaluacion.component.css']
})
export class ListDetalleEvaluacionComponent {

  columnas: string[] = [
    'id_evidencia',
    'nombre',
    'enlace',
    'descripcion',
    'estado',
    'observaciones',
    'actions',
  ];
  dataSource = new MatTableDataSource<detalleEvaluacion>();


  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }
  constructor(
    private detalleEvaluaService: DetalleEvaluacionService,
  
  ) {}
  ngOnInit(): void {

    this.detalleEvaluaService.getDetalle().subscribe((listaEvi) => {
      this.dataSource.data = listaEvi;
      console.log(listaEvi)

    });


 
 


  }
}
