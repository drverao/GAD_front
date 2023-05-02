import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';

@Component({
  selector: 'app-criterios-subcriterio',
  templateUrl: './criterios-subcriterio.component.html',
  styleUrls: ['./criterios-subcriterio.component.css']
})
export class CriteriosSubcriterioComponent implements OnInit {
  searchText = '';
  constructor(private subcriterioservice: SubcriteriosService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.frmSubcriterio = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]]
    })
  }
  criterio: Criterio = new Criterio();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `subcriterio` de la fila seleccionada.
    this.criterio = data;
    this.listar()
  }

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public subcrite = new Subcriterio();
  subcriterios: any[] = [];
  frmSubcriterio: FormGroup;
  guardadoExitoso: boolean = false;

  guardar() {
    this.subcrite = this.frmSubcriterio.value;
    this.subcrite.criterio = this.criterio;
    this.subcriterioservice.crear(this.subcrite)
      .subscribe(
        (response: any) => {
          console.log('Criterio creado con éxito:', response);
          this.guardadoExitoso = true;
          this.listar();
        },
        (error: any) => {
          console.error('Error al crear el subcriterio:', error);
        }
      );

  }
  eliminar(subcriterio_id: any) {
    this.subcriterioservice.eliminar(subcriterio_id).subscribe(
      (response: any) => {
        this.listar()
      }
    );
  }

  listar(): void {
    this.subcriterioservice.getSubcriterios().subscribe(
      (data: Subcriterio[]) => {
        this.subcriterios = data.filter(subcriterio => subcriterio.criterio?.id_criterio === this.criterio.id_criterio);
      },
      (error: any) => {
        console.error('Error al listar los subcriterios:', error);
      }
    );
  }

  editDatos(subcriterio: Subcriterio) {
    // this.subcrite.id_subcriterio = subcriterio.id_subcriterio
    // this.subcrite.nombre = subcriterio.nombre
    // this.subcrite.descripcion = subcriterio.descripcion
    this.subcrite = subcriterio;
    this.frmSubcriterio = new FormGroup({
      nombre: new FormControl(subcriterio.nombre),
      descripcion: new FormControl(subcriterio.descripcion)

    });
  }

  crear(): void {
    // this.subcriterioservice.crear(this.subcrite)
    //     .subscribe(
    //         (response) => {
    //             console.log('Criterio creado con éxito:', response);
    //         },
    //         (error) => {
    //             console.error('Error al crear el subcriterio:', error);
    //         }
    //     );
  }
  limpiarFormulario() {
    this.frmSubcriterio.reset();
    this.subcrite = new Subcriterio;
  }

  actualizar() {
    this.subcrite.nombre = this.frmSubcriterio.value.nombre;
    this.subcrite.descripcion = this.frmSubcriterio.value.descripcion;

    this.subcriterioservice.actualizar(this.subcrite.id_subcriterio, this.subcrite)
      .subscribe((response: any) => {
        this.subcrite = new Subcriterio();
        this.listar();
      });
  }

  verDetalles(subcriterio: any) {
    this.router.navigate(['/subcriterios-indicador'], { state: { data: subcriterio } });
  }
}
