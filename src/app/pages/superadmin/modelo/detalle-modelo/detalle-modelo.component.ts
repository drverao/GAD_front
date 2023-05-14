import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Router } from '@angular/router';
import { Modelo } from 'src/app/models/Modelo';
import { CriteriosService } from 'src/app/services/criterios.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ActivatedRoute } from '@angular/router';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { Criterio } from 'src/app/models/Criterio';

type ColumnNames = {
  [key: string]: string;
}

@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetalleModeloComponent implements OnInit {

  public columnNames: ColumnNames = {
    nombre: 'Nombre del Criterio',
    descripcion: 'Descripción del Criterio'
  };

  dataSource: any;
  asignacion: any;
  public indic = new Indicador();
  model: Modelo = new Modelo();
  subcriterio:Subcriterio=new Subcriterio();
  public criterio=new Criterio();


  columnsToDisplay = ['nombre', 'descripcion'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'matriz', 'ponderacion'];
  expandedElement: any;


  constructor(
    private route: ActivatedRoute,
    public modeloService: ModeloService,
    public criterioService: CriteriosService,
    public subcriterioService: SubcriteriosService,
    public indicadorService: IndicadoresService,
    private asignacionIndicadorService: AsignacionIndicadorService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private indicadorservice: IndicadoresService
    ) { }

  ngOnInit(): void {
    this.recibeModelo();
  }

  recibeModelo() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.criterioService.getCriterios().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((criterio: any) => {
            return info.some((asignacion: any) => {
              return criterio.id_criterio === asignacion.indicador.subcriterio.criterio.id_criterio;
            });
          });
          console.log(this.dataSource);
        });
      });
    });
  }

  mostrar(element: any) {
    console.log(element);
    this.sharedDataService.agregarIdCriterio(element.id_criterio);
    this.router.navigate(['/detalle-subcriterio']);
  }

  evaluacion(event: Event, element: any) {
    event.stopPropagation();
    // código del método del botón
    this.sharedDataService.agregarIdCriterio(element.id_criterio);
  }

  ponderacion(event: Event, element: any) {
    event.stopPropagation();
    // código del método del botón
    this.sharedDataService.agregarIdCriterio(element.id_criterio);
  }

  irPonderacion(element:any){
   
    //llevar modelo
      console.log(element);
      this.sharedDataService.capturarIdPonderacion(element.id_modelo);
 

      //llevar criterio
    /*  localStorage.setItem("id", element.id_criterio.toString());
      console.log(element.id_criterio)
      this.criterio = element;
      //llevar subcriterio
      localStorage.setItem("id", element.id_subcriterio.toString());
      console.log(element.id_subcriterio)
      this.subcriterio = element;
      //llevar indicador
      localStorage.setItem("id", element.id_indicador.toString());
      console.log(element.id_indicador)
      this.indic = element; */

      this.router.navigate(['/ponderacion-criterio']);

   
  }

  enviarCriterio(llevarCriterio: Criterio): void {
    localStorage.setItem("id", llevarCriterio.id_criterio.toString());
    console.log(llevarCriterio.id_criterio)
    this.criterio = llevarCriterio;
    this.router.navigate(['/ponderacion-criterio']);
  }
 




}