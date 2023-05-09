import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { Criterio } from 'src/app/models/Criterio';

@Component({
  selector: 'app-subcriterios-indicador',
  templateUrl: './subcriterios-indicador.component.html',
  styleUrls: ['./subcriterios-indicador.component.css']
})
export class SubcriteriosIndicadorComponent {
  searchText = '';
  constructor(private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.frmIndicador = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      peso: ['', Validators.required],
      tipo: ['', Validators.required],
    })
  }
  subcriterio: Subcriterio = new Subcriterio();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.subcriterio = history.state.data;
    this.listar()
  }

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public indic = new Indicador();
  indicadors: any[] = [];
  frmIndicador: FormGroup;
  guardadoExitoso: boolean = false;

  guardar() {
    this.indic = this.frmIndicador.value;
    this.indic.subcriterio = this.subcriterio;
    this.indicadorservice.crear(this.indic)
      .subscribe(
        (response: any) => {
          console.log('Subcriterio creado con éxito:', response);
          this.guardadoExitoso = true;
          this.listar();
        },
        (error: any) => {
          console.error('Error al crear el indicador:', error);
        }
      );

  }
  eliminar(indicador: any) {
    this.indicadorservice.eliminar(indicador.id_indicadores, indicador).subscribe(
      (response: any) => {
        this.listar()
      }
    );
  }

  listar(): void {
    this.indicadorservice.getIndicadors().subscribe(
      (data: Indicador[]) => {
        this.indicadors = data.filter(indicador => indicador.subcriterio?.id_subcriterio === this.subcriterio.id_subcriterio);
      },
      (error: any) => {
        console.error('Error al listar los indicadors:', error);
      }
    );
  }

  editDatos(indicador: Indicador) {
    // this.indic.id_indicador = indicador.id_indicador
    // this.indic.nombre = indicador.nombre
    // this.indic.descripcion = indicador.descripcion
    this.indic = indicador;
    this.frmIndicador = new FormGroup({
      nombre: new FormControl(indicador.nombre),
      descripcion: new FormControl(indicador.descripcion),
      peso: new FormControl(indicador.peso),
      tipo: new FormControl(indicador.tipo)
    });
  }

  crear(): void {
    // this.indicadorservice.crear(this.indic)
    //     .subscribe(
    //         (response) => {
    //             console.log('Subcriterio creado con éxito:', response);
    //         },
    //         (error) => {
    //             console.error('Error al crear el indicador:', error);
    //         }
    //     );
  }
  limpiarFormulario() {
    this.frmIndicador.reset();
    this.indic = new Indicador;
  }

  actualizar() {
    this.indic.nombre = this.frmIndicador.value.nombre;
    this.indic.descripcion = this.frmIndicador.value.descripcion;

    this.indicadorservice.actualizar(this.indic.id_indicador, this.indic)
      .subscribe((response: any) => {
        this.indic = new Indicador();
        this.listar();
      });
  }

  verSubcriterios() {
    this.router.navigate(['/criterios-subcriterio'], { state: { data: this.subcriterio.criterio } });
  }
  verCriterios() {
    this.router.navigate(['/criterioSuper']);
  }
}
