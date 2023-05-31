import { Component, OnInit } from '@angular/core';
import { Modelo } from 'src/app/models/Modelo';
import { ModeloService } from 'src/app/services/modelo.service';
import { PonderacionService } from 'src/app/services/ponderacion.service';
import { Ponderacion } from 'src/app/models/Ponderacion';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Chart, ChartOptions } from 'chart.js';
import { Indicador } from 'src/app/models/Indicador';


@Component({
  selector: 'app-ponderacionfinal',
  templateUrl: './ponderacionfinal.component.html',
  styleUrls: ['./ponderacionfinal.component.css']
})
export class PonderacionfinalComponent implements  OnInit  {

  dataSource: any;
  modelo = new Modelo();
  ponderacion: any;
  ponde = new Ponderacion();
  fecha: any;
  datosFiltrados: any;
  chart: any;
  model: Modelo = new Modelo();
 
  asignacion: any;
  indicadorClase: Indicador = new Indicador();
  title = 'ng-chart';
  porcentaje!: number;
  indicador: any;
  ponderacionClase: Ponderacion = new Ponderacion();
 
  guardarponde: any;
  ponderacionv: any;
  //Variable para ponderacion
 
  peso: number = 0;
  porc_obtenido: number = 0;
  porc_utilida_obtenida: number = 0;
  valor_obtenido: number = 0;

  constructor(
    private servicePonderacion: PonderacionService,
    private modeloService: ModeloService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarPonderacion();
  }

  listarPonderacion() {
    this.servicePonderacion.listarPonderacion().subscribe(
      (data: Ponderacion[]) => {
        this.ponderacion = data;
        console.log(this.ponderacion); // Verificar si los datos se cargaron correctamente
  
        this.route.queryParams.subscribe(params => {
          const fechaSeleccionada = params["fecha"];
          console.log(fechaSeleccionada); // Verificar la fecha seleccionada
  
          this.listarDatosPorFecha(fechaSeleccionada);
          this.coloresTabla();
       
             
          this.GraficaPastel();
          this.calculatePromedioPorCriterio();
  
          this.calcularTSumaPesos();
          this.calcularUtilidad();
        });
        
      
      },
      (error: any) => {
        console.error('Error al listar ponderacion:', error);
      }
    );
  }
  i:any;
  listarDatosPorFecha(fechaSeleccionada: string): void {
    const fechaSeleccionadaFormatted = formatDate(fechaSeleccionada, 'yyyy-MM-dd', 'en-US');
  
    this.datosFiltrados = this.ponderacion.filter((dato: any) => {
      const fechaDato = formatDate(dato.fecha, 'yyyy-MM-dd', 'en-US');
  
      return fechaDato === fechaSeleccionadaFormatted;
    });
  
    console.log(this.datosFiltrados); // Verificar si los datos filtrados son correctos
  
    this.dataSource = this.datosFiltrados;
    this.createChart();
    this.GraficaPastel();
    this.coloresTabla();
       
             
    
          this.calculatePromedioPorCriterio();
  
          this.calcularTSumaPesos();
          this.calcularUtilidad();
   
    this.getRowCountCriterio(this.dataSource.subcriterio.criterio.nombre,this.i);
            this.getRowCountSubcriterio(this.dataSource.subcriterio.nombre,this.i);
  }
  


  
  coloresTabla(){
    this.ponderacion.forEach((ponderacion: any) => {

      if (ponderacion.porc_obtenido > 75 && ponderacion.porc_obtenido <= 100) {
        ponderacion.color = 'verde'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (ponderacion.porc_obtenido > 50 && ponderacion.porc_obtenido <= 75) {
        ponderacion.color = 'amarillo'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (ponderacion.porc_obtenido > 25 && ponderacion.porc_obtenido <= 50) {
        ponderacion.color = 'naranja'; // Indicador con porcentaje mayor a 50% será de color verde
      } else if (ponderacion.porc_obtenido <= 25) {
        ponderacion.color = 'rojo'; // Indicador con porcentaje menor a 30% será de color rojo
      } else {
        ponderacion.color = ''; // No se asigna ningún color a los indicadores que no cumplen las condiciones anteriores
      }
    });
  }
  getRowCountCriterio1(criterio: string, index: number): number {
    let count = 1;
    for (let i = index + 1; i < this.dataSource.length; i++) {
      if (this.dataSource[i].indicador.subcriterio.criterio.nombre === criterio) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
  
  getRowCountSubcriterio1(subcriterio: string, index: number): number {
    let count = 1;
    for (let i = index + 1; i < this.dataSource.length; i++) {
      if (this.dataSource[i].indicador.subcriterio.nombre === subcriterio) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
  getRowCountCriterio(criterio: string, index: number): number {
    this.metodoordenar();
    let count = 1;
    for (let i = index + 1; i < this.dataSource.length; i++) {
      if (this.dataSource[i].indicador.subcriterio.criterio.nombre === criterio) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  getRowCountSubcriterio(subcriterio: string, index: number): number {
  this.metodoordenar();
    let count = 1;
    for (let i = index + 1; i < this.dataSource.length; i++) {
      if (this.dataSource[i].indicador.subcriterio.nombre === subcriterio) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  

  // Para ordenar la tabla y no repetir
  metodoordenar() {
    this.dataSource.sort((a: any, b: any) => {
      if (a.indicador.subcriterio.criterio.nombre < b.indicador.subcriterio.criterio.nombre) {
        return -1;
      }
      if (a.indicador.subcriterio.criterio.nombre > b.indicador.subcriterio.criterio.nombre) {
        return 1;
      }
      if (a.indicador.subcriterio.nombre < b.indicador.subcriterio.nombre) {
        return -1;
      }
      if (a.indicador.subcriterio.nombre > b.indicador.subcriterio.nombre) {
        return 1;
      }
      return 0;
    });
  }


  GraficaPastel() {



    this.chart = new Chart("pastel", {
      type: 'pie',
      data: {
        labels: ['Menor o igual al 25%', 'Mayor al 25% y menor o igual al 50%', 'Mayor al 50% y menor al 75%', 'Mayor al 75%'],
        datasets: [
          {
            label: "Porcentaje de logro",
            data: [
              this.dataSource.filter((indicador: any) => indicador.porc_obtenido <= 25).length,
              this.dataSource.filter((indicador: any) => indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50).length,
              this.dataSource.filter((indicador: any) => indicador.porc_obtenido > 50 && indicador.porc_obtenido < 75).length,
              this.dataSource.filter((indicador: any) => indicador.porc_obtenido >= 75).length
            ],
            backgroundColor: ['red', 'orange', 'yellow', 'green']
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });



  }

  //Grafica de barras

  createChart() {

    const promediosPorCriterio: { [criterio: string]: number } = {};
    const conteoIndicadoresPorCriterio: { [criterio: string]: number } = {};

    this.dataSource.forEach((ponderacion: any) => {
      const criterioNombre = ponderacion.indicador.subcriterio.criterio?.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += ponderacion.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] += 1;
        } else {
          promediosPorCriterio[criterioNombre] = ponderacion.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] = 1;
        }
      }
    });

    Object.keys(promediosPorCriterio).forEach((criterio: string) => {
      const indicadoresCount = conteoIndicadoresPorCriterio[criterio];
      const promedioCriterio = promediosPorCriterio[criterio] / indicadoresCount;
      promediosPorCriterio[criterio] = promedioCriterio;
    });
    console.log(promediosPorCriterio,"PROMEDIO");

    console.log(conteoIndicadoresPorCriterio,"CONTEO");
    const labels = this.dataSource.map((ponderacion: any) => ponderacion.indicador.subcriterio.criterio?.nombre);

    const filteredLabels = labels.filter((label: any, index: any) => labels.indexOf(label) === index).slice(0, 15);
    console.log(filteredLabels + 'filtro criterios');
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
              return promedio > 75 ? promedio : null;
            }),
            backgroundColor: 'green'
          },
          {
            label: "Promedio mayoa 50 y menor igual a 75",
            data: filteredLabels.map((label: string) => {
              const promedio = promediosPorCriterio[label];
              return promedio <= 75 && promedio > 50 ? promedio : null;
            }),
            backgroundColor: 'Yellow'
          },
          {
            label: "Promedio mayor a 25 menor a 50 ",
            data: filteredLabels.map((label: string) => {
              const promedio = promediosPorCriterio[label];
              return promedio > 25 && promedio <= 50 ? promedio : null;
            }),
            backgroundColor: 'orange'
          },
          {
            label: "Promedio menor a 25%",
            data: filteredLabels.map((label: string) => {
              const promedio = promediosPorCriterio[label];
              return promedio < 25 ? promedio : null;
            }),
            backgroundColor: 'red'
          }

        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: 'black',
            formatter: function (value: any, context: any) {
              const promedio = context.dataset.data[context.dataIndex];
              return promedio !== null ? promedio + '%' : '';
            }
          }
        }
      }

    });

  }

  calculatePromedioPorCriterio() {
    const promediosPorCriterio: { [criterio: string]: number } = {};
    const conteoIndicadoresPorCriterio: { [criterio: string]: number } = {};

    this.dataSource.forEach((ponderacion: any) => {
      const criterioNombre = ponderacion.indicador.subcriterio.criterio?.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += ponderacion.indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] += 1;
        } else {
          promediosPorCriterio[criterioNombre] = ponderacion.indicador.porc_obtenido;
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

  //Suma de todos los pesos

  sumaTotalPesos: number = 0;

  calcularTSumaPesos(): void {
    this.sumaTotalPesos = this.dataSource.reduce((suma: any, indicador: any) => suma + indicador.peso, 0);
    console.log(this.sumaTotalPesos + ' : el total es')
  }

  //Calcular las uttilidades
  sumaUtilidad: number = 0;

  calcularUtilidad(): void {
    this.sumaUtilidad = this.dataSource.reduce((suma: any, indicador: any) => suma + indicador.porc_utilida_obtenida, 0);
    console.log(this.sumaUtilidad + ' : el total es')
  }
  irinicio() {

    // código del método del botón
    this.router.navigate(['/detallemodelo']);

  }

}


