import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-criterios-subcriterio',
  templateUrl: './criterios-subcriterio.component.html',
  styleUrls: ['./criterios-subcriterio.component.css'],
})
export class CriteriosSubcriterioComponent implements OnInit {
  subcopiacriterios: any[] = [];

  constructor(
    private indicadorservice: IndicadoresService,
    private subcriterioservice: SubcriteriosService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.frmSubcriterio = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
    });
  }
  criterio: Criterio = new Criterio();
  criterioId: any | undefined;
  ngOnInit() {
    const data = history.state.data;
    this.criterio = data;
    if (this.criterio == undefined) {
      this.router.navigate(['user-dashboard']);
      location.replace('/user-dashboard');
    }
    this.criterioId = this.criterio.id_criterio;
    console.log(this.criterioId);

    this.listarsubcri(this.criterioId);

    // this.listar()
  }

  // buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public subcrite = new Subcriterio();
  subcriterios: any[] = [];
 frmSubcriterio: FormGroup;
  guardadoExitoso: boolean = false;

  guardar() {
    this.subcrite = this.frmSubcriterio.value;
    this.subcrite.criterio = this.criterio;
    this.subcriterioservice.crear(this.subcrite).subscribe(
      (response: any) => {
        console.log('Criterio creado con éxito:', response);
        this.guardadoExitoso = true;
        // this.listar();
        Swal.fire(
          'Exitoso',
          'Se ha completado el registro con exito',
          'success'
        );
      },
      (error: any) => {
        console.error('Error al crear el subcriterio:', error);
        Swal.fire('Error', 'Ha ocurrido un error', 'warning');
      }
    );
  }
  eliminar(subcriterio: any) {
    Swal.fire({
      title: 'Estas seguro de eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Cacelar',
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (!result.isConfirmed) {
        if (this.getIndicadoresPorSubriterio(subcriterio) == 0) {
          this.subcriterioservice
            .eliminar(subcriterio)
            .subscribe((response) => {
              // this.listar()
              Swal.fire('Eliminado!', '', 'success');
            });
        } else {
          Swal.fire(
            'Error!',
            'Este subcriterio no se puede eliminar, tiene indicadores',
            'warning'
          );
        }
      }
    });
  }

  listarsubcri(criterioId: any) {
    this.subcriterioservice.listaSubcriteriosPorCriterio(criterioId).subscribe(
      (data) => {
        this.subcriterios = data;
        this.subcopiacriterios=data;
        // Handle the received data as per your application logic
      },
      (error) => {
        console.error('Error fetching subcriteria:', error);
      }
    );
  }
  // listar(): void {
  //   this.subcriterioservice.getSubcriterios().subscribe(
  //     (data: Subcriterio[]) => {
  //       this.subcriterios = data.filter(subcriterio => subcriterio.criterio?.id_criterio === this.criterio.id_criterio);
  //     },
  //     (error: any) => {
  //       console.error('Error al listar los subcriterios:', error);
  //     }
  //   );
  //   this.listarSub();
  // }

  editDatos(subcriterio: Subcriterio) {
    this.subcrite = subcriterio;
    this.frmSubcriterio = new FormGroup({
      nombre: new FormControl(subcriterio.nombre),
      descripcion: new FormControl(subcriterio.descripcion),
    });
  }

  limpiarFormulario() {
    this.frmSubcriterio.reset();
    this.subcrite = new Subcriterio();
  }

  actualizar() {
    this.subcrite.nombre = this.frmSubcriterio.value.nombre;
    this.subcrite.descripcion = this.frmSubcriterio.value.descripcion;

    this.subcriterioservice
      .actualizar(this.subcrite.id_subcriterio, this.subcrite)
      .subscribe((response: any) => {
        this.subcrite = new Subcriterio();
        // this.listar();
        Swal.fire(
          'Operacion exitosa!',
          'El registro se actualizo con exito',
          'success'
        );
      });
  }

  verDetalles(subcriterio: any) {
    this.router.navigate(['/subcriterios-indicador'], {
      state: { data: subcriterio, criterio: this.criterio },
    });
  }
  verCriterios() {
    this.router.navigate(['/criterioSuper']);
  }

  //Numero de indicadores
  lista_indicadores: any[] = [];
  getIndicadoresPorSubriterio(subcriterio: Subcriterio): number {
    let contador = 0;
    for (let indicador of this.lista_indicadores) {
      if (indicador.subcriterio.id_subcriterio === subcriterio.id_subcriterio) {
        contador++;
      }
    }
    return contador;
  }
  listarSub(): void {
    this.indicadorservice.getIndicadors().subscribe(
      (data: Indicador[]) => {
        this.lista_indicadores = data;
      },
      (error: any) => {
        console.error('Error al listar los indicadores:', error);
      }
    );
  }

  buscar(even: any) {
    let bus = even.target.value;
    if (!bus) {
      this.subcriterios = this.subcopiacriterios;
    } else {
      let pal = this.subcriterios.filter(
        (subcriterio: any) =>
          subcriterio.nombre.toLowerCase().includes(bus) ||
          subcriterio.descripcion.toLowerCase().includes(bus)
      );
      this.subcriterios = pal;
    }
  }
}
