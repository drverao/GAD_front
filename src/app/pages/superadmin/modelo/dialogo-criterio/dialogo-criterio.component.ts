import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Criterio } from 'src/app/models/Criterio';
/*import { Indicador } from 'src/app/models/indicador';
import { Subcriterio } from 'src/app/models/subcriterio';
import { CriterioService } from 'src/app/services/criterio.service';
import { IndicadorService } from 'src/app/services/indicador.service';
import { SubcriterioService } from 'src/app/services/subcriterio.service';*/



@Component({
  selector: 'app-dialogo-criterio',
  templateUrl: './dialogo-criterio.component.html',
  styleUrls: ['./dialogo-criterio.component.css']
})
export class DialogoCriterioComponent implements OnInit {

  criterio: Criterio = new Criterio();
  listaCriterios: Criterio[] = [];
  /*subcriterio: Subcriterio = new Subcriterio();
  listaSubcriterios: Subcriterio[] = [];
  indicador: Indicador = new Indicador();
  listaIndicadores: Indicador[] = [];*/

/* eliminado las importaciones del constructor de Criterio Service, Subcriterio Service, Indicador Service */
  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit(): void {

    /*this.obtenerCriterios();
    this.obtenerSubcriterios();
    this.obtenerIndicadores(); */
  }
 
  /*
  public obtenerCriterios() {
    this.criterioService.getAllCriterios().subscribe(
      result => {
        this.listaCriterios = result;
        console.log(this.listaCriterios);
      });
  }
  public obtenerSubcriterios() {
    this.subcriterioService.getAllSubcriterios().subscribe(
      result => {
        this.listaSubcriterios = result;
        console.log(this.listaSubcriterios);
      });
  }
  public obtenerIndicadores() {
    this.indicadorService.getAllIndicadores().subscribe(
      result => {
        this.listaIndicadores = result;
        console.log(this.listaIndicadores);
      });
  }
  */
}
