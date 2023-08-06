import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CriteriosService } from 'src/app/services/criterios.service';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import Swal from 'sweetalert2';
import { event } from 'jquery';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css'],
})
export class CriteriosComponent implements OnInit {
  searchText = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public crite = new Criterio();
  criterios: any[] = [];
  copiacriterios: any[] = [];
  frmCriterio: FormGroup;
  guardadoExitoso: boolean = false;
  constructor(
    private subcriterioservice: SubcriteriosService,
    private criterioservice: CriteriosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.frmCriterio = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.listar();
  }
  guardar() {
    this.crite = this.frmCriterio.value;
    this.criterioservice.crear(this.crite).subscribe(
      (response) => {
        console.log('Criterio creado con éxito:', response);
        this.guardadoExitoso = true;
        this.listar();
        Swal.fire(
          'Exitoso',
          'Se ha completado el registro con exito',
          'success'
        );
      },
      (error) => {
        console.error('Error al crear el criterio:', error);
        Swal.fire('Error', 'Ha ocurrido un error', 'warning');
      }
    );
  }
  eliminar(criterio: any) {
    Swal.fire({
      title: 'Estas seguro de eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Cacelar',
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (!result.isConfirmed) {
        if (this.getSubcriteriosPorCriterio(criterio) == 0) {
          this.criterioservice.eliminar(criterio).subscribe((response) => {
            this.listar();
            Swal.fire('Eliminado!', '', 'success');
          });
        } else {
          Swal.fire(
            'Error!',
            'Este criterio no se puede eliminar, tiene subcriterios',
            'warning'
          );
        }
      }
    });
  }

  listar(): void {
    this.criterioservice.getCriterios().subscribe(
      (data: any[]) => {
        this.criterios = data;
        this.copiacriterios = data;
      },
      (error: any) => {
        console.error('Error al listar los criterios:', error);
      }
    );
    this.listarSub();
  }

  editDatos(criterio: Criterio) {
    // this.crite.id_criterio = criterio.id_criterio
    // this.crite.nombre = criterio.nombre
    // this.crite.descripcion = criterio.descripcion
    this.crite = criterio;
    this.frmCriterio = new FormGroup({
      nombre: new FormControl(criterio.nombre),
      descripcion: new FormControl(criterio.descripcion),
    });
  }

  limpiarFormulario() {
    this.frmCriterio.reset();
    this.crite = new Criterio();
  }

  actualizar() {
    this.crite.nombre = this.frmCriterio.value.nombre;
    this.crite.descripcion = this.frmCriterio.value.descripcion;
    this.criterioservice
      .actualizar(this.crite.id_criterio, this.crite)
      .subscribe((response) => {
        this.crite = new Criterio();
        this.listar();
        Swal.fire(
          'Operacion exitosa!',
          'El registro se actualizo con exito',
          'success'
        );
      });
  }

  verDetalles(criterio: any) {
    this.router.navigate(['/criterios-subcriterio'], {
      state: { data: criterio },
    });
  }

  lista_subcriterios: any[] = [];

  getSubcriteriosPorCriterio(criterio: Criterio): number {
    let contador = 0;
    for (let subcriterio of this.lista_subcriterios) {
      if (subcriterio.criterio.id_criterio === criterio.id_criterio) {
        contador++;
      }
    }
    return contador;
  }
  listarSub(): void {
    this.subcriterioservice.getSubcriterios().subscribe(
      (data: Subcriterio[]) => {
        this.lista_subcriterios = data;
      },
      (error: any) => {
        console.error('Error al listar los subcriterios:', error);
      }
    );
  }

  buscar(even: any) {
    let bus = even.target.value;
    if (!bus) {
      this.criterios = this.copiacriterios;
    } else {
      let pal = this.criterios.filter(
        (criterio: any) =>
          criterio.nombre.toLowerCase().includes(bus) ||
          criterio.descripcion.toLowerCase().includes(bus)
      );
      this.criterios = pal;
    }
  }
}
