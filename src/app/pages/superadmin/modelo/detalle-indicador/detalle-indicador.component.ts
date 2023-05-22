import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Indicador } from 'src/app/models/Indicador';
import { Modelo } from 'src/app/models/Modelo';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.css']
})
export class DetalleIndicadorComponent implements OnInit {

  searchText = '';
  constructor(private indicadorservice: IndicadoresService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    public modeloService: ModeloService,
    public asignacionIndicadorService: AsignacionIndicadorService,
    public sharedDataService: SharedDataService
  ) {
    this.frmIndicador = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      peso: ['', Validators.required],
      estandar: ['', Validators.required],
      tipo: ['', Validators.required],
    })
  }
  subcriterio: Subcriterio = new Subcriterio();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.subcriterio = history.state.data;
    this.recibeIndicador();
  }

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public indic = new Indicador();
  indicadors: any[] = [];
  frmIndicador: FormGroup;
  guardadoExitoso: boolean = false;
  model: Modelo = new Modelo();
  dataSource: any;
  asignacion: any;



  recibeIndicador() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador && indicador.subcriterio?.id_subcriterio === this.sharedDataService.obtenerIdSubCriterio();

            });
          });
          console.log(this.dataSource);
        });
      });
    });
  }
  verSubcriterios() {
    this.router.navigate(['/criterios-subcriterio'], { state: { data: this.subcriterio.criterio } });
  }
  verCriterios() {
    this.router.navigate(['/criterioSuper']);
  }

}
