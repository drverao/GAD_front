import { Component, OnInit ,ViewChild} from '@angular/core';

import { ChartComponent } from "ng-apexcharts";

import { Indicador } from 'src/app/models/Indicador';
import { Modelo } from 'src/app/models/Modelo';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { CriteriosService } from 'src/app/services/criterios.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-ponderacion-criterio',
  templateUrl: './ponderacion-criterio.component.html',
  styleUrls: ['./ponderacion-criterio.component.css']
})
export class PonderacionCriterioComponent  implements OnInit{
 

  model:Modelo=new Modelo();
  critrioClase =new Criterio();
  dataSource:any;
  asignacion:any;
  id:any;
  color:any
  chart:any;

  constructor(
    private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,
 
    public modeloService:ModeloService,
    public asignacionIndicadorService:AsignacionIndicadorService,
    private sharedDataService:SharedDataService,
    private criterioService:CriteriosService,
    private activatedRoute: ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
    //this.recibeCriterio();
   
   
    this.llenar_datasource();
  
   
  }

  recibeCriterio() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
   
        this.indicadorservice.obtenerIndicadoresPorCriterio(Number(id)).subscribe(result => {
          this.dataSource = result;
          
          console.log(this.dataSource);
        });
     
    });
  }

  llenar_datasource() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.indicadorservice.obtenerIndicadoresPorCriterio(this.id).subscribe(
      (data) => {
        this.dataSource = data;
        console.log(this.dataSource +'criteriooooooo');

        
        this.dataSource.forEach((indicador: any) => {
          
          if (indicador.porc_obtenido > 75 && indicador.porc_obtenido<=100) {
            indicador.color = 'verde'; // Indicador con porcentaje mayor a 50% será de color verde
          }
         else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido<=75) {
            indicador.color = 'amarillo'; // Indicador con porcentaje mayor a 50% será de color verde
          }
          else if(indicador.porc_obtenido > 25 && indicador.porc_obtenido<=50) {
            indicador.color = 'naranja'; // Indicador con porcentaje mayor a 50% será de color verde
          } else if (indicador.porc_obtenido <= 25) {
            indicador.color = 'rojo'; // Indicador con porcentaje menor a 30% será de color rojo
          } else {
            indicador.color = ''; // No se asigna ningún color a los indicadores que no cumplen las condiciones anteriores
          }
        });


        this.createChart();
        //grafica 

        const labels = this.dataSource.map((indicador: any) => indicador.subcriterio.criterio?.nombre);
      const salesData = ['467', '576', '572', '79', '92', '574', '573', '576'];
      const profitData = ['542', '542', '536', '327', '17', '0.00', '538', '541'];

      this.chart = new Chart("MyChartj", {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Sales",
              data: salesData,
              backgroundColor: 'blue'
            },
            {
              label: "Profit",
              data: profitData,
              backgroundColor: 'limegreen'
            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });

      ///fin

        
      }
    );
  
  }

  createChart(){
  
    const labels = this.dataSource.map((indicador: any) => indicador.subcriterio.criterio?.nombre);
    const salesData = ['467', '576', '572', '79', '92', '574', '573', '576'];
    const profitData = ['542', '542', '536', '327', '17', '0.00', '538', '541'];

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: profitData,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  

/*

    // Barras
    public barChartData: ChartDataSets[] = [
      { data: [5, 10], label: 'IE00B0M62S72 - iShares Euro Dividend UCITS ETF EUR' },
      { data: [20, 40], label: 'IE00B14X4T88 - iShares Asia Pacific Dividend UCITS ETF USD' },
      { data: [9, 4], label: 'IE00B0M63177 - iShares MSCI Emerging Markets UCITS ETF' },
      { data: [15, 10], label: 'IE00B27YCK28 - iShares MSCI EM Latin America UCITS ETF USD' }
    ];
  
    // Eje X
    public barChartLabels: Label[] = ['2019', '2020'];
  
    // Opciones de la gráfica
    public barChartOptions: ChartOptions = {
      responsive: true,
      // maintainAspectRatio: false,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      title: {
        text: 'Dividendo Anual',
        fontSize: 20,
        fontColor: 'rgba(0,0,0,1)',
        display: true
      },
      legend: {
        position: 'bottom',
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
  
    // Colores de las barras
    public barChartColors: Color[] = [
      { // Euro - Azul
        backgroundColor: 'rgba(0,0,255,1)',
        borderColor: 'rgba(0,0,255,1)',
        hoverBackgroundColor: 'rgba(0,0,255,1)',
        hoverBorderColor: 'rgba(0,0,255,1)'
      },
      { // Asia - Rojo
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(255,0,0,1)',
        hoverBackgroundColor: 'rgba(255,0,0,1)',
        hoverBorderColor: 'rgba(255,0,0,1)'
      },
      { // Emerging Markets - Amarillo
        backgroundColor: 'rgba(255,255,0,1)',
        borderColor: 'rgba(255,255,0,1)',
        hoverBackgroundColor: 'rgba(255,255,0,1)',
        hoverBorderColor: 'rgba(255,255,0,1)'
      },
      { // Latin America - Verde
        backgroundColor: 'rgba(0,255,0,1)',
        borderColor: 'rgba(0,255,0,1)',
        hoverBackgroundColor: 'rgba(0,255,0,1)',
        hoverBorderColor: 'rgba(0,255,0,1)'
      }
    ];
  
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    */

 
  
  

}
