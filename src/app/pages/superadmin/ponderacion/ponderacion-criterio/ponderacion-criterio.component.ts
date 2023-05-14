import { Component, OnInit ,ViewChild} from '@angular/core';

import { ChartComponent } from "ng-apexcharts";

import { Indicador } from 'src/app/models/Indicador';
import { Modelo } from 'src/app/models/Modelo';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { CriteriosService } from 'src/app/services/criterios.service';

export type ChartOptions = {
  series: any;
  chart: any;
  responsive:any;
  labels: any;
};

@Component({
  selector: 'app-ponderacion-criterio',
  templateUrl: './ponderacion-criterio.component.html',
  styleUrls: ['./ponderacion-criterio.component.css']
})
export class PonderacionCriterioComponent  implements OnInit{
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  model:Modelo=new Modelo();
  critrioClase =new Criterio();
  dataSource:any;
  asignacion:any;

  constructor(
    private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    public modeloService:ModeloService,
    public asignacionIndicadorService:AsignacionIndicadorService,
    private sharedDataService:SharedDataService,
    private criterioService:CriteriosService
  ) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 2],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  ngOnInit(): void {
    this.recibeCriterio();
    this.recibeCriterio1();
    this.recibeIndicador();
   
  }

  recibeCriterio() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador && indicador.subcriterio?.id_subcriterio === this.sharedDataService.obtenerIdSubCriterio() &&  indicador.criterio?.id_criterio === this.sharedDataService.obtenerIdCriterio();
             
            });
          });
          console.log(this.dataSource);
        });
      });
    });
  }

  recibeCriterio1() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;

      this.criterioService.getCriterioById(Number(id)).subscribe(data => {
        this.critrioClase = data;
        console.log('Criterio  id :',this.critrioClase);
      
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              indicador.id_indicador === asignacion.indicador.id_indicador && 
              indicador.subcriterio?.criterio?.id_criterio === this.critrioClase;
            
            
            });
          });
          console.log(this.dataSource);
        });
      });
    });
    });
  }

  recibeIndicador() {
    let idModelo = localStorage.getItem("id");
    let idCriterio = this.sharedDataService.obtenerIdCriterio();
 
    console.log('Criterio  id jjj:',this.sharedDataService.obtenerIdCriterio());
  
    this.modeloService.getModeloById(Number(idModelo)).subscribe(modelo => {
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(idModelo)).subscribe(asignacion => {
        this.indicadorservice.getIndicadors().subscribe(indicadores => {
          this.dataSource = [];
          this.asignacion = asignacion;
  
          this.dataSource = indicadores.filter(indicador => {
            

            return asignacion.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador && 
                     indicador.subcriterio?.criterio?.id_criterio === idCriterio;
            });
          });
  
          console.log('lista:',this.dataSource);
        });
      });
    });
  }
  
  

}
