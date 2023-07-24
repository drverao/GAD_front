import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { EvidenciasResponComponent } from './evidencias/evidencias.component';
import { ActividadesResponsableComponent } from './actividades-responsable/actividades-responsable.component';
import { EvidenciaTareasAsginadasComponent } from './evidencia-tareas-asginadas/evidencia-tareas-asginadas.component';
import { ActividadCriterioModelo } from './actividad-criterio-modelo/actividad-criterio-modelo.component';
import { ActividadCriterioDetalle } from './actividad-criterio-detalle/actividad-criterio-detalle.component';
import { ActividadCriterioSubcriterio } from './atividad-criterio-subcriterio/atividad-criterio-subcriterio.component';
import { ActiviadDetalleIndicadorComponent } from './actividad-detalle-indicador/actividad-detalle-indicador.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EvidenciasResponComponent,
    ActividadesResponsableComponent,
    EvidenciaTareasAsginadasComponent,
    ActividadCriterioModelo,
    ActividadCriterioDetalle,
    ActividadCriterioSubcriterio,
    ActiviadDetalleIndicadorComponent,
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTreeModule,
    MatStepperModule,
    MatMomentDateModule,
    MomentDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    SharedModule,
    NgChartsModule
  ]
})
export class ResponsableModule { }
