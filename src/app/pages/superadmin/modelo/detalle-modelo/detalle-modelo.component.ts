import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Router } from '@angular/router';
import { Modelo } from 'src/app/models/Modelo';
import { CriteriosService } from 'src/app/services/criterios.service';
import { Criterio } from 'src/app/models/Criterio';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import { Indicador } from 'src/app/models/Indicador';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ActivatedRoute } from '@angular/router';
import { InicioModeloComponent } from '../inicio-modelo/inicio-modelo.component';

@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {

  listaGeneralModelo: number = 0;
  modeloClase: Modelo[] = [];
  criterioClase: Criterio[] = [];
  subcriterioClase: Subcriterio[] = [];
  indicadorClase: Indicador[] = [];
  componentm: InicioModeloComponent[] = [];

  datasource: any[] = [];

  selectedCAD: Modelo | null = null;
  elementoSeleccionado: any;
  criterio: Criterio = new Criterio();
  model: Modelo = new Modelo();
  indicador: Indicador = new Indicador();
  datosCargados = false;

  constructor(
    private route: ActivatedRoute,
    public modeloService: ModeloService,
    public criterioService: CriteriosService,
    public subcriterioService: SubcriteriosService,
    public indicadorService: IndicadoresService,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.listaModelo();

    this.criterioService.getCriterios().subscribe(data => {
      console.log(data);
    });


    this.listaIndicador();

    this.listaModelo();

    if (!this.datosCargados) {
      this.recibeModelo();
    }
  }







  listaModelo() {
    this.modeloService.listarModelo().subscribe(data => {
      this.datasource = data;
    });
  }
  listaCriterio() {
    this.criterioService.listarCriterio()
      .subscribe(data => {
        this.criterioClase = data;
      })
  }
  listaSubcriterio() {
    this.subcriterioService.listarSubcriterio()
      .subscribe(data => {
        this.subcriterioClase = data;
      })
  }
  listaIndicador() {



    this.indicadorService.getIndicadors().subscribe(data => {
      console.log(data);
    });
  }

  recibeModelo() {
    let id = localStorage.getItem("id");
    console.log(`El ID seleccionado es: ${id}`);
    this.modeloService.getModeloById(Number(id))
      .subscribe(data => {
        this.model = data;
        this.datosCargados = true;
      });



  }







  id: any = '';
  accordion(ids: any) {
    if (this.id == ids) {
      this.id = '';
    }
    else {
      this.id = ids;
    }

  }


}