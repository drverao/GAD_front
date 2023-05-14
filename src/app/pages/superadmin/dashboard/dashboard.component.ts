import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AutoIndicador } from 'src/app/models/AutoridadIndicador';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { ActividadService } from 'src/app/services/actividad.service';
import { Actividades } from 'src/app/services/actividades';
import { CriteriosService } from 'src/app/services/criterios.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent2 implements OnInit {

  title = 'ng2-charts-demo';
  //VISTA PARA PIE
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
  //FIN DE VISTA

  
  public actividad = new Actividades();
  Actividades: any[] = [];
  Evidencias: any[] = [];
  constructor(private services: ActividadService, 
    private eviden:EvidenciaService,
    private httpCriterios: CriteriosService ) { }


  ngOnInit(): void {
    this.getButtonCriterio();
    this.listarActividad();
  }

  listarActividad() {
    this.services.get().subscribe(data => {
      this.Actividades = data;
    })
  }

  listarEvidencias() {
    this.eviden.getEvidencias().subscribe(data=>{
      this.Evidencias=data;
    })
  }


  //LISTA PARA CRITERIOS
  getButtonCriterio() {
    this.httpCriterios.getObtenerCriterio().subscribe(
      data => {
        this.listaCriterios = data;
        console.log(this.listaCriterios)
        // this.labesCriterios = data.map((dato) => dato.nombre);

        // for (let index = 0; index < this.listaCriterios.length; index++) {
        //   const element = this.listaCriterios[index];
        //   console.log(element.id_criterio, "el id")
        //   this.httpCriterios.getObtenerIndicadores(element.id_criterio).subscribe(data => {

        //     this.valor1 = data.reduce((suma, dato) => suma + dato.peso, 0);
        //     this.valor2 = data.reduce((suma, dato) => suma + dato.valor_obtenido, 0);
        //     this.porcenta = Number(((this.valor2 * 100) / this.valor1).toFixed(2));

        //     console.log(this.porcenta, "el porce")
        //     console.log(this.valor1, "el v1")
        //     console.log(this.valor2, "el v2")
        //     this.datosPOrceCriter.push(this.porcenta);
        //     console.log(this.datosPOrceCriter)
        //     console.log(data);
        //   })
        // }

        console.log(this.labesCriterios)
      }
    )
  }


  //LISTAR Y MOSTRAR LOS GRAFICOS
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

  //LISTAR Y MOSTRAR LOS GRAFICOS
  editar2(ItemCrite: Criterio): void {
    this.criteri = ItemCrite;
    console.log(this.criteri.id_criterio)
    this.httpCriterios.getObtenerIndicadores(ItemCrite.id_criterio).subscribe(
      data => {
        this.listaIndicadores = data;
        // this.pieChartLabels = data.map((dato) => dato.nombre);
        // this.valores = (data.map((dato) => dato.porc_utilida_obtenida));
        // this.pieChartDatasets = [{
        //   data: this.valores
        // }];

        //para el porcentaje de criterios
        this.valor1 = data.reduce((suma, dato) => suma + dato.peso, 0);
        this.valor2 = data.reduce((suma, dato) => suma + dato.valor_obtenido, 0);

        this.pieChartDatasets = [{
          data: [this.valor2, this.valor1]
        }];

        this.porcenta = Number(((this.valor2 * 100) / this.valor1).toFixed(2));
        this.pieChartLabels = ['Porcentaje ' + this.porcenta + '%'];
        // console.log(this.listaIndicadores);
        // console.log(this.valores);
        // console.log(this.valor1);
      }
    )


  }


}
