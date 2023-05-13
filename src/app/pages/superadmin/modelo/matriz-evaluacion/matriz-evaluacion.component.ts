import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition } from '@angular/animations';
import { Indicador } from 'src/app/models/Indicador';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private indicadorService: IndicadoresService, private activatedRoute: ActivatedRoute) { }

  public columnNames: Columnname = {
    nombre: 'Nombre del Indicador',
    descripcion: 'Descripción del Indicador',
    tipo: 'Tipo',
    valor_obtenido: 'Valor Obtenido'
  };

  dataSource: any;
  id: any;

  columnsToDisplay = ['nombre', 'descripcion', 'tipo', 'valor_obtenido'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'evaluar', 'evidencias'];
  expandedElement: any;

  indicador: Indicador = new Indicador();

  llenar_datasource() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.indicadorService.obtenerIndicadoresPorCriterio(this.id).subscribe(
      (data) => {
        this.dataSource = data;
      }
    );
  }

}