import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { Formulas } from 'src/app/models/Formulas';
import { FormulaService } from 'src/app/services/formula.service';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent implements OnInit {

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  listaFromulas: Formulas[] = [];
  miModal!: ElementRef;
  formulaN = new Formulas;
  frmFormulas: FormGroup;
  public formu = new Formulas();
  guardadoExitoso: boolean = false;

  constructor(private service: FormulaService, private fb: FormBuilder) {
    this.frmFormulas = fb.group({
      descripcion: ['', Validators.required],
       formula:   ['', [Validators.required], [Validators.maxLength(250)]]
    })
  }

  ngOnInit(): void {
    this.listar();
  }


  listar(): void {
    this.service.getFormulas().
      subscribe(
        data => {
          this.listaFromulas = data;
        }
      )
  }

  limpiarFormulario() {
    this.frmFormulas.reset();
    this.formu = new Formulas;
  }

  crear(): void {
    // this.criterioservice.crear(this.crite)
    //     .subscribe(
    //         (response) => {
    //             console.log('Criterio creado con éxito:', response);
    //         },
    //         (error) => {
    //             console.error('Error al crear el criterio:', error);
    //         }
    //     );
  }

  guardar() {
    this.formu = this.frmFormulas.value;
    this.service.crear(this.formu).
      subscribe(
        (reponse) => {
          this.guardadoExitoso = true;
          this.listar();
          console.log('Criterio creado con éxito:', reponse);
        },
        (error) => {
          console.error('Error al crear el criterio:', error);
        }
      )
  }

  editDatos(formulaN: Formulas) {
    this.formu = formulaN;
    this.frmFormulas = new FormGroup({
      descripcion: new FormControl(formulaN.descripcion),
      formula: new FormControl(formulaN.formula)
    });
  }

  eliminar(formula: Formulas) {

    this.service.eliminar(formula.id_formula).
    subscribe((reponse) =>{
      this.listar();
    },
    (error: any) => {
      console.error('Error al listar los criterios al eliminar:', error);
    })
  }

  actualizar() {
    alert(this.formu.id_formula)
    this.formu.descripcion = this.frmFormulas.value.descripcion;
    this.formu.formula = this.frmFormulas.value.formula;
    this.service.actualizar(this.formu.id_formula, this.formu)
      .subscribe(response => {
        this.formu = new Formulas();
        this.listar();
      });
  }
}
