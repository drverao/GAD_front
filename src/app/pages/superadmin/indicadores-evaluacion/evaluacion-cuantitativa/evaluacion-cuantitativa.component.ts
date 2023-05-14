import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluacion-cuantitativa',
  templateUrl: './evaluacion-cuantitativa.component.html',
  styleUrls: ['./evaluacion-cuantitativa.component.css']
})
export class EvaluacionCuantitativaComponent {
  formula: string = '';
  valores: any[] = [{ valor: 'asdf', escala: 'asdf' }];

  agregarOperador(operador: string) {
    this.formula += operador;
  }

  agregarValor(valor: any) {
    this.formula += valor.valor;
  }
}
