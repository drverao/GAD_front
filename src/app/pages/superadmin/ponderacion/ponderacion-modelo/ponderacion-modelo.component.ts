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
    this.RenderScatterchart();
    
   
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
           

 

       //calcular el porcentaje valor obyenido
       this.dataSource.forEach((indicador: any) => {
        indicador.porc_obtenido = (indicador.valor_obtenido * 100) / indicador.peso;
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


          const labels = ['Mayors  o igual al 25% : '+cantidadMayores25 ,
          'Menores o igual al 25% : '+cantidadamenor25,
          'Mayor a 75% : '+cantidadmayor75,
          'Mayor a 75% : '+cantidadmayor50]
//const colors = ['rgb(69,177,223)', 'rgb(99,201,122)', 'rgb(203,82,82)', 'rgb(229,224,88)'];
          
    
          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [
                {
                  
                  data: indicadoresMayor50,
        borderColor: '#3e95cd',
        label: 'Pordcentaje: ',
        backgroundColor: this.dataSource.map((indicador: any) => {
          if (indicador.porc_obtenido >75 &&indicador.porc_obtenido <=100) {
             return 'rgb(93, 237, 89)'; // verde
           } else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
             return 'rgb(238, 241, 23 )'; // Amarillo
           }
            else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
             return 'rgb(240, 157, 57 )'; // Naranja
             } else {
             return 'rgb(252, 0, 0 )'; // Color predeterminado (gris)
           }
         }),
        borderWidth: 3,
                },
                
              ],
            },
          });


          //oytraaaaaaaaaaaaaaaa

          const data = {
            labels: ['Porcentaje ' + this.dataSource.porc_obtenido + '%', 'Restante'],
            datasets: [{
              data: [],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
              hoverOffset: 4,
            }],
          };
          
          const myChart = new Chart('piechart', {
            type: 'pie',
            data: data,
          });
          

/*
          const data = {
            labels: ['Porcentaje ' + this.porcenta + '%'],
            datasets: [{
              label: 'My First Dataset',
          data: [this.valor2, this.valor1],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
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
          });*/
        });
      });
    });
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


  //CHART PASTEL

 /* this.dataSource.map((indicador: any) => {
    if (indicador.porc_obtenido >75 &&indicador.porc_obtenido <=100) {
       return 'rgb(93, 237, 89)'; // verde
     } else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
       return 'rgb(238, 241, 23 )'; // Amarillo
     }
      else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
       return 'rgb(240, 157, 57 )'; // Naranja
       } else {
       return 'rgb(252, 0, 0 )'; // Color predeterminado (gris)
     }
   }),  */
  

  
 
  








  //LISTAR Y MOSTRAR LOS GRAFICOS
 
/*
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

  */

}
