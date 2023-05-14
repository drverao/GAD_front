import { Component } from '@angular/core';

@Component({
  selector: 'app-indicadores-evaluacion',
  templateUrl: './indicadores-evaluacion.component.html',
  styleUrls: ['./indicadores-evaluacion.component.css']
})
export class IndicadoresEvaluacionComponent {
  textoMostrado = '';
  opcionSeleccionada = 'Ninguna opción seleccionada';

  mostrarH1(opcion: string) {
    this.textoMostrado = opcion;
    this.opcionSeleccionada = opcion;
  }
}
