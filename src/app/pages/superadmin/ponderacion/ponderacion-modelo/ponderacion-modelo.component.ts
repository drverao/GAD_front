import { Component, OnInit, ViewChild } from '@angular/core';


import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Modelo } from 'src/app/models/Modelo';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { Chart, ChartOptions } from 'chart.js';
import { Indicador } from 'src/app/models/Indicador';



@Component({
  selector: 'app-ponderacion-modelo',
  templateUrl: './ponderacion-modelo.component.html',
  styleUrls: ['./ponderacion-modelo.component.css']
})
export class PonderacionModeloComponent  implements OnInit{

  @ViewChild("chart")
  chart :any;

  model:Modelo=new Modelo();
  dataSource:any;
  asignacion:any;
  
  indicadorClase: Indicador=new Indicador();
  title = 'ng-chart';
  //chart: any = [];
  result: any;
  coinPrice: any;
  coinName: any;
  porcentaje!: number;
  suma:any;

  constructor(
    private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    public modeloService:ModeloService,
    public asignacionIndicadorService:AsignacionIndicadorService
  ) {
  }

  ngOnInit(): void {
    this.recibeIndicador();
 
    
   
  }

  recibeIndicador() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador ;
              
            });

            
          });
           
          this.createChart();
          this.pieChart();
          this.calculatePromedioPorCriterio();


        });
      });
    });
  }

  
  calculatePromedioPorCriterio() {
    const promediosPorCriterio: { [criterio: string]: number } = {};
    const conteoIndicadoresPorCriterio: { [criterio: string]: number } = {};
  
    this.dataSource.forEach((indicador: any) => {
      const criterioNombre = indicador.subcriterio.criterio?.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] += 1;
        } else {
          promediosPorCriterio[criterioNombre] = indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] = 1;
        }
      }
    });
  
    Object.keys(promediosPorCriterio).forEach((criterio: string) => {
      const indicadoresCount = conteoIndicadoresPorCriterio[criterio];
      const promedioCriterio = promediosPorCriterio[criterio] / indicadoresCount;
      promediosPorCriterio[criterio] = promedioCriterio;
    });
    console.log(promediosPorCriterio);
  
    console.log(conteoIndicadoresPorCriterio);
  }
  

  RenderScatterchart(){
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
    data: [300, 50, 18,25,12,12,12],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(78, 57, 151)',
      'rgb(153, 168, 66)'
    ],
    hoverOffset: 4
      }],
    };
    const myChart = new Chart('piechartk', {
      type: 'pie',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }

  pieChart(){
    this.dataSource.forEach((indicador: any) => {
      indicador.porc_obtenido = (indicador.valor_obtenido * 100) / indicador.peso;
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

 

const indicadoresMayores25 = this.dataSource.filter((indicador: any) =>indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50);

const cantidadMayores25 = indicadoresMayores25.length;
console.log('Cantidad de indicadores con valor obtenido mayor a 25%:', cantidadMayores25);

//MENORES A 25
const indicadoresamenor25 = this.dataSource.filter((indicador: any) => indicador.porc_obtenido <=25 );
const cantidadamenor25 = indicadoresamenor25.length;
console.log('Cantidad de indicadores con valor obtenido menor a 25%:', cantidadamenor25);

//MAS DE 50

const indicadoresMayor50 = this.dataSource.filter((indicador: any) => indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75 );
const cantidadmayor50 = indicadoresMayor50.length;
console.log('Cantidad de indicadores con valor obtenido mayor a 50%:', cantidadmayor50);


//mayor 75
const indicadoresMayor75 = this.dataSource.filter((indicador: any) => indicador.porc_obtenido >75  );
const cantidadmayor75 = indicadoresMayor75.length;
console.log('Cantidad de indicadores con valor obtenido mayor 75%:', cantidadmayor75 );
    //nuevaaa


    const labels = [
    'Mayor a 75% : '+cantidadmayor75,
    'Mayor a 50% : '+cantidadmayor50,
    'Mayors  o igual al 25% : '+cantidadMayores25 ,
    'Menores o igual al 25% : '+cantidadamenor25,]
const colors =  this.dataSource.map((indicador: any) => {


if (indicador.porc_obtenido > 75 && indicador.porc_obtenido <= 100) {
return 'rgb(93, 237, 89)'; // verde
} else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
return 'rgb(238, 241, 23)'; // Amarillo
} else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
return 'rgb(240, 157, 57)'; // Naranja
} else  if(indicador.porc_obtenido <25){
return 'rgb(252, 0, 0)'; // Color predeterminado (rojo)
} else {
return 'rgb(252, 0, 0)';
}

});
  

const data = {
labels: labels,
datasets: [{
label: 'My First Dataset',
data: [cantidadmayor75, cantidadmayor50, cantidadMayores25, cantidadamenor25],
backgroundColor: colors,
hoverOffset: 4
}],
};

const myChart = new Chart('piechart', {
type: 'pie',
data: data,
options: {
scales: {
x: {
  type: 'linear',
  position: 'bottom'
}
}
}
});




  }

  createChart() {

    const promediosPorCriterio: { [criterio: string]: number } = {};
    const conteoIndicadoresPorCriterio: { [criterio: string]: number } = {};
  
    this.dataSource.forEach((indicador: any) => {
      const criterioNombre = indicador.subcriterio.criterio?.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] += 1;
        } else {
          promediosPorCriterio[criterioNombre] = indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] = 1;
        }
      }
    });
  
    Object.keys(promediosPorCriterio).forEach((criterio: string) => {
      const indicadoresCount = conteoIndicadoresPorCriterio[criterio];
      const promedioCriterio = promediosPorCriterio[criterio] / indicadoresCount;
      promediosPorCriterio[criterio] = promedioCriterio;
    });
    console.log(promediosPorCriterio);
  
    console.log(conteoIndicadoresPorCriterio);
    const labels = this.dataSource.map((indicador: any) => indicador.subcriterio.criterio?.nombre);
    const filteredLabels = labels.filter((label:any, index:any) => labels.indexOf(label) === index).slice(0, 2);
  
    const salesData = ['467', '576', '572', '79', '92', '574', '573', '576'];
    const profitData = ['542', '542', '536', '327', '17', '0.00', '538', '541'];
  
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: "Promedio mayor a 75",
            data: filteredLabels.map((label: string) => {
              const promedio = promediosPorCriterio[label];
              return promedio > 75 && label === 'infraestructura' ? promedio : null;
            }),
            backgroundColor: 'green'
          },
          {
            label: "Promedio menor o igual a 75",
            data: filteredLabels.map((label: string) => {
              const promedio = promediosPorCriterio[label];
              return promedio <= 75 && promedio > 50 ? promedio : null;
            }),
            backgroundColor: 'Yellow'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    
  }

  createChart1() {
    const labels = this.dataSource.map((indicador: any) => indicador.subcriterio.criterio?.nombre);
    const filteredLabels = labels.filter((label: any, index: any) => labels.indexOf(label) === index).slice(0, 2);
  
    const promediosPorCriterio: { [criterio: string]: number } = {};
  
    this.dataSource.forEach((indicador: any) => {
      const criterioNombre = indicador.subcriterio.criterio?.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += indicador.porc_obtenido;
        } else {
          promediosPorCriterio[criterioNombre] = indicador.porc_obtenido;
        }
      }
    });
  
    Object.keys(promediosPorCriterio).forEach((criterio: string) => {
      const indicadoresFiltrados = this.dataSource.filter((indicador: any) => indicador.subcriterio.criterio?.nombre === criterio);
      const indicadoresCount = indicadoresFiltrados.length;
      const promedioCriterio = indicadoresFiltrados.reduce((total: number, indicador: any) => total + indicador.porc_obtenido, 0) / indicadoresCount;
      promediosPorCriterio[criterio] = promedioCriterio;
      console.log(promedioCriterio +'  :por cri');
    });
  
    const promedioGeneral = Object.values(promediosPorCriterio).reduce((total, promedio) => total + promedio, 0) / Object.keys(promediosPorCriterio).length;
    console.log(promedioGeneral+' :general');
    const salesData = ['467', '576', '572', '79', '92', '574', '573', '576'];
    const profitData = ['542', '542', '536', '327', '17', '0.00', '538', '541'];
  
    const salesColor = promedioGeneral > 75 ? 'green' : 'blue';
    const profitColor = promedioGeneral > 75 ? 'green' : 'limegreen';
  
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: salesColor
          },
          {
            label: "Profit",
            data: profitData,
            backgroundColor: profitColor
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  

  coloresTabla(){
    this.dataSource.forEach((indicador: any) => {

      if (indicador.porc_obtenido > 75 && indicador.porc_obtenido <= 100) {
        indicador.color = 'verde'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
        indicador.color = 'amarillo'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
        indicador.color = 'naranja'; // Indicador con porcentaje mayor a 50% será de color verde
      } else if (indicador.porc_obtenido <= 25) {
        indicador.color = 'rojo'; // Indicador con porcentaje menor a 30% será de color rojo
      } else {
        indicador.color = ''; // No se asigna ningún color a los indicadores que no cumplen las condiciones anteriores
      }
    });
  }

  

  
 

}
