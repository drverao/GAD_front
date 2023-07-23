import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';

import { DashboardComponent2 } from './pages/dashboard/dashboard.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { CriteriosComponent } from './pages/criterios/criterios.component';
import { SubcriteriosComponent } from './pages/subcriterios/subcriterios.component';
import { IndicadorComponent } from './pages/indicador/indicador.component';
import { IndicadoresEvidenciaComponent } from './pages/indicadores-evidencia/indicadores-evidencia.component';
import { EvidenciasComponent } from './pages/evidencias/evidencias.component';
import { FormulasComponent } from './pages/formulas/formulas.component';
import { CriteriosSubcriterioComponent } from './pages/criterios-subcriterio/criterios-subcriterio.component';
import { SubcriteriosIndicadorComponent } from './pages/subcriterios-indicador/subcriterios-indicador.component';
import { ObcervacionesComponent } from './pages/observaciones/obcervaciones.component';
import { BuscarUsuarioPipe } from './pages/crear-usuarios/buscar-usuario.pipe';
import { CuantitativaComponent } from './pages/cuantitativa/cuantitativa.component';
import { CuanlitativaComponent } from './pages/cuanlitativa/cuanlitativa.component';
import { CriterioReporteComponent } from './pages/criterio-reporte/criterio-reporte.component';
import { EvidenciaAtrasadaComponent } from './pages/evidencia-atrasada/evidencia-atrasada.component';

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
import { BuscarPipe } from 'src/app/services/buscar.pipe';

@NgModule({
  declarations: [
    DashboardComponent2,
    CrearUsuariosComponent,
    CriteriosComponent,
    SubcriteriosComponent,
    IndicadorComponent,
    IndicadoresEvidenciaComponent,
    EvidenciasComponent,
    FormulasComponent,
    CriteriosSubcriterioComponent,
    SubcriteriosIndicadorComponent,
    ObcervacionesComponent,
    BuscarUsuarioPipe,
    CuantitativaComponent,
    CuanlitativaComponent,
    BuscarUsuarioPipe,
    SubcriteriosComponent,
    BuscarUsuarioPipe,
    CriterioReporteComponent,
    EvidenciaAtrasadaComponent,
    BuscarPipe,
    BuscarUsuarioPipe,

  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
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
    NgChartsModule
  ]
})
export class SuperadminModule { }
