import { EvaluarCuantitativaService } from './../../../../services/evaluar-cuantitativa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cuantitativa } from 'src/app/models/Cuantitativa';
import { Encabezado_Evaluar } from 'src/app/models/Encabezado-Evaluar';
import { Evaluar_Cuantitativa } from 'src/app/models/Evaluar-Cuantitativa';
import { Indicador } from 'src/app/models/Indicador';
import { EncabezadoEvaluarService } from 'src/app/services/encabezado-evaluar.service';
import { FormulaService } from 'src/app/services/formula.service';
import * as math from 'mathjs';
import { Formulas } from 'src/app/models/Formulas';
import { FormulaEvaluarService } from 'src/app/services/formula/formulaevaluar.service';

@Component({
  selector: 'app-evaluacion-cuantitativa',
  templateUrl: './evaluacion-cuantitativa.component.html',
  styleUrls: ['./evaluacion-cuantitativa.component.css']
})
export class EvaluacionCuantitativaComponent implements OnInit {
  constructor(
    private service: FormulaService,
    private evacuantitativaservice: EvaluarCuantitativaService,
    private encabezadoservice: EncabezadoEvaluarService,
    private formulaevaluar: FormulaEvaluarService,

  ) {
  }
  searchText2 = '';
  searchText = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public encabezado_evaluar = new Encabezado_Evaluar();
  public evaluarcuantitativa = new Evaluar_Cuantitativa();
  public formulaobject = new Formulas();


  listaCuantitativa: Cuantitativa[] = [];
  formula: string = '';
  descripcion: string = '';
  listaEvaluarCuant: Evaluar_Cuantitativa[] = [];

  valores: any[] = [{ valor: 'asdf', escala: 'asdf' }];
  indicador: Indicador = new Indicador();

  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.indicador = history.state.data;
    this.findEncabezado();

    this.formulaevaluar.evaluateEquation(3)
      .then(resultado => {
        console.log(resultado);
      })
      .catch(error => {
        console.error(error);
      });
  }
  agregarOperador(operador: string) {
    this.formula += operador;
  }

  agregarValor(valor: any) {
    this.formula += valor.cuantitativa.abreviatura;
  }
  agregarDescripcion(descripcion: string) {
    this.formula += descripcion;
  }
  borrarUltimoCaracter() {
    const regex = /\b\w+\b$/; // Expresión regular para buscar la última palabra
    const match = this.formula.match(regex);
    if (match) { // Si se encontró una palabra, borrarla completa
      this.formula = this.formula.slice(0, -match[0].length);
    } else { // Si no se encontró una palabra, borrar solo el último carácter
      this.formula = this.formula.slice(0, -1);
    }
  }
  guardarFormula(): void {
    this.formulaobject.formula = this.formula
    this.formulaobject.descripcion = this.descripcion
    if (this.encabezado_evaluar.formula?.id_formula == null) {
      //Creo la formula si no existe
      this.service.crear(this.formulaobject).subscribe(
        (response: any) => {
          console.log('formula creado con éxito:', response);
          this.formulaobject = response;
          this.encabezado_evaluar.formula = response;
          this.encabezadoservice.actualizar(this.encabezado_evaluar).subscribe(response => {
            this.findEncabezado();
          });
        },
        (error: any) => {
          console.error('Error al crear el formula:', error);
        }
      );
    } else {
      //Actualizo la formula 
      this.service.actualizar(this.encabezado_evaluar.formula?.id_formula, this.formulaobject).subscribe(
        (response: any) => {
          console.log('formula actualizada con éxito:', response);
          this.formulaobject = response;
          this.encabezado_evaluar.formula = response;
          this.encabezadoservice.actualizar(this.encabezado_evaluar).subscribe(response => {
            this.findEncabezado();
          });
        },
        (error: any) => {
          console.error('Error al actualizada el formula:', error);
        }
      );
    }
  }
  encabezadoslist: Encabezado_Evaluar[] = [];
  findEncabezado(): void {

    this.encabezadoservice.getEncabezado_Evaluar().subscribe(
      (data: any) => {
        this.encabezadoslist = data.filter((encabezado: Encabezado_Evaluar) => encabezado.indicador?.id_indicador === this.indicador.id_indicador);
        if (this.encabezadoslist.length == 0) {
          this.encabezado_evaluar.indicador = this.indicador;
          this.encabezadoservice.crear(this.encabezado_evaluar).subscribe(
            (response: any) => {
              console.log('Encabezado creado con éxito:', response);
              this.encabezado_evaluar = response;
              this.listarEvaCuant();
            },
            (error: any) => {
              console.error('Error al crear el Encabezado:', error);
            }
          );
        } else {
          this.encabezado_evaluar = this.encabezadoslist[0];
          console.log(this.encabezado_evaluar)
          this.listarEvaCuant();
          if (this.encabezado_evaluar.formula != undefined) {
            this.formula = this.encabezado_evaluar.formula?.formula + "";
            this.descripcion = this.encabezado_evaluar.formula?.descripcion + "";
          }


        }
      },
      (error: any) => {
        console.error('Error al listar los encabezados:', error);
      }
    );

  }
  findCuantitativa(): void {

    this.encabezadoservice.getEncabezado_Evaluar().subscribe(
      (data: any) => {

      },
      (error: any) => {
        console.error('Error al listar los encabezados:', error);
      }
    );

  }

  agregarVariable(cuanti: any) {
    console.log(cuanti)
    this.evaluarcuantitativa.cuantitativa = cuanti;
    this.evaluarcuantitativa.encabezado_evaluar = this.encabezado_evaluar;
    this.evacuantitativaservice.crear(this.evaluarcuantitativa).
      subscribe(
        (reponse) => {
          console.log('Formula Cauntitativa creado con éxito:', reponse);
          this.listarEvaCuant();

        },
        (error) => {
          console.error('Error al crear el formula cuanti:', error);
        }
      )
  }
  eliminarevacuant(cuanti: any) {
    this.evacuantitativaservice.eliminar(cuanti).
      subscribe((reponse) => {
        this.listarEvaCuant();
      },
        (error: any) => {
          console.error('Error al listar los formulas cuanti al eliminar:', error);
        })
  }
  listarCaunti(): void {
    this.service.getCuantitativa().subscribe(
      (data: any) => {
        this.listaCuantitativa = data.filter((cuantitativa: any) => {
          return !this.listaEvaluarCuant.some((evaluacion_cuantitativa: any) => {
            return evaluacion_cuantitativa.cuantitativa?.id_cuantitativa === cuantitativa.id_cuantitativa;
          });
        });
      },
      (error: any) => {
        console.error('Error al listar las formulas cuantitativas', error);
      }
    )
  }
  listarEvaCuant(): void {
    this.evacuantitativaservice.getEvaluar_Cuantitativas().
      subscribe(
        (data: any) => {
          this.listaEvaluarCuant = data.filter((evaluacion_cuantitativa: Evaluar_Cuantitativa) => evaluacion_cuantitativa.encabezado_evaluar?.id_encabezado_evaluar === this.encabezado_evaluar.id_encabezado_evaluar);
        },
        (error: any) => {
          console.error('Error al listar las formulas cuantitativas', error);
        }
      )
  }

  evaluateEquation(equation: string, letterValues: Record<string, number>): any {
    const substitutedEquation = equation.replace(/([A-Z]+)/g, (match, letter) => {
      const value = letterValues[letter];
      if (value === undefined) {
        throw new Error(`Unknown letter ${letter} in equation`);
      }
      return value.toString();
    });
    return math.evaluate(substitutedEquation);
  }

  //  evaluateEquation(equation: string, listaEvaluarCuant: Evaluar_Cuantitativa[]): number {
  //     const substitutedEquation = equation.replace(/([A-Z]+)/g, (match, letter) => {
  //     const evaluarCuant = listaEvaluarCuant.find((ec) => ec.cuantitativa?.abreviatura === letter);
  //     if (!evaluarCuant) {
  //       throw new Error(`Unknown letter ${letter} in equation`);
  //     }
  //     return evaluarCuant.valor.toString();
  //   });
  //   return eval(substitutedEquation);
  //   }

}