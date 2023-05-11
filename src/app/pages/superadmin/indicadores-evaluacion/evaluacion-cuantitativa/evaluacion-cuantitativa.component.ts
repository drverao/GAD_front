import { Component, OnInit } from '@angular/core';
import { Encabezado_Evaluar } from 'src/app/models/Encabezado-Evaluar';
import { Indicador } from 'src/app/models/Indicador';
import { EncabezadoEvaluarService } from 'src/app/services/encabezado-evaluar.service';

@Component({
  selector: 'app-evaluacion-cuantitativa',
  templateUrl: './evaluacion-cuantitativa.component.html',
  styleUrls: ['./evaluacion-cuantitativa.component.css']
})
export class EvaluacionCuantitativaComponent implements OnInit {
  constructor(
    private encabezadoservice: EncabezadoEvaluarService,

  ) {
  }
  public encabezado_evaluar = new Encabezado_Evaluar();

  formula: string = '';
  valores: any[] = [{ valor: 'asdf', escala: 'asdf' }];
  indicador: Indicador = new Indicador();

  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.indicador = history.state.data;
    this.findEncabezado()
  }
  agregarOperador(operador: string) {
    this.formula += operador;
  }

  agregarValor(valor: any) {
    this.formula += valor.valor;
  }


  findEncabezado(): void {

    this.encabezadoservice.getEncabezado_Evaluar().subscribe(
      (data: any) => {
        if (data.length == 0) {
          this.encabezado_evaluar.indicador = this.indicador;
          this.encabezadoservice.crear(this.encabezado_evaluar).subscribe(
            (response: any) => {
              console.log('Criterio creado con éxito:', response);
              this.encabezado_evaluar = response;
            },
            (error: any) => {
              console.error('Error al crear el subcriterio:', error);
            }
          );
        } else {
          this.encabezado_evaluar=data[0];
        }
      },
      (error: any) => {
        console.error('Error al listar los encabezados:', error);
      }
    );
    
  }
}
