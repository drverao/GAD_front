import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition } from '@angular/animations';
import { Indicador } from 'src/app/models/Indicador';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionComponent } from './calificacion/calificacion.component';
import Swal from 'sweetalert2';

type Columnname = {
  [key: string]: string;
}

@Component({
  selector: 'app-matriz-evaluacion',
  templateUrl: './matriz-evaluacion.component.html',
  styleUrls: ['./matriz-evaluacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MatrizEvaluacionComponent implements OnInit {
  ngOnInit(): void {
    this.llenar_datasource();
  }

  constructor(private route: Router, private indicadorService: IndicadoresService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  public columnNames: Columnname = {
    nombre: 'Nombre del Indicador',
    descripcion: 'Descripción del Indicador',
    tipo: 'Tipo',
    valor_obtenido: 'Valor Obtenido'
  };

  dataSource: any;
  idcriterio: any;
  idmodelo: any

  columnsToDisplay = ['nombre', 'descripcion', 'tipo', 'valor_obtenido'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'evaluar'];
  expandedElement: any;

  indicador: Indicador = new Indicador();

  llenar_datasource() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idcriterio = params['criterio'];
      this.idmodelo = params['modelo'];
    });
    // this.indicadorService.obtenerIndicadoresPorCriterio(this.idcriterio).subscribe(
    //   (data) => {
    //     this.dataSource = data;
    //   }
    // );
    this.indicadorService.listarIndicadorPorCriterioModelo(this.idcriterio, this.idmodelo).subscribe(data => {
      this.dataSource = data;
    });
  }

  abrirDialogo(valor: any, id: any, peso: any): void {
    const dialogRef = this.dialog.open(CalificacionComponent, {
      data: { valor, id, peso },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'success') {
        this.llenar_datasource();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Calificación registrada',
          showConfirmButton: true,
          timer: 1500
        })
      }
    });
  }

  irEvidencias(id: any) {
    this.route.navigate(['/matriz-evidencias'], { queryParams: { indicador: id } });
  }

  regresar() {
    this.route.navigate(['/detallemodelo']);
  }
}