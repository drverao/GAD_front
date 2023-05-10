import { Component, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';

@Component({
  selector: 'app-indicadores-evaluacion',
  templateUrl: './indicadores-evaluacion.component.html',
  styleUrls: ['./indicadores-evaluacion.component.css']
})
export class IndicadoresEvaluacionComponent implements OnInit{
  textoMostrado = '';
  opcionSeleccionada = 'Ninguna opción seleccionada';

  mostrarH1(opcion: string) {
    this.textoMostrado = opcion;
    this.opcionSeleccionada = opcion;
  }
  indicador: Indicador = new Indicador();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.indicador = history.state.data;
  }
}
