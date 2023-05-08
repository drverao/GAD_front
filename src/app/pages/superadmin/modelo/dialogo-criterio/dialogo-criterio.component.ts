import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';

export interface CriterioEstructura {
  id_criterio: number;
  nombre: string;
  descripcion: string;
  visible: boolean;
  subcriterio: SubcriterioEstructura[];
}
export interface SubcriterioEstructura {
  id_subcriterio: number;
  nombre: string;
  descripcion: string;
  visible: boolean;
  indicador: IndicadorEstructura[];
}
export interface IndicadorEstructura {
  id_indicadores: number;
  nombre: string;
  descripcion: string;
  peso: number;
  estandar: number;
  tipo: string;
  visible: boolean;
}


@Component({
  selector: 'app-dialogo-criterio',
  templateUrl: './dialogo-criterio.component.html',
  styleUrls: ['./dialogo-criterio.component.css']
})
export class DialogoCriterioComponent implements OnInit {

  criterio: Criterio = new Criterio();
  listaCriterios: Criterio[] = [];
  subcriterio: Subcriterio = new Subcriterio();
  listaSubcriterios: Subcriterio[] = [];
  indicador: Indicador = new Indicador();
  listaIndicadores: Indicador[] = [];

  listaEstructura: CriterioEstructura[] = [];

  constructor(private _formBuilder: FormBuilder, private criterioService: CriteriosService, private subcriterioService: SubcriteriosService, private indicadorService: IndicadoresService) {

  }
  ngOnInit(): void {
    this.listarCriterios();
  }

  crearEstructura() {
    //llenar listaEstuctura con criterios y subcriterios e indicadores que se encuentren en los arreglos con forEach
    this.listaCriterios.forEach(criterio => {
      let criterioEstructura: CriterioEstructura = {
        id_criterio: criterio.id_criterio,
        nombre: criterio.nombre,
        descripcion: criterio.descripcion,
        visible: criterio.visible,
        subcriterio: []
      }
      this.listaEstructura.push(criterioEstructura);
    }
    )
    this.listaSubcriterios.forEach(subcriterio => {
      let subcriterioEstructura: SubcriterioEstructura = {
        id_subcriterio: subcriterio.id_subcriterio,
        nombre: subcriterio.nombre,
        descripcion: subcriterio.descripcion,
        visible: subcriterio.visible,
        indicador: []
      }
      this.listaEstructura.forEach(criterio => {
        if (subcriterio && subcriterio.criterio && subcriterio.criterio.id_criterio == criterio.id_criterio) {
          criterio.subcriterio.push(subcriterioEstructura);
        }
      })
    }
    )
    this.listaIndicadores.forEach(indicador => {
      let indicadorEstructura: IndicadorEstructura = {
        id_indicadores: indicador.id_indicadores,
        nombre: indicador.nombre,
        descripcion: indicador.descripcion,
        peso: indicador.peso,
        estandar: indicador.estandar,
        tipo: indicador.tipo,
        visible: indicador.visible
      }
      this.listaEstructura.forEach(criterio => {
        criterio.subcriterio.forEach(subcriterio => {
          if (indicador.subcriterio.id_subcriterio == subcriterio.id_subcriterio) {
            subcriterio.indicador.push(indicadorEstructura);
          }
        })
      })
    }
    )
    console.log(this.listaEstructura);
  }


  //consumir servicio de listar criterios
  listarCriterios() {
    this.criterioService.listarCriterio()
      .subscribe(data => {
        this.listaCriterios = data;
        console.log(this.listaCriterios);
      })
    this.listarSubcriterios();
  }
  //consumir servicio de listar subcriterios
  listarSubcriterios() {
    this.subcriterioService.getSubcriterios()
      .subscribe(data => {
        this.listaSubcriterios = data;
        console.log(this.listaSubcriterios);
      })
    this.listarIndicadores();
  }

  //consumir servicio de listar indicadores
  listarIndicadores() {
    this.indicadorService.getIndicadors()
      .subscribe(data => {
        this.listaIndicadores = data;
        console.log(this.listaIndicadores);
        this.crearEstructura();
      })

  }
}
