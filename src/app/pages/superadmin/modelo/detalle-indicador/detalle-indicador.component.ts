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
import { SubcriteriosService } from 'src/app/services/subcriterios.service';


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
    public sharedDataService: SharedDataService,
    private subcriterioService:SubcriteriosService
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
 
  frmIndicador: FormGroup;
  guardadoExitoso: boolean = false;
  model: Modelo = new Modelo();
  subcrite:Subcriterio=new Subcriterio();
  sub:any;
  dataSource: any;
  asignacion: any;

  colresIndicador() {
    this.dataSource.forEach((indicador: any) => {
     
      if (indicador.porc_obtenido > 75 && indicador.porc_obtenido <= 100) {
        indicador.color = 'verde'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
        indicador.color = 'amarillo'; // Indicador con porcentaje mayor a 50% será de color verde
      }
      else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
        indicador.color = 'naranja'; // Indicador con porcentaje mayor a 50% será de color verde
      } else if (indicador.porc_obtenido <= 25) {
        indicador.color = 'rojo'; // Indicador con porcentaje menor a 30% será de color rojo
      } else {
        indicador.color = ''; // No se asigna ningún color a los indicadores que no cumplen las condiciones anteriores
      }
    });
  }
  
  recibeIndicador() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
      this.subcriterioService.geSubcritebyId(Number(id)).subscribe(data => {
        this.sub=data;
        console.log(this.sub+'id sub');
        this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
          this.indicadorservice.getIndicadors().subscribe(result => {
            this.dataSource = [];
            this.asignacion = info;
            this.dataSource = result.filter((indicador: any) => {
              return info.some((asignacion: any) => {
                return indicador.id_indicador === asignacion.indicador.id_indicador && indicador.subcriterio?.id_subcriterio === this.sub.id_subcriterio;
              });
            });
            this.colresIndicador();
            console.log(this.dataSource);
          });
        });
      });
    });
  }
  

  verSubcriterios1(indicador:Indicador) {

    localStorage.setItem("id", indicador.id_indicador.toString());
    console.log(indicador.id_indicador)
    this.indic = indicador;
    this.router.navigate(['/detalle-subcriterio']);
  }
  

  verSubcriterios() {
    this.router.navigate(['/detalle-subcriterio'], { state: { dataSource: this.subcriterio.criterio } });
  }
  verCriterios() {
    this.router.navigate(['/detallemodelo']);
  }

}
