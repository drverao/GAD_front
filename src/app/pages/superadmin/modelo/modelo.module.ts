import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeloRoutingModule } from './modelo-routing.module';
import { CustomDatePipe, InicioModeloComponent } from './inicio-modelo/inicio-modelo.component';
import { DialogoCriterioComponent } from './dialogo-criterio/dialogo-criterio.component';
import { DialogoSubcriterioComponent } from './dialogo-subcriterio/dialogo-subcriterio.component';
import { DetalleModeloComponent } from './detalle-modelo/detalle-modelo.component';
import { DialogoModeloComponent } from './dialogo-modelo/dialogo-modelo.component';
import { DetalleSubcriterioComponent } from './detalle-subcriterio/detalle-subcriterio.component';
import { DetalleIndicadorComponent } from './detalle-indicador/detalle-indicador.component';
import { MatrizEvaluacionComponent } from './matriz-evaluacion/matriz-evaluacion.component';
import { CalificacionComponent } from './matriz-evaluacion/calificacion/calificacion.component';
import { MatrizEvidenciasComponent } from './matriz-evaluacion/matriz-evidencias/matriz-evidencias.component';
import { AsignarCriterioComponent } from './detalle-modelo/asignar-criterio/asignar-criterio.component';

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
    InicioModeloComponent,
    DialogoCriterioComponent,
    DialogoSubcriterioComponent,
    DetalleModeloComponent,
    DialogoModeloComponent,
    DetalleSubcriterioComponent,
    DetalleIndicadorComponent,
    MatrizEvaluacionComponent,
    CalificacionComponent,
    MatrizEvidenciasComponent,
    AsignarCriterioComponent,
    CustomDatePipe,
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
    MatButtonModule,
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
export class ModeloModule { }
