import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { Actividad } from 'src/app/models/Actividad';
import { AutoIndicador } from 'src/app/models/AutoridadIndicador';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { Persona2 } from 'src/app/services/Persona2';
import { ActividadService } from 'src/app/services/actividad.service';
import { Actividades } from 'src/app/services/actividades';
import { CriteriosService } from 'src/app/services/criterios.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent2 implements OnInit {

  labesCriterios: any[] = [];
  datosPOrceCriter: number[] = [];
  criteri: any;
  valores: number[] = [0];
  listaCriterios: any[] = [];
  modeloMaximo:any;
  listaIndicadores: AutoIndicador[] = [];
  persona:Persona2 = new Persona2();
  //FIN DE VISTA


  public actividad = new Actividades();
  Actividades: Actividad[] = [];
  Evidencias: any[] = [];

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

  //barras
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: this.valores, label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private services: ActividadService,
    private eviden: EvidenciaService,
    private httpCriterios: CriteriosService) { }


  ngOnInit(): void {
    this.getButtonCriterio();
    this.getButtonCriterio2();
    this.listarActividad();
    this.modeloMax();
  }

  modeloMax(){
    this.httpCriterios.getModeMaximo().subscribe(data =>{
      this.modeloMaximo = data;
    })
  }

  listarActividad() {
    this.httpCriterios.getActividadAtrasada().subscribe(data => {
      this.Actividades = data;
    })
  }

  listarEvidencias() {
    this.eviden.getEvidencias().subscribe(data => {
      this.Evidencias = data;
    })
  }


  //LISTA PARA CRITERIOS
  getButtonCriterio() {
    this.httpCriterios.getObtenerCriterio().subscribe(
      data => {
        this.listaCriterios = data;
        console.log(this.listaCriterios)

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
        console.log(this.valores);
       
        this.pieChartDatasets = [{
          data: this.valores
        }];

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
       

        //para el porcentaje de criterios
        this.valor1 = data.reduce((suma, dato) => suma + dato.peso, 0);
        this.valor2 = data.reduce((suma, dato) => suma + dato.valor_obtenido, 0);

        this.pieChartDatasets2 = [{
          data: [this.valor2, this.valor1]
        }];

        this.porcenta = Number(((this.valor2 * 100) / this.valor1).toFixed(2));
        this.pieChartLabels2 = ['Porcentaje ' + this.porcenta + '%'];
        
      }
    )


  }

  valorObtenido: number[] = [];
  valorObtenter: number[] = [];

  //para la barras
  getButtonCriterio2() {
    this.httpCriterios.getObtenerCriterio().subscribe(
      data => {
        this.listaCriterios = data;
        this.labesCriterios = data.map((dato) => dato.nombre);


        //this.labesCriterios = data.map((dato) => dato.nombre);

        const requests = this.listaCriterios.map((element) => {
          return this.httpCriterios.getObtenerIndicadores(element.id_criterio);
        });

        forkJoin(requests).subscribe((response: any[]) => {
          for (let i = 0; i < response.length; i++) {
            const data = response[i];

            this.valorObtenter = data.reduce((suma: any, dato: { porc_utilida_obtenida: any; }) => suma.concat(dato.porc_utilida_obtenida), []);
            this.valorObtenido = data.reduce((suma: any, dato: { valor_obtenido: any; }) => suma.concat(dato.valor_obtenido), []);

            this.barChartData = {
              labels: this.labesCriterios,
              datasets: [
                { data: this.valorObtenter, label: 'Valor Obtenido' },
                { data: this.valorObtenido, label: 'Valor Obtener' }
              ]
            };

            console.log(this.barChartData,"aqui");

            break;
            
          }
        });
      }
    );
  }

  //para traer los datos del responsable
getPersonaActividad(objeto:Actividad){
  console.log(objeto.usuario.id)
  this.httpCriterios.getObtenerPersonaId(objeto.usuario.id).subscribe(
    data => {
      
      this.persona=data;
      console.log(this.persona);
    }
  )
}


}
