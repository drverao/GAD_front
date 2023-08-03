import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { Indicador } from 'src/app/models/Indicador';

@Component({
  selector: 'app-crear-modelo',
  templateUrl: './crear-modelo.component.html',
  styleUrls: ['./crear-modelo.component.css'],
  providers: [MessageService],
})
export class CrearModeloComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  selectedAccordionIndex: number = 0;
  IndicadoresSeleccionados: any[] = [];
  visible: boolean = false;
  Criterios: any[] = [];
  SubCriterios: any[] = [];
  Indicadores: any[] = [];
  selectedCriterio: any;
  selectedSubCriterio: any;
  constructor(
    public messageService: MessageService,
    private router: Router,
    private criterioService: CriteriosService,
    private subcriterioService: SubcriteriosService,
    private indicadorService: IndicadoresService
  ) {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Crear Modelo',
        command: (event: any) => this.changeStep(0),
      },
      {
        label: 'Configurar Modelo',
        command: (event: any) => this.changeStep(1),
      },
      {
        label: 'Confirmar',
        command: (event: any) => this.changeStep(2),
      },
    ];
  }

  changeStep(index: number) {
    // Lógica para mostrar contenido diferente según el índice del paso (se mantiene igual).
    switch (index) {
      case 0:
        /* this.messageService.add({
          severity: 'info',
          summary: 'First Step',
          detail: 'Contenido del primer paso',
        });*/
        break;
      case 1:
        /* this.messageService.add({
          severity: 'info',
          summary: 'Second Step',
          detail: 'Contenido del segundo paso',
        });*/
        break;
      case 2:
        /*this.messageService.add({
          severity: 'info',
          summary: 'Last Step',
          detail: 'Contenido del último paso',
        });
        break;
      default:*/
        break;
    }

    this.activeIndex = index;
  }

  goBack() {
    if (this.activeIndex > 0) {
      this.changeStep(this.activeIndex - 1);
    }
  }


  goNext() {
    if (this.activeIndex < this.items.length - 1) {
      this.changeStep(this.activeIndex + 1);
    }
  }

  showDialog() {
    this.visible = true;
    this.listar();
  }

  Cancelar() {
    this.router.navigate(['/inicioModelo']);
  }
  save() {
    this.messageService.add({
      severity: 'success',
      summary: 'Guardado',
      detail: 'El modelo ha sido guardado correctamente',
    });
  }

  listar() {
    this.criterioService.getCriterios().subscribe(
      (data: Criterio[]) => {
        this.Criterios = data;
        // console.log(this.Criterios)
      },
      (error: any) => {
        console.error('Error al listar criterios:', error);
      }
    );
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  onAccordionTabOpen(event: any) {
    this.selectedCriterio = this.Criterios[event.index];
    console.log(this.selectedCriterio);
    this.listarSubCri();
  }

  onAccordionTabOpenSubCri(event: any) {
    this.selectedSubCriterio = this.SubCriterios[event.index];
    console.log(this.selectedSubCriterio);
    this.listarIndicadores();
  }

  listarSubCri() {
    this.subcriterioService
      .listarSubcriterioPorCriterio(this.selectedCriterio.id_criterio)
      .subscribe(
        (data: Subcriterio[]) => {
          this.SubCriterios = data;
          //console.log(this.SubCriterios)
        },
        (error: any) => {
          console.error('Error al listar subcriterios:', error);
        }
      );
  }
  listarIndicadores() {
    this.indicadorService
      .listarIndicadorPorSubcriterio(this.selectedSubCriterio.id_subcriterio)
      .subscribe(
        (data: Indicador[]) => {
          this.Indicadores = data;
          //console.log(this.Indicadores)
        },
        (error: any) => {
          console.error('Error al listar indicadores:', error);
        }
      );
  }


  IndicadoresSelected() {
    console.log("aquii indicador");
    console.log(this.IndicadoresSeleccionados)
    this.visible = false;

  }
  
 CancelarModal() {
    this.visible = false;
    this.IndicadoresSeleccionados = [];
  }
}
