import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { Indicador } from 'src/app/models/Indicador';
import { Validators, FormGroup, FormBuilder, AbstractControl  , ValidationErrors } from '@angular/forms';
import { Modelo } from 'src/app/models/Modelo';
import { ModeloService } from 'src/app/services/modelo.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { AsignacionIndicador } from 'src/app/models/AsignacionIndicador';


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
  FormModelo: FormGroup;
  public modelo = new Modelo();
  public indicadoresAsignacion = new AsignacionIndicador();
  seleccionarTodos: boolean = false;

  constructor( public messageService: MessageService,private router: Router, private criterioService: CriteriosService, private subcriterioService: SubcriteriosService,
    private indicadorService: IndicadoresService, private formBuilder: FormBuilder , private modeloService: ModeloService, private asigIndicadorService: AsignacionIndicadorService) {
   this.items = [];
   //Validaciones
   this.FormModelo = this.formBuilder.group({
    nombre: ['', Validators.required],
    fechaInicial: ['', Validators.required],
    fechaFinal: ['', Validators.required],
    fechaActividades: ['', Validators.required]
  }, { validator: this.fechasValidator } );

  }

  ngOnInit(): void {
    this.items = [
      { label: 'Crear Modelo',
        command: (event: any) => this.changeStep(0),
      },
      {  label: 'Configurar Modelo',
        command: (event: any) => this.changeStep(1),
      },
    ];
    this. listarTodosCriterios();
  }



  seleccionarTodosChanged() {
    if (this.seleccionarTodos) {
      // Agregar indicadores no seleccionados previamente
      const nuevosIndicadores = this.Indicadores.filter(indicador => !this.IndicadoresSeleccionados.includes(indicador));
      this.IndicadoresSeleccionados = [...this.IndicadoresSeleccionados, ...nuevosIndicadores];

    } else {
      // Quitar los indicadores seleccionados y desmarcar "Seleccionar Todos"
      this.IndicadoresSeleccionados = [];
      this.seleccionarTodos = false;
    }
  }
  


  fechasValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaInicial = control.get('fechaInicial')?.value;
    const fechaFinal = control.get('fechaFinal')?.value;
    const fechaActividades = control.get('fechaActividades')?.value;
    if (fechaFinal < fechaInicial) {
      return { 'fechaInvalida': true };}
    if (fechaActividades < fechaInicial || fechaActividades > fechaFinal) {
      return { 'fechaActividadesInvalida': true };}
    return null;}
 

  changeStep(index: number) {
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
        break; }
    this.activeIndex = index; }

 
  onActiveIndexChange(event: number) {
    this.activeIndex = event; }
  onAccordionTabOpen(event: any) {
    this.selectedCriterio = this.Criterios[event.index];
    this.listarSubCri(); }
  onAccordionTabOpenSubCri(event: any) {
    this.selectedSubCriterio = this.SubCriterios[event.index];
    this.listarIndicadores();}


    listarTodosCriterios() {
      this.criterioService.getCtriteSubCriIndi(8).subscribe(
        (data: Criterio[]) => {
          this.Criterios = data;
          console.log(this.Criterios)
           // Iterar a través de los criterios y agregar los subcriterios a SubCriterios
        this.Criterios.forEach(criterio => {
        this.SubCriterios.push(...criterio.lista_subcriterios);
           });
         console.log(this.SubCriterios);
            // Iterar a través de los criterios y agregar los subcriterios a SubCriterios
        this.SubCriterios.forEach(subcriterio => {
          this.Indicadores.push(...subcriterio.lista_indicadores);
             });
           console.log(this.Indicadores);
        },
        (error: any) => {
          console.error('Error al listar criterios:', error);}); }

  listar() {
    this.criterioService.getCriterios().subscribe(
      (data: Criterio[]) => {
        this.Criterios = data;
      },
      (error: any) => {
        console.error('Error al listar criterios:', error);}); }

  listarSubCri() {
    this.subcriterioService
      .listarSubcriterioPorCriterio(this.selectedCriterio.id_criterio)
      .subscribe(
        (data: Subcriterio[]) => {
          this.SubCriterios = data;  },
        (error: any) => {
          console.error('Error al listar subcriterios:', error);});}
  listarIndicadores() {
    this.indicadorService
      .listarIndicadorPorSubcriterio(this.selectedSubCriterio.id_subcriterio)
      .subscribe(
        (data: Indicador[]) => {
          this.Indicadores = data;},
        (error: any) => {
          console.error('Error al listar indicadores:', error);});}

  IndicadoresSelected() {
    this.visible = false;}

  ModeloCapturar() {
    this.modelo.nombre= this.FormModelo.value.nombre;
    this.modelo.fecha_inicio= this.FormModelo.value.fechaInicial;
    this.modelo.fecha_fin= this.FormModelo.value.fechaFinal;
    this.modelo.fecha_final_act= this.FormModelo.value.fechaActividades;}

  save() {
    this.modeloService.createModelo(this.modelo).subscribe(
      (response) => {
        console.log(response);
        let elementosGuardados = 0; 
        const totalElementos = this.IndicadoresSeleccionados.length; 
        this.IndicadoresSeleccionados.forEach((element: any) => {
          this.indicadoresAsignacion.indicador = element;
          this.indicadoresAsignacion.modelo = response;
          this.asigIndicadorService.createAsignacionIndicador(this.indicadoresAsignacion).subscribe(
            (result) => {
              console.log(result);
              elementosGuardados++;
              if (elementosGuardados === totalElementos) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Guardado',
                  detail: 'El modelo ha sido guardado correctamente',
                });
                const tiempoRetraso = 1000;
                setTimeout(() => {
                  this.router.navigate(['/inicioModelo']);
                }, tiempoRetraso);
              }
            },
            (error) => {
              console.error(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error al guardar el modelo',
              });
            }
          )
        });
  
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al crear el modelo',
        });
      }
    )
  }
  

  goBack() {
    if (this.activeIndex > 0) {
      this.changeStep(this.activeIndex - 1);  } }

  goNext() {
    if (this.activeIndex < this.items.length - 1) {
      if (this.activeIndex === 0 && !this.FormModelo.valid) {
        // Verificar si es valido el formulario
        return;}
      if (this.activeIndex === 0) {
        // Obtener los datos del formulario
        this.ModeloCapturar(); }
      this.changeStep(this.activeIndex + 1);}}

 showDialog() {
    this.visible = true;
    this.listar();}

Cancelar() {
 this.router.navigate(['/inicioModelo']); }
 
 CancelarModal() {
 this.visible = false; 
  this.IndicadoresSeleccionados = []; }

  getNombreCriterio(indicador: any): string {
    return indicador?.subcriterio?.criterio?.nombre || ''; }

}
