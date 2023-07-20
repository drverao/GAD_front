import { Component } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';

@Component({
  selector: 'app-evaluacion-cualitativa',
  templateUrl: './evaluacion-cualitativa.component.html',
  styleUrls: ['./evaluacion-cualitativa.component.css']
})
export class EvaluacionCualitativaComponent {
  indicador: Indicador = new Indicador();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.indicador = history.state.data;
  }
}
