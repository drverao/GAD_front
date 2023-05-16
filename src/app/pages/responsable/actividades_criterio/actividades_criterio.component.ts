import { Component, ViewChild } from '@angular/core';
import { ActividadesCriterio } from './actividades_criterio';
import { CriterioSubcriterio } from './criterio_subcriterio';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ActividadCriterioService } from 'src/app/services/actividad_criterio.service';
import { CriterioSubcriterioService } from 'src/app/services/criterio_subcriterio.service';
import { SubcriterioIndicadoresService } from 'src/app/services/subcriterio_indicadore.service';
import { SubcriterioIndicadores } from './subcriterio_indicadores';



@Component({
  selector: 'app-root',
  templateUrl: './actividades_criterio.component.html',
  styleUrls: ['./actividades_criterio.component.css']
})
export class ActividadesCriterioComponent {
  
  @ViewChild('materiaModalRef') materiaModalRef: any;

  public actividades_criterio: ActividadesCriterio[] = [];
  public actividad_criterio = new ActividadesCriterio();

  public criterios_subcriterios: CriterioSubcriterio[] = [];
  public criterio_subcriterio = new CriterioSubcriterio();

  public subcriterios_indicadores: SubcriterioIndicadores[] = [];
  public subcriterio_indicador = new SubcriterioIndicadores();



  constructor(private service: ActividadCriterioService,private servicesub: CriterioSubcriterioService,private serviceind: SubcriterioIndicadoresService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.get();
    this.getsub();
    this.getind();
  }
  

  get() {
    this.service.get()
      .subscribe(response => this.actividades_criterio = response);
  } 

  getsub() {
    this.servicesub.getSubcriterio().subscribe(responsesub => {
      this.criterios_subcriterios = responsesub;
      // Recorre cada objeto CriterioSubcriterio y obtén los indicadores
      for (const criterioSubcriterio of this.criterios_subcriterios) {
        this.serviceind.getIndicadorPorSubcriterio(criterioSubcriterio.id_subcriterio).subscribe(responseind => {
          criterioSubcriterio.lista_indicadores = responseind;
        });
      }
    });
  }
  
  

  getind(){
    this.serviceind.getIndicador()
    .subscribe(responseind => this.subcriterios_indicadores = responseind);
  }

  

}
