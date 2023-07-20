import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Cualitativa } from 'src/app/models/Cualitativa';
import { Indicador } from 'src/app/models/Indicador';
import { FormulaService } from 'src/app/services/formula.service';

@Component({
  selector: 'app-cuanlitativa',
  templateUrl: './cuanlitativa.component.html',
  styleUrls: ['./cuanlitativa.component.css']
})
export class CuanlitativaComponent implements OnInit {
  searchText2 = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public cuali = new Cualitativa();
  listaCualitativa: Cualitativa[] = [];
  listaIndicador: Indicador[] = [];
  frmCualitativa: FormGroup;
  guardadoExitoso: boolean = true;
  guardadoExitoso2: boolean = false;

  constructor(
    private service: FormulaService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.frmCualitativa = fb.group({
      valor: ['', Validators.required],
      escala: ['', [Validators.required, Validators.maxLength(250)]],
      //indicador: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.listarCuali();
    this.listarIndicador();
  }

  guardarCuali(cualiNu: Cualitativa) {
    this.cuali = this.frmCualitativa.value;
    console.log(cualiNu)
    this.service.crearCuali(cualiNu).
      subscribe(
        (reponse) => {
          console.log('Formula Cualitativa creado con éxito:', reponse);
          this.cuali = new Cualitativa();
          this.listarCuali();
          this.guardadoExitoso = true;
          this.guardadoExitoso2 = false;
        },
        (error) => {
          console.error('Error al crear el formula cuanti:', error);
        }
      )
  }

  eliminarCuali(cuali: Cualitativa) {

    this.service.eliminarCuali(cuali).
      subscribe((reponse) => {
        this.listarCuali();
      },
        (error: any) => {
          console.error('Error al listar los formulas cuali al eliminar:', error);
        })
  }

  listarIndicador() {
    this.service.getIndicadors().
      subscribe(
        (data: any) => {
          this.listaIndicador = data;
        },
        (error: any) => {
          console.error('Error al listar las formulas cualitativas', error);
        }
      )
  }

  listarCuali() {
    this.service.getCualitativa().
      subscribe(


        (data: any) => {
          this.listaCualitativa = data;
        },
        (error: any) => {
          console.error('Error al listar las formulas cualitativas', error);
        }
      )
  }

  editDatosCuali(cualiN: Cualitativa) {
    this.cuali = cualiN;
    this.guardadoExitoso = false;
    this.guardadoExitoso2 = true;

    this.frmCualitativa = new FormGroup({
      valor: new FormControl(cualiN.valor),
      escala: new FormControl(cualiN.escala),
      //indicador: new FormControl(cualiN.indicador)
    });
  }

  limpiarFormulario2() {
    this.frmCualitativa.reset();
    this.cuali = new Cualitativa;
  }

  actualizarCuali() {
    console.log(this.cuali);
    this.service.actualizarCuali(this.cuali)
      .subscribe(response => {
        this.cuali = new Cualitativa();
        this.listarCuali();
        this.guardadoExitoso = true;
        this.guardadoExitoso2 = false;
      });

    this.cuali.escala = "";
    this.cuali.valor = 0;
  }

}

