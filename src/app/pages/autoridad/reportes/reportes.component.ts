import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartConfiguration, Color } from 'chart.js';
import { AutoIndicador } from 'src/app/models/AutoridadIndicador';
import { Indicador } from 'src/app/models/Indicador';
import { CriteriosService } from 'src/app/services/criterios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  title = 'ng2-charts-demo';

  //PIE
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [''];
  public pieChartDatasets = [{
    data: [0]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  //PIE 2
  valor1: number = 50;
  valor2: number = 50;
  porcenta: number = 0;
  public pieChartOptions2: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels2 = ['Porcentaje ' + this.valor1 + '%', 'Porcentaje ' + this.valor2 + '%'];
  public pieChartDatasets2 = [{
    data: [this.valor1, this.valor2]
  }];
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];
  //

  labesCriterios: any[] = [];
  datosPOrceCriter: number[] = [];
  criteri: any;
  valores: number[] = [];
  listaCriterios: any[] = [];
  listaIndicadores: AutoIndicador[] = [];
  constructor(private httpCriterios: CriteriosService) {
    //this.getButtonCriterio();
  }

  ngOnInit(): void {
    //this.getButtonIndicadores();
    this.getButtonCriterio();

    this.lineChartData = {
      labels: this.labesCriterios,
      datasets: [
        {
          data: this.datosPOrceCriter,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(102, 204, 255)'
        }
      ]
    };

  }

  getButtonCriterio() {
    this.httpCriterios.getObtenerCriterio().subscribe(
      data => {
        this.listaCriterios = data;
        console.log(this.listaCriterios)
        this.labesCriterios = data.map((dato) => dato.nombre);

        for (let index = 0; index < this.listaCriterios.length; index++) {
          const element = this.listaCriterios[index];
          console.log(element.id_criterio, "el id")
          this.httpCriterios.getObtenerIndicadores(element.id_criterio).subscribe(data => {

            this.valor1 = data.reduce((suma, dato) => suma + dato.peso, 0);
            this.valor2 = data.reduce((suma, dato) => suma + dato.valor_obtenido, 0);
            this.porcenta = Number(((this.valor2 * 100) / this.valor1).toFixed(2));

            console.log(this.porcenta, "el porce")
            console.log(this.valor1, "el v1")
            console.log(this.valor2, "el v2")
            this.datosPOrceCriter.push(this.porcenta);
            console.log(this.datosPOrceCriter)
            console.log(data);
          })
        }

        console.log(this.labesCriterios)
      }
    )
  }


  getButtonIndicadores() {

  }

  editar(ItemCrite: Indicador): void {
    this.criteri = ItemCrite;
    console.log(this.criteri.id_criterio)
    this.httpCriterios.getObtenerIndicadores(this.criteri.id_criterio).subscribe(
      data => {
        this.listaIndicadores = data;
        this.pieChartLabels = data.map((dato) => dato.nombre);
        this.valores = (data.map((dato) => dato.porc_utilida_obtenida));
        this.pieChartDatasets = [{
          data: this.valores
        }];

        //para el porcentaje de criterios
        this.valor1 = data.reduce((suma, dato) => suma + dato.peso, 0);
        this.valor2 = data.reduce((suma, dato) => suma + dato.valor_obtenido, 0);

        this.pieChartDatasets2 = [{
          data: [this.valor2, this.valor1]
        }];

        this.porcenta = Number(((this.valor2 * 100) / this.valor1).toFixed(2));
        this.pieChartLabels2 = ['Porcentaje ' + this.porcenta + '%'];
        console.log(this.listaIndicadores);
        console.log(this.valores);
        console.log(this.valor1);
      }
    )


  }

  //PARA LINEA DEL GRAFICO
  chartColors: any = [
    { // first color
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      borderColor: 'rgba(0, 0, 255, 1)',
      pointBackgroundColor: 'rgba(0, 0, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 0, 255, 0.8)'
    },
    { // second color
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      pointBackgroundColor: 'rgba(255, 0, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 0, 0, 0.8)'
    },
    // More colors can be added as needed
  ];


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labesCriterios,
    datasets: [
      {
        data: this.datosPOrceCriter,
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(102, 204, 255)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

}
