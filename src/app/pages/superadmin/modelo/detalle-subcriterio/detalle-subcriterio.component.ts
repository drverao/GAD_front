import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';

@Component({
  selector: 'app-detalle-subcriterio',
  templateUrl: './detalle-subcriterio.component.html',
  styleUrls: ['./detalle-subcriterio.component.css']
})
export class DetalleSubcriterioComponent {

  searchText = '';
  constructor(
    private indicadorservice: IndicadoresService,
    private subcriterioservice: SubcriteriosService,
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



  listar(): void {
    this.subcriterioservice.getSubcriterios().subscribe(
      (data: Subcriterio[]) => {
        this.subcriterios = data.filter(subcriterio => subcriterio.criterio?.id_criterio === 1);
      },
      (error: any) => {
        console.error('Error al listar los subcriterios:', error);
      }
    );
    this.listarSub();
  }

 
 



  verDetalles(subcriterio: any) {
    this.router.navigate(['/subcriterios-indicador'], { state: { data: subcriterio, criterio: this.criterio } });
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

}
