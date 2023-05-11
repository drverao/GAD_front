import { EvaluarCuantitativaService } from './../../../../services/evaluar-cuantitativa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cuantitativa } from 'src/app/models/Cuantitativa';
import { Encabezado_Evaluar } from 'src/app/models/Encabezado-Evaluar';
import { Evaluar_Cuantitativa } from 'src/app/models/Evaluar-Cuantitativa';
import { Indicador } from 'src/app/models/Indicador';
import { EncabezadoEvaluarService } from 'src/app/services/encabezado-evaluar.service';
import { FormulaService } from 'src/app/services/formula.service';

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

  ) {
  }
  searchText2 = '';
  searchText = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public encabezado_evaluar = new Encabezado_Evaluar();
  public evaluarcuantitativa = new Evaluar_Cuantitativa();
  listaCuantitativa: Cuantitativa[] = [];
  formula: string = '';
  listaEvaluarCuant: Evaluar_Cuantitativa[] = [];

  valores: any[] = [{ valor: 'asdf', escala: 'asdf' }];
  indicador: Indicador = new Indicador();

  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.indicador = history.state.data;
    this.findEncabezado()

    this.listarEvaCuant();
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
    this.formula = this.formula.slice(0, -1);
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
          this.encabezado_evaluar = data[0];
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
  eliminarevacuant(cuanti:any){
    this.evacuantitativaservice.eliminar(cuanti).
    subscribe((reponse) =>{
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
          this.listaEvaluarCuant = data.filter((evaluacion_cuantitativa: any) => evaluacion_cuantitativa.encabezado_evaluar?.id_encabeado_evaluar === this.encabezado_evaluar.id_encabeado_evaluar);
        },
        (error: any) => {
          console.error('Error al listar las formulas cuantitativas', error);
        }
      )
  }
}
