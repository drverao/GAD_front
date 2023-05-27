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
  constructor(
    private indicadorservice: IndicadoresService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public modeloService: ModeloService,
    public asignacionIndicadorService: AsignacionIndicadorService,
    public sharedDataService: SharedDataService,
    private subcriterioService: SubcriteriosService
  ) {
    this.frmIndicador = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      peso: ['', Validators.required],
      estandar: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
  
  subcriterio: Subcriterio = new Subcriterio();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `indicador` de la fila seleccionada.
    this.subcriterio = history.state.data;
  
    // Recuperar el estado almacenado al recargar la página
    const savedState = sessionStorage.getItem('savedState');
    if (savedState) {
      this.dataSource = JSON.parse(savedState);
      this.colresIndicador();
    } else {
      this.recibeIndicador();
    }
    this.recibeIndicador();
  
    // Detectar el evento de retroceso en el navegador
   this.verSubcriterios();
  }
  
  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public indic = new Indicador();
  
  frmIndicador: FormGroup;
  guardadoExitoso: boolean = false;
  model: Modelo = new Modelo();
  subcrite: Subcriterio = new Subcriterio();
  sub: any;
  dataSource: any;
  asignacion: any;
  
  colresIndicador() {
    this.dataSource.forEach((indicador: any) => {
      if (indicador.porc_obtenido > 75 && indicador.porc_obtenido <= 100) {
        indicador.color = 'verde';
      } else if (indicador.porc_obtenido > 50 && indicador.porc_obtenido <= 75) {
        indicador.color = 'amarillo';
      } else if (indicador.porc_obtenido > 25 && indicador.porc_obtenido <= 50) {
        indicador.color = 'naranja';
      } else if (indicador.porc_obtenido <= 25) {
        indicador.color = 'rojo';
      } else {
        indicador.color = '';
      }
    });
  }
  
  recibeIndicador() {
    let id = localStorage.getItem('id');
    this.modeloService.getModeloById(Number(id)).subscribe((data) => {
      this.model = data;
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe((info) => {
        this.indicadorservice.getIndicadors().subscribe((result) => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return (
                indicador.id_indicador === asignacion.indicador.id_indicador &&
                indicador.subcriterio?.id_subcriterio === this.sharedDataService.obtenerIdSubCriterio()
              );
            });
          });
          this.colresIndicador();
          console.log(this.dataSource);
  
          // Guardar el estado actual antes de navegar a otra página
          sessionStorage.setItem('savedState', JSON.stringify(this.dataSource));
        });
      });
    });
  }
  
  
  verSubcriterios1(indicador: Indicador) {
    localStorage.setItem("id", indicador.id_indicador.toString());
    this.router.navigate(['/detalle-subcriterio']);
  }
  
  verSubcriterios() {
    window.onpopstate = () => {
      if (this.router.url === '/detalle-subcriterio') {
        this.recibeIndicador();
      }
    };
  }
  
  verCriterios() {
    this.router.navigate(['/detallemodelo']);
  }
   goBack() {
    window.history.back();
    this.router.navigate(['/detalle-subcriterio']);
  }
  
  
}
