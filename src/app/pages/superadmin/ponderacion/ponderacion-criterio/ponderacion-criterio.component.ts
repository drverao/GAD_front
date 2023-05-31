import { Component, OnInit, ViewChild } from '@angular/core';



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
export class PonderacionCriterioComponent implements OnInit {


  model: Modelo = new Modelo();
  critrioClase = new Criterio();
  dataSource: any;
  asignacion: any;
  id: any;
  color: any
  chart: any;
  idModelo: any;

  constructor(
    private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,

    public modeloService: ModeloService,
    public asignacionIndicadorService: AsignacionIndicadorService,
    private sharedDataService: SharedDataService,
    private criterioService: CriteriosService,
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
      this.id = params['criterio'];
      this.idModelo = params['modelo'];

    });
    this.indicadorservice.listarIndicadorPorCriterioModelo(this.id, this.idModelo).subscribe(
      (data) => {
        this.dataSource = data;
        console.log(this.dataSource + 'criteriooooooo');


     this.coloresTabla();
     this.GraficaPastel();



      }
    );

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


  //GRAFICA PASTEL

  GraficaPastel() {

  

    this.chart = new Chart("pastel", {
      type: 'pie',
      data: {
        labels: ['Menor o igual al 25%', 'Mayor al 25% y menor o igual al 50%', 'Mayor al 50% y menor al 75%', 'Mayor al 75%'],
        datasets: [
          {
            label: "Porcentaje de logro",
            data: [
              this.dataSource.filter((indicador:any) => indicador.porc_obtenido <= 25).length,
              this.dataSource.filter((indicador:any)  => indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50).length,
              this.dataSource.filter((indicador:any) => indicador.porc_obtenido > 50 && indicador.porc_obtenido < 75).length,
              this.dataSource.filter((indicador:any)  => indicador.porc_obtenido >= 75).length
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
  

  verSubcriterios() {
    this.router.navigate(['/detallemodelo']);
  }




}
