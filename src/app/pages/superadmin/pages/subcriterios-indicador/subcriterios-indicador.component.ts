import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import Swal from 'sweetalert2';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { Evidencia } from 'src/app/models/Evidencia';

@Component({
  selector: 'app-subcriterios-indicador',
  templateUrl: './subcriterios-indicador.component.html',
  styleUrls: ['./subcriterios-indicador.component.css'],
})
export class SubcriteriosIndicadorComponent {
  searchText = '';
  constructor(
    private indicadorservice: IndicadoresService,
    private evidenciaservice: EvidenciaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.frmIndicador = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      peso: ['', Validators.required],
      estandar: [''],
      tipo: ['', Validators.required],
    });
  }
  selectedTipo: string = '';
  indicadorId: any;
  subcriterio: Subcriterio = new Subcriterio();
  ngOnInit() {
    this.subcriterio = history.state.data;
    if (this.subcriterio == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }

    this.indicadorId = this.subcriterio.id_subcriterio;
    console.log(this.indicadorId);
    this.listarindi(this.indicadorId);
    // this.listar()
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
    this.indicadorservice.crear(this.indic).subscribe(
      (response: any) => {
        console.log('Subcriterio creado con éxito:', response);
        this.guardadoExitoso = true;
        this.listarindi(this.indicadorId);

        // this.listar();
        Swal.fire(
          'Exitoso',
          'Se ha completado el registro con exito',
          'success'
        );
      },
      (error: any) => {
        console.error('Error al crear el indicador:', error);
        Swal.fire('Error', 'Ha ocurrido un error', 'warning');
      }
    );
  }
  eliminar(indicador: any) {
    Swal.fire({
      title: 'Estas seguro de eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Cacelar',
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (!result.isConfirmed) {
        this.indicadorservice
          .eliminar(indicador.id_indicador, indicador)
          .subscribe((response: any) => {
            this.listarindi(this.indicadorId);

            // this.listar()
            Swal.fire('Eliminado!', '', 'success');
          });
      }
    });
  }

  listarindi(indicardorId: any) {
    this.indicadorservice.listaindicadorPorsubCriterio(indicardorId).subscribe(
      (data) => {
        this.indicadors = data;

        this.copiaindicadr=data
        // Handle the received data as per your application logic
      },
      (error) => {
        console.error('Error fetching subcriteria:', error);
      }
    );
  }
  // listar(): void {
  //   this.indicadorservice.getIndicadors().subscribe(
  //     (data: Indicador[]) => {
  //       this.indicadors = data.filter(indicador => indicador.subcriterio?.id_subcriterio === this.subcriterio.id_subcriterio);
  //       this.listarSub();
  //     },
  //     (error: any) => {
  //       console.error('Error al listar los indicadors:', error);
  //     }
  //   );
  // }

  editDatos(indicador: Indicador) {
    this.indic = indicador;
    this.frmIndicador = new FormGroup({
      nombre: new FormControl(indicador.nombre),
      descripcion: new FormControl(indicador.descripcion),
      peso: new FormControl(indicador.peso),
      estandar: new FormControl(indicador.estandar),
      tipo: new FormControl(indicador.tipo),
    });
  }

  limpiarFormulario() {
    this.frmIndicador.reset();
    this.indic = new Indicador();
  }

  actualizar() {
    this.indic.nombre = this.frmIndicador.value.nombre;
    this.indic.descripcion = this.frmIndicador.value.descripcion;
    this.indic.estandar = this.frmIndicador.value.estandar;
    this.indic.tipo = this.frmIndicador.value.tipo;

    this.indicadorservice
      .actualizar(this.indic.id_indicador, this.indic)
      .subscribe((response: any) => {
        this.indic = new Indicador();
        this.listarindi(this.indicadorId);
        // this.listar();
        Swal.fire(
          'Operacion exitosa!',
          'El registro se actualizo con exito',
          'success'
        );
      });
  }
  verEvaluacion(indicador: any) {
    this.router.navigate(['/evaluacion-cuantitativa'], {
      state: { data: indicador },
    });
  }
  verEvidencias(indicador: any) {
    this.router.navigate(['/indicador-evidencia'], {
      state: { data: indicador },
    });
  }
  verSubcriterios() {
    this.router.navigate(['/criterios-subcriterio'], {

      state: { data: this.subcriterio,criterio:this.subcriterio.id_subcriterio },
      
    });
  }
  verCriterios() {
    this.router.navigate(['/criterioSuper']);
  }

  lista_evidencias: any[] = [];
  getEvidenciaPorIndicador(indicador: Indicador): number {
    let contador = 0;
    for (let evidencia of this.lista_evidencias) {
      if (evidencia.indicador.id_indicador === indicador.id_indicador) {
        contador++;
      }
    }
    return contador;
  }
  listarSub(): void {
    this.evidenciaservice.getEvidencias().subscribe(
      (data: Evidencia[]) => {
        this.lista_evidencias = data;
      },
      (error: any) => {
        console.error('Error al listar los indicadores:', error);
      }
    );
  }
  copiaindicadr: any[] = [];

  busqueda(even: any) {
    let bus = even.target.value;
    if (!bus) {
      this.indicadors = this.copiaindicadr;
    } else {
      let pal = this.indicadors.filter(
        (subcriterio: any) =>
          subcriterio.nombre.toLowerCase().includes(bus)       
          );
      this.indicadors = pal;
    }
  }
}
